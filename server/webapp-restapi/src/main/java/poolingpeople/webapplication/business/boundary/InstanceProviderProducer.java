package poolingpeople.webapplication.business.boundary;

public class InstanceProviderProducer {
	public InstanceProvider getInstanceProvider(){
		return new CDIInstanceProvider();
	}
}
