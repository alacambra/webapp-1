package poolingpeople.webapplication.business.logging.boundary;

import java.util.logging.Level;
import java.util.logging.Logger;

import javax.enterprise.inject.Alternative;

@Alternative
public class NullableLogger implements WhateverLogger {

	@Override
	public void log(Level logLevel, String message, Object[] args) {
	}

	@Override
	public Logger getLogger() {
		return null;
	}


}
