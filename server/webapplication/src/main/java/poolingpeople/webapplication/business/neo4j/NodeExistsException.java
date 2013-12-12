package poolingpeople.webapplication.business.neo4j;

public class NodeExistsException extends Exception {

	public NodeExistsException(){
		super();
	}
	
	public NodeExistsException(String text){
		super(text);
	}
}
