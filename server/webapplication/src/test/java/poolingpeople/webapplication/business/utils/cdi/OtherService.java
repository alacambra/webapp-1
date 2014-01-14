/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package poolingpeople.webapplication.business.utils.cdi;

import javax.ejb.Stateless;

/**
 *
 * @author qaiser
 */
@Stateless
class OtherService {
    
    public void say(){
        System.out.println("Hello World");
    }
}
