package poolingpeople.commons.helper;

import javax.enterprise.context.RequestScoped;

@RequestScoped
public class PagerImpl implements Pager {
	private Integer start = 0;
	private Integer size = 15;
	
	public PagerImpl() {
		start = null;
		size = null;
	}

	@Override
	public Pager setStart(Integer start) {
		this.start = start;
		return this;
	}
	
	@Override
	public Pager setSize(Integer size) {
		this.size = size;
		return this;
	}
	
	@Override
	public Integer getStart() {
		return start;
	}
	
	@Override
	public Integer getSize() {
		return size;
	}
	
	@Override
	public String toString() {
		return "start:" + start + ", size:" + size;
	}
}
