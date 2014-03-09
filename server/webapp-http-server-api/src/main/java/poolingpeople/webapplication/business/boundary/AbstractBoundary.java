package poolingpeople.webapplication.business.boundary;

import javax.inject.Inject;

import org.codehaus.jackson.map.ObjectMapper;

import poolingpeople.commons.entities.EntityFactory;

public class AbstractBoundary {

	@Inject 
	protected ILoggedUserContainer loggedUserContainer;
	
	@Inject
	protected ObjectMapper mapper;

	@Inject
	protected EntityFactory entityFactory;

	
	protected static final String uuidRegexPattern = "[\\w\\d-]+";
	protected static final String idPattern = "{id:" + uuidRegexPattern + "}";
}
