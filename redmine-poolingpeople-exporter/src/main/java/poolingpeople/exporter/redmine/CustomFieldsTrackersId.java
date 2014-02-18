package poolingpeople.exporter.redmine;

// Generated Feb 17, 2014 1:20:16 PM by Hibernate Tools 4.0.0

import javax.persistence.Column;
import javax.persistence.Embeddable;

/**
 * CustomFieldsTrackersId generated by hbm2java
 */
@Embeddable
public class CustomFieldsTrackersId implements java.io.Serializable {

	private int customFieldId;
	private int trackerId;

	public CustomFieldsTrackersId() {
	}

	public CustomFieldsTrackersId(int customFieldId, int trackerId) {
		this.customFieldId = customFieldId;
		this.trackerId = trackerId;
	}

	@Column(name = "custom_field_id", nullable = false)
	public int getCustomFieldId() {
		return this.customFieldId;
	}

	public void setCustomFieldId(int customFieldId) {
		this.customFieldId = customFieldId;
	}

	@Column(name = "tracker_id", nullable = false)
	public int getTrackerId() {
		return this.trackerId;
	}

	public void setTrackerId(int trackerId) {
		this.trackerId = trackerId;
	}

	public boolean equals(Object other) {
		if ((this == other))
			return true;
		if ((other == null))
			return false;
		if (!(other instanceof CustomFieldsTrackersId))
			return false;
		CustomFieldsTrackersId castOther = (CustomFieldsTrackersId) other;

		return (this.getCustomFieldId() == castOther.getCustomFieldId())
				&& (this.getTrackerId() == castOther.getTrackerId());
	}

	public int hashCode() {
		int result = 17;

		result = 37 * result + this.getCustomFieldId();
		result = 37 * result + this.getTrackerId();
		return result;
	}

}
