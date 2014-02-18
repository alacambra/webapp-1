package poolingpeople.exporter.redmine;

// Generated Feb 17, 2014 1:20:16 PM by Hibernate Tools 4.0.0

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import static javax.persistence.GenerationType.IDENTITY;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * JournalDetails generated by hbm2java
 */
@Entity
@Table(name = "journal_details", catalog = "redmine")
public class JournalDetails implements java.io.Serializable {

	private Integer id;
	private int journalId;
	private String property;
	private String propKey;
	private String oldValue;
	private String value;

	public JournalDetails() {
	}

	public JournalDetails(int journalId, String property, String propKey) {
		this.journalId = journalId;
		this.property = property;
		this.propKey = propKey;
	}

	public JournalDetails(int journalId, String property, String propKey,
			String oldValue, String value) {
		this.journalId = journalId;
		this.property = property;
		this.propKey = propKey;
		this.oldValue = oldValue;
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

	@Column(name = "journal_id", nullable = false)
	public int getJournalId() {
		return this.journalId;
	}

	public void setJournalId(int journalId) {
		this.journalId = journalId;
	}

	@Column(name = "property", nullable = false, length = 30)
	public String getProperty() {
		return this.property;
	}

	public void setProperty(String property) {
		this.property = property;
	}

	@Column(name = "prop_key", nullable = false, length = 30)
	public String getPropKey() {
		return this.propKey;
	}

	public void setPropKey(String propKey) {
		this.propKey = propKey;
	}

	@Column(name = "old_value", length = 65535)
	public String getOldValue() {
		return this.oldValue;
	}

	public void setOldValue(String oldValue) {
		this.oldValue = oldValue;
	}

	@Column(name = "value", length = 65535)
	public String getValue() {
		return this.value;
	}

	public void setValue(String value) {
		this.value = value;
	}

}
