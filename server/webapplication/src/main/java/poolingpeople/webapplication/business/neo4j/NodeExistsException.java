package poolingpeople.webapplication.business.neo4j;

public class NodeExistsException extends RuntimeException {

	/**
	 * 
	 */
	private static final long serialVersionUID = -2956832836211447594L;

	public NodeExistsException(){
		super();
	}
	
	public NodeExistsException(String text){
		super(text);
	}
}
