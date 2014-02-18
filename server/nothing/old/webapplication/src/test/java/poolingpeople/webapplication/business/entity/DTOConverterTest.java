package poolingpeople.webapplication.business.entity;

import static org.junit.Assert.*;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;

public class DTOConverterTest {

	DTOConverter target;

	@Before
	public void setUp() throws Exception {
		target = new DTOConverter();
	}

	@After
	public void tearDown() throws Exception {
	}

	@Test
	public void testFromDTOtoPersitedBean() {
		SomeDTO dto = new SomeDTO();
		dto.setAttr1("ok");
		
		SomeBean bean = new SomeBean();
		
		assertEquals(null, bean.getAttr1());
		
		target.fromDTOtoPersitedBean(dto, bean);
		assertEquals("ok", bean.getAttr1());
		assertEquals(null, bean.getOtherAttr());
	}

	private static class SomeDTO {

		private String attr1;
		private String attr2;

		public String getAttr1() {
			return attr1;
		}

		public void setAttr1(String attr1) {
			this.attr1 = attr1;
		}

		public String getAttr2() {
			return attr2;
		}

		public void setAttr2(String attr2) {
			this.attr2 = attr2;
		}
	}

	private static class SomeBean {

		private String attr1;
		private String otherAttr;

		public String getAttr1() {
			return attr1;
		}

		public void setAttr1(String attr1) {
			this.attr1 = attr1;
		}
		
		public String getOtherAttr() {
			return otherAttr;
		}
		
		public void setOtherAttr(String otherAttr) {
			this.otherAttr = otherAttr;
		}
	}

}



















































