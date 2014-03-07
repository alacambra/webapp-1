package poolingpeople.commons.cdihelper;


public class InstanceProviderProducer {
	public InstanceProvider getInstanceProvider(){
		return new CDIInstanceProvider();
	}
}
