package poolingpeople.exporter.models.redmine;

// Generated Feb 17, 2014 1:20:16 PM by Hibernate Tools 4.0.0

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import static javax.persistence.GenerationType.IDENTITY;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * CustomFields generated by hbm2java
 */
@Entity
@Table(name = "custom_fields", catalog = "redmine")
public class CustomFields implements java.io.Serializable {

	private Integer id;
	private String type;
	private String name;
	private String fieldFormat;
	private String possibleValues;
	private String regexp;
	private int minLength;
	private int maxLength;
	private boolean isRequired;
	private boolean isForAll;
	private boolean isFilter;
	private Integer position;
	private Boolean searchable;
	private String defaultValue;
	private Boolean editable;
	private boolean visible;
	private Boolean multiple;

	public CustomFields() {
	}

	public CustomFields(String type, String name, String fieldFormat,
			int minLength, int maxLength, boolean isRequired, boolean isForAll,
			boolean isFilter, boolean visible) {
		this.type = type;
		this.name = name;
		this.fieldFormat = fieldFormat;
		this.minLength = minLength;
		this.maxLength = maxLength;
		this.isRequired = isRequired;
		this.isForAll = isForAll;
		this.isFilter = isFilter;
		this.visible = visible;
	}

	public CustomFields(String type, String name, String fieldFormat,
			String possibleValues, String regexp, int minLength, int maxLength,
			boolean isRequired, boolean isForAll, boolean isFilter,
			Integer position, Boolean searchable, String defaultValue,
			Boolean editable, boolean visible, Boolean multiple) {
		this.type = type;
		this.name = name;
		this.fieldFormat = fieldFormat;
		this.possibleValues = possibleValues;
		this.regexp = regexp;
		this.minLength = minLength;
		this.maxLength = maxLength;
		this.isRequired = isRequired;
		this.isForAll = isForAll;
		this.isFilter = isFilter;
		this.position = position;
		this.searchable = searchable;
		this.defaultValue = defaultValue;
		this.editable = editable;
		this.visible = visible;
		this.multiple = multiple;
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

	@Column(name = "type", nullable = false, length = 30)
	public String getType() {
		return this.type;
	}

	public void setType(String type) {
		this.type = type;
	}

	@Column(name = "name", nullable = false, length = 30)
	public String getName() {
		return this.name;
	}

	public void setName(String name) {
		this.name = name;
	}

	@Column(name = "field_format", nullable = false, length = 30)
	public String getFieldFormat() {
		return this.fieldFormat;
	}

	public void setFieldFormat(String fieldFormat) {
		this.fieldFormat = fieldFormat;
	}

	@Column(name = "possible_values", length = 65535)
	public String getPossibleValues() {
		return this.possibleValues;
	}

	public void setPossibleValues(String possibleValues) {
		this.possibleValues = possibleValues;
	}

	@Column(name = "regexp")
	public String getRegexp() {
		return this.regexp;
	}

	public void setRegexp(String regexp) {
		this.regexp = regexp;
	}

	@Column(name = "min_length", nullable = false)
	public int getMinLength() {
		return this.minLength;
	}

	public void setMinLength(int minLength) {
		this.minLength = minLength;
	}

	@Column(name = "max_length", nullable = false)
	public int getMaxLength() {
		return this.maxLength;
	}

	public void setMaxLength(int maxLength) {
		this.maxLength = maxLength;
	}

	@Column(name = "is_required", nullable = false)
	public boolean isIsRequired() {
		return this.isRequired;
	}

	public void setIsRequired(boolean isRequired) {
		this.isRequired = isRequired;
	}

	@Column(name = "is_for_all", nullable = false)
	public boolean isIsForAll() {
		return this.isForAll;
	}

	public void setIsForAll(boolean isForAll) {
		this.isForAll = isForAll;
	}

	@Column(name = "is_filter", nullable = false)
	public boolean isIsFilter() {
		return this.isFilter;
	}

	public void setIsFilter(boolean isFilter) {
		this.isFilter = isFilter;
	}

	@Column(name = "position")
	public Integer getPosition() {
		return this.position;
	}

	public void setPosition(Integer position) {
		this.position = position;
	}

	@Column(name = "searchable")
	public Boolean getSearchable() {
		return this.searchable;
	}

	public void setSearchable(Boolean searchable) {
		this.searchable = searchable;
	}

	@Column(name = "default_value", length = 65535)
	public String getDefaultValue() {
		return this.defaultValue;
	}

	public void setDefaultValue(String defaultValue) {
		this.defaultValue = defaultValue;
	}

	@Column(name = "editable")
	public Boolean getEditable() {
		return this.editable;
	}

	public void setEditable(Boolean editable) {
		this.editable = editable;
	}

	@Column(name = "visible", nullable = false)
	public boolean isVisible() {
		return this.visible;
	}

	public void setVisible(boolean visible) {
		this.visible = visible;
	}

	@Column(name = "multiple")
	public Boolean getMultiple() {
		return this.multiple;
	}

	public void setMultiple(Boolean multiple) {
		this.multiple = multiple;
	}

}
