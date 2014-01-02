package poolingpeople.webapplication.business.boundary;

import javax.ws.rs.core.Response;

public abstract class RootApplicationException extends RuntimeException {

	private static final long serialVersionUID = -7160582417322246076L;

	public RootApplicationException() {
		super();
		// TODO Auto-generated constructor stub
	}

	public RootApplicationException(String message, Throwable cause,
			boolean enableSuppression, boolean writableStackTrace) {
		super(message, cause, enableSuppression, writableStackTrace);
		// TODO Auto-generated constructor stub
	}

	public RootApplicationException(String message, Throwable cause) {
		super(message, cause);
		// TODO Auto-generated constructor stub
	}

	public RootApplicationException(String message) {
		super(message);
		// TODO Auto-generated constructor stub
	}

	public RootApplicationException(Throwable cause) {
		super(cause);
		// TODO Auto-generated constructor stub
	}

        public abstract Response getSpecificWebResponse();
}
