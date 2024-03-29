package poolingpeople.exporter.models.redmine;

// Generated Feb 17, 2014 1:20:16 PM by Hibernate Tools 4.0.0

import javax.persistence.Column;
import javax.persistence.Embeddable;

/**
 * GroupsUsersId generated by hbm2java
 */
@Embeddable
public class GroupsUsersId implements java.io.Serializable {

	private int groupId;
	private int userId;

	public GroupsUsersId() {
	}

	public GroupsUsersId(int groupId, int userId) {
		this.groupId = groupId;
		this.userId = userId;
	}

	@Column(name = "group_id", nullable = false)
	public int getGroupId() {
		return this.groupId;
	}

	public void setGroupId(int groupId) {
		this.groupId = groupId;
	}

	@Column(name = "user_id", nullable = false)
	public int getUserId() {
		return this.userId;
	}

	public void setUserId(int userId) {
		this.userId = userId;
	}

	public boolean equals(Object other) {
		if ((this == other))
			return true;
		if ((other == null))
			return false;
		if (!(other instanceof GroupsUsersId))
			return false;
		GroupsUsersId castOther = (GroupsUsersId) other;

		return (this.getGroupId() == castOther.getGroupId())
				&& (this.getUserId() == castOther.getUserId());
	}

	public int hashCode() {
		int result = 17;

		result = 37 * result + this.getGroupId();
		result = 37 * result + this.getUserId();
		return result;
	}

}
