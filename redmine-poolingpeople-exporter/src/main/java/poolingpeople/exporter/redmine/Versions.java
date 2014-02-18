package poolingpeople.exporter.redmine;

// Generated Feb 17, 2014 1:20:16 PM by Hibernate Tools 4.0.0

import java.util.Date;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import static javax.persistence.GenerationType.IDENTITY;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

/**
 * Versions generated by hbm2java
 */
@Entity
@Table(name = "versions", catalog = "redmine")
public class Versions implements java.io.Serializable {

	private Integer id;
	private int projectId;
	private String name;
	private String description;
	private Date effectiveDate;
	private Date createdOn;
	private Date updatedOn;
	private String wikiPageTitle;
	private String status;
	private String sharing;

	public Versions() {
	}

	public Versions(int projectId, String name, String sharing) {
		this.projectId = projectId;
		this.name = name;
		this.sharing = sharing;
	}

	public Versions(int projectId, String name, String description,
			Date effectiveDate, Date createdOn, Date updatedOn,
			String wikiPageTitle, String status, String sharing) {
		this.projectId = projectId;
		this.name = name;
		this.description = description;
		this.effectiveDate = effectiveDate;
		this.createdOn = createdOn;
		this.updatedOn = updatedOn;
		this.wikiPageTitle = wikiPageTitle;
		this.status = status;
		this.sharing = sharing;
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

	@Column(name = "name", nullable = false)
	public String getName() {
		return this.name;
	}

	public void setName(String name) {
		this.name = name;
	}

	@Column(name = "description")
	public String getDescription() {
		return this.description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	@Temporal(TemporalType.DATE)
	@Column(name = "effective_date", length = 10)
	public Date getEffectiveDate() {
		return this.effectiveDate;
	}

	public void setEffectiveDate(Date effectiveDate) {
		this.effectiveDate = effectiveDate;
	}

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "created_on", length = 19)
	public Date getCreatedOn() {
		return this.createdOn;
	}

	public void setCreatedOn(Date createdOn) {
		this.createdOn = createdOn;
	}

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "updated_on", length = 19)
	public Date getUpdatedOn() {
		return this.updatedOn;
	}

	public void setUpdatedOn(Date updatedOn) {
		this.updatedOn = updatedOn;
	}

	@Column(name = "wiki_page_title")
	public String getWikiPageTitle() {
		return this.wikiPageTitle;
	}

	public void setWikiPageTitle(String wikiPageTitle) {
		this.wikiPageTitle = wikiPageTitle;
	}

	@Column(name = "status")
	public String getStatus() {
		return this.status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	@Column(name = "sharing", nullable = false)
	public String getSharing() {
		return this.sharing;
	}

	public void setSharing(String sharing) {
		this.sharing = sharing;
	}

}
