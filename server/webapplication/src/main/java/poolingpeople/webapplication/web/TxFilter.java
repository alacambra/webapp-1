package poolingpeople.webapplication.web;

import java.io.IOException;

import javax.inject.Inject;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.ws.rs.WebApplicationException;

import org.neo4j.graphdb.GraphDatabaseService;
import org.neo4j.graphdb.Transaction;

public class TxFilter extends AbstractFilter{

	@Inject
	GraphDatabaseService databaseService;

	@Override
	public void init(FilterConfig cfg) throws ServletException {
		super.init(cfg);
	}

	public void doFilter(HttpServletRequest request, HttpServletResponse response, FilterChain chain) 
			throws IOException, ServletException {

		try {
			Transaction tx = databaseService.beginTx();
			try {

				chain.doFilter(request, response);
				tx.success();

			} catch (Throwable e) {

				tx.failure();
				//			log.error(e.getMessage(), e);
				throw new WebApplicationException(e);

			} finally {
				tx.finish();
			}
		}catch(Throwable e) {
			//			log.error(e.getMessage(), e);
			throw new WebApplicationException(e);
		}
	}
}











































