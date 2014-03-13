package poolingpeople.exporter.models.redmine;

// Generated Feb 17, 2014 1:20:16 PM by Hibernate Tools 4.0.0

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import static javax.persistence.GenerationType.IDENTITY;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * CustomValues generated by hbm2java
 */
@Entity
@Table(name = "custom_values", catalog = "redmine")
public class CustomValues implements java.io.Serializable {

	private Integer id;
	private String customizedType;
	private int customizedId;
	private int customFieldId;
	private String value;

	public CustomValues() {
	}

	public CustomValues(String customizedType, int customizedId,
			int customFieldId) {
		this.customizedType = customizedType;
		this.customizedId = customizedId;
		this.customFieldId = customFieldId;
	}

	public CustomValues(String customizedType, int customizedId,
			int customFieldId, String value) {
		this.customizedType = customizedType;
		this.customizedId = customizedId;
		this.customFieldId = customFieldId;
		this.value = value;
	}

	@Id
	@GeneratedValue(strategy = IDENTITY)
	@Column(name = "id", unique = true, nullable = false)
	public Integer getId() {
		return this.id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	@Column(name = "customized_type", nullable = false, length = 30)
	public String getCustomizedType() {
		return this.customizedType;
	}

	public void setCustomizedType(String customizedType) {
		this.customizedType = customizedType;
	}

	@Column(name = "customized_id", nullable = false)
	public int getCustomizedId() {
		return this.customizedId;
	}

	public void setCustomizedId(int customizedId) {
		this.customizedId = customizedId;
	}

	@Column(name = "custom_field_id", nullable = false)
	public int getCustomFieldId() {
		return this.customFieldId;
	}

	public void setCustomFieldId(int customFieldId) {
		this.customFieldId = customFieldId;
	}

	@Column(name = "value", length = 65535)
	public String getValue() {
		return this.value;
	}

	public void setValue(String value) {
		this.value = value;
	}

}