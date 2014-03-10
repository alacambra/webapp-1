package poolingpeople.commons.helper;


public class Pager {
	private Integer start;
	private Integer size;
	
	public Pager setStart(Integer start) {
		this.start = start;
		return this;
	}
	
	public Pager setSize(Integer size) {
		this.size = size;
		return this;
	}
	
	public Integer getStart() {
		return start;
	}
	
	public Integer getSize() {
		return size;
	}
}
