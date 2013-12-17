package poolingpeople.webapplication.business.boundary;


public class RootApplicationException extends RuntimeException {

	/**
	 * 
	 */
	private static final long serialVersionUID = -7160582417322246076L;

	public RootApplicationException() {
		super();
		
	}

	public RootApplicationException(String message, Throwable cause,
			boolean enableSuppression, boolean writableStackTrace) {
		super(message, cause, enableSuppression, writableStackTrace);
		
	}

	public RootApplicationException(String message, Throwable cause) {
		super(message, cause);
		
	}

	public RootApplicationException(String message) {
		super(message);
		
	}

	public RootApplicationException(Throwable cause) {
		super(cause);
	}

	
}
