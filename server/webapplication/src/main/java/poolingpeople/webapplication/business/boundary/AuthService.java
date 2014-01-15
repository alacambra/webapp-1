package poolingpeople.webapplication.business.boundary;

import javax.servlet.http.HttpServletRequest;
import javax.xml.bind.DatatypeConverter;

public class AuthService {

    public void printCredentials(HttpServletRequest request) {
        String auth_raw_header = request.getHeader("Authorization");
        
        if(auth_raw_header == null || auth_raw_header.length() < 0) return;
        
        byte[] auth_binary = DatatypeConverter.parseBase64Binary(auth_raw_header);

        if (auth_binary == null || auth_binary.length < 1) {
            return;
        }

        String[] decodedAuth = new String(auth_binary).split(":", 2);

        System.out.println(decodedAuth);
    }

}
