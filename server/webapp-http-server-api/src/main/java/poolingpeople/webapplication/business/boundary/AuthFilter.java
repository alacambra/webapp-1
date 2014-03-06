package poolingpeople.webapplication.business.boundary;

import java.io.IOException;

import javax.enterprise.context.spi.CreationalContext;
import javax.enterprise.inject.spi.Bean;
import javax.enterprise.inject.spi.BeanManager;
import javax.inject.Inject;
import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;

import org.jboss.weld.Weld;

public class AuthFilter implements Filter{
	
//	@Inject
//	ILoggedUserContainer loggedUserContainer;
	
	@Inject
	AuthService authService;

	@Override
	public void init(FilterConfig filterConfig) throws ServletException {
		
	}

	@Override
	public void doFilter(ServletRequest request, ServletResponse response,
			FilterChain chain) throws IOException, ServletException {
		
		BeanManager manager = Weld.current().getBeanManager();
		Bean<?> bean = manager.resolve(manager.getBeans(ILoggedUserContainer.class));
		
		CreationalContext<?> cc = manager.createCreationalContext(bean);
		ILoggedUserContainer loggedUserContainer =
				ILoggedUserContainer.class.cast(manager.getReference(bean, ILoggedUserContainer.class, cc));
		
		String authHeader = ((HttpServletRequest) request).getHeader("Authorization");
		
		authService.loadCredentials(authHeader, loggedUserContainer);
		chain.doFilter(request, response);
		
	}

	@Override
	public void destroy() {
	}

}
