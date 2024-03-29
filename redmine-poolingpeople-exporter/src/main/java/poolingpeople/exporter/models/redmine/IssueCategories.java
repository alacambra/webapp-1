package poolingpeople.exporter.models.redmine;

// Generated Feb 17, 2014 1:20:16 PM by Hibernate Tools 4.0.0

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import static javax.persistence.GenerationType.IDENTITY;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * IssueCategories generated by hbm2java
 */
@Entity
@Table(name = "issue_categories", catalog = "redmine")
public class IssueCategories implements java.io.Serializable {

	private Integer id;
	private int projectId;
	private String name;
	private Integer assignedToId;

	public IssueCategories() {
	}

	public IssueCategories(int projectId, String name) {
		this.projectId = projectId;
		this.name = name;
	}

	public IssueCategories(int projectId, String name, Integer assignedToId) {
		this.projectId = projectId;
		this.name = name;
		this.assignedToId = assignedToId;
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

	@Column(name = "project_id", nullable = false)
	public int getProjectId() {
		return this.projectId;
	}

	public void setProjectId(int projectId) {
		this.projectId = projectId;
	}

	@Column(name = "name", nullable = false, length = 30)
	public String getName() {
		return this.name;
	}

	public void setName(String name) {
		this.name = name;
	}

	@Column(name = "assigned_to_id")
	public Integer getAssignedToId() {
		return this.assignedToId;
	}

	public void setAssignedToId(Integer assignedToId) {
		this.assignedToId = assignedToId;
	}

}
