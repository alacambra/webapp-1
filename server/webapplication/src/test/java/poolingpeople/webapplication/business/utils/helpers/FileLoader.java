package poolingpeople.webapplication.business.utils.helpers;

import java.io.IOException;
import java.io.InputStream;
import java.io.StringWriter;
import org.apache.commons.io.IOUtils;


public class FileLoader {

	public String getText(String fileName) {
		
		InputStream inputStream = Thread.currentThread().getContextClassLoader().getResourceAsStream(fileName);

		StringWriter writer = new StringWriter();
		
		try {
			IOUtils.copy(inputStream, writer);
		} catch (IOException e) {
			throw new RuntimeException(e);
		}
		
		return writer.toString();
		
	}
}
