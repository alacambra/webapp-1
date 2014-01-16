package poolingpeople.webapplication.business.boundary;

import java.io.IOException;

import javax.inject.Inject;
import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;

import poolingpeople.webapplication.business.user.entity.PersistedUser;

public class AuthFilter implements Filter{
	
	@Inject
	LoggedUserContainer loggedUserContainer;
	
	@Inject
	AuthService authService;

	@Override
	public void init(FilterConfig filterConfig) throws ServletException {
		
	}

	@Override
	public void doFilter(ServletRequest request, ServletResponse response,
			FilterChain chain) throws IOException, ServletException {
		
		String authHeader = ((HttpServletRequest) request).getHeader("Authorization");
		
		authService.loadCredentials(authHeader, loggedUserContainer);
		chain.doFilter(request, response);
	}

	@Override
	public void destroy() {
	}

}
