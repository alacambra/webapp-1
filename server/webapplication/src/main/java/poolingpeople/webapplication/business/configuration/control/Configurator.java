package poolingpeople.webapplication.business.configuration.control;

import java.util.HashMap;
import java.util.Map;

import javax.annotation.PostConstruct;
import javax.ejb.Singleton;
import javax.ejb.Startup;

@Startup
@Singleton
public class Configurator {
	private Map<String, String> config;

	@SuppressWarnings("serial")
	@PostConstruct
	private void loadConfiguration() {
		config = new HashMap<String, String>() {
			{
				put("test", "asdf");
				put("debug","false");
				put("isLogging","true");
				put("invalidJson","Invalid JSON provided, thus deserializing is not possible!");
			}
		};
	}

	public String getStringValue(String key) {
		return (containsKey(key)) ? config.get(key) : "";
	}

	public long getLongValue(String key) {
		return (containsKey(key)) ? Long.parseLong(config.get(key)) : 0l;
	}

	public int getIntValue(String key) {
		return (containsKey(key)) ? Integer.parseInt(config.get(key)) : 0x0;
	}

	public boolean getBooleanValue(String key) {
		return (containsKey(key)) ? Boolean.parseBoolean(config.get(key)) : false;
	}

	private boolean containsKey(String key) {
		return (config.containsKey(key));
	}
}
