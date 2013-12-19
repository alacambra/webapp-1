package poolingpeople.webapplication.business.logging.boundary;

import java.util.logging.Level;
import java.util.logging.Logger;

/**
 * WhateverLogger is effectively a simple delegating object to an real Logger instance created by LoggerProducer
 * @see LoggerProducer
 */
public interface WhateverLogger {
	public void log(Level logLevel, String message, Object[] args);
	public Logger getLogger();
}