package poolingpeople.webapplication.business.boundary;

public class AbstractBoundary {

	protected static final String uuidRegexPattern = "[\\w\\d-]+";
	protected static final String idPattern = "{id:" + uuidRegexPattern + "}";
	
}
