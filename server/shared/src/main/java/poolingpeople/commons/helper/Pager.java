package poolingpeople.commons.helper;

import javax.enterprise.context.RequestScoped;

@RequestScoped
public class Pager {
	private Integer start;
	private Integer size;
	
	public Pager() {
		start = null;
		size = null;
	}

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
	
	@Override
	public String toString() {
		return "start:" + start + ", size:" + size;
	}
}
