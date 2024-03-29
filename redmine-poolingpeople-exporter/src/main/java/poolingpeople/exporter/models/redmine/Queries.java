package poolingpeople.exporter.models.redmine;

// Generated Feb 17, 2014 1:20:16 PM by Hibernate Tools 4.0.0

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import static javax.persistence.GenerationType.IDENTITY;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * Queries generated by hbm2java
 */
@Entity
@Table(name = "queries", catalog = "redmine")
public class Queries implements java.io.Serializable {

	private Integer id;
	private Integer projectId;
	private String name;
	private String filters;
	private int userId;
	private boolean isPublic;
	private String columnNames;
	private String sortCriteria;
	private String groupBy;
	private String type;

	public Queries() {
	}

	public Queries(String name, int userId, boolean isPublic) {
		this.name = name;
		this.userId = userId;
		this.isPublic = isPublic;
	}

	public Queries(Integer projectId, String name, String filters, int userId,
			boolean isPublic, String columnNames, String sortCriteria,
			String groupBy, String type) {
		this.projectId = projectId;
		this.name = name;
		this.filters = filters;
		this.userId = userId;
		this.isPublic = isPublic;
		this.columnNames = columnNames;
		this.sortCriteria = sortCriteria;
		this.groupBy = groupBy;
		this.type = type;
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

	@Column(name = "project_id")
	public Integer getProjectId() {
		return this.projectId;
	}

	public void setProjectId(Integer projectId) {
		this.projectId = projectId;
	}

	@Column(name = "name", nullable = false)
	public String getName() {
		return this.name;
	}

	public void setName(String name) {
		this.name = name;
	}

	@Column(name = "filters", length = 65535)
	public String getFilters() {
		return this.filters;
	}

	public void setFilters(String filters) {
		this.filters = filters;
	}

	@Column(name = "user_id", nullable = false)
	public int getUserId() {
		return this.userId;
	}

	public void setUserId(int userId) {
		this.userId = userId;
	}

	@Column(name = "is_public", nullable = false)
	public boolean isIsPublic() {
		return this.isPublic;
	}

	public void setIsPublic(boolean isPublic) {
		this.isPublic = isPublic;
	}

	@Column(name = "column_names", length = 65535)
	public String getColumnNames() {
		return this.columnNames;
	}

	public void setColumnNames(String columnNames) {
		this.columnNames = columnNames;
	}

	@Column(name = "sort_criteria", length = 65535)
	public String getSortCriteria() {
		return this.sortCriteria;
	}

	public void setSortCriteria(String sortCriteria) {
		this.sortCriteria = sortCriteria;
	}

	@Column(name = "group_by")
	public String getGroupBy() {
		return this.groupBy;
	}

	public void setGroupBy(String groupBy) {
		this.groupBy = groupBy;
	}

	@Column(name = "type")
	public String getType() {
		return this.type;
	}

	public void setType(String type) {
		this.type = type;
	}

}
