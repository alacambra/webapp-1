package poolingpeople.persistence.neo4j;

import java.io.IOException;

import javax.naming.InitialContext;

import org.jboss.weld.bootstrap.api.Bootstrap;
import org.jboss.weld.bootstrap.spi.Deployment;
import org.jboss.weld.environment.se.Weld;
import org.jboss.weld.environment.se.WeldContainer;
import org.jboss.weld.resources.spi.ResourceLoader;
import org.jglue.cdiunit.internal.WeldTestUrlDeployment;
import org.junit.Test;
import org.junit.runners.BlockJUnit4ClassRunner;
import org.junit.runners.model.FrameworkMethod;
import org.junit.runners.model.InitializationError;
import org.junit.runners.model.Statement;
import org.neo4j.graphdb.GraphDatabaseService;
import org.neo4j.graphdb.Transaction;

public class SuperRunner extends BlockJUnit4ClassRunner{

	private Class<?> clazz;
	private Weld weld;
	private WeldContainer container;
	private Throwable startupException;
	private GraphDatabaseService graphDbService;

	public SuperRunner(Class<?> clazz) throws InitializationError {
		super(clazz);
		this.clazz = clazz;
	}

	protected Object createTest() throws Exception {
		try {
			Weld.class.getDeclaredMethod("createDeployment", ResourceLoader.class, Bootstrap.class);

			weld = new Weld() {
				protected Deployment createDeployment(ResourceLoader resourceLoader, Bootstrap bootstrap) {
					try {
						return new WeldTestUrlDeployment(resourceLoader, bootstrap, clazz);
					} catch (IOException e) {
						startupException = e;
						throw new RuntimeException(e);
					}
				};

			};

			try {

				container = weld.initialize();
			} catch (Throwable e) {
				if (startupException == null) {
					startupException = e;
				}
			}

		} catch (NoSuchMethodException e) {
			startupException = new Exception(
					"Weld 1.0.1 is not supported, please use weld 1.1.0 or newer. If you are using maven add\n<dependency>\n  <groupId>org.jboss.weld.se</groupId>\n  <artifactId>weld-se-core</artifactId>\n  <version>1.1.0.Final</version>\n</dependency>\n to your pom.");
		} catch (ClassFormatError e) {
			startupException = new Exception(
					"There were class format errors. This is often caused by API only jars on the classpath. If you are using maven then you need to place these after the CDI unit dependency as 'provided' scope is still available during testing.", e);
		}
		catch (Throwable e) {
			startupException = new Exception(
					"Unable to start weld", e);
		}

		//Using the implementation of the CDI Runner
		Object classOfTheTest = createTest(clazz);

		if(!(classOfTheTest instanceof AbstractPersitenceTest))
			throw new ClassCastException("This Junit Runner implementation is only applicable on a object of type AbstractPersistenceTest");

		this.graphDbService = ((AbstractPersitenceTest) classOfTheTest).getManager().getGraphDbService();

		return classOfTheTest;
	}

	private <T> T createTest(Class<T> testClass) {

		T t = container.instance().select(testClass).get();

		return t;
	}

	@Override
	protected Statement methodBlock(final FrameworkMethod method) {
		final Statement defaultStatement = super.methodBlock(method);
		return new Statement() {

			@Override
			public void evaluate() throws Throwable {

				Transaction transaction = graphDbService.beginTx(); 
				
				if (startupException != null) {
					if (method.getAnnotation(Test.class).expected() == startupException.getClass()) {
						return;
					}
					throw startupException;
				}
				System.setProperty("java.naming.factory.initial", "org.jglue.cdiunit.internal.CdiUnitContextFactory");
				InitialContext initialContext = new InitialContext();
				initialContext.bind("java:comp/BeanManager", container.getBeanManager());

				try {
					defaultStatement.evaluate();
					transaction.success();

				} finally {
					transaction.close();
					initialContext.close();
					weld.shutdown();

				}

			}
		};

	}
}
















































































