package poolingpeople.exporter.models.redmine;

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
 * News generated by hbm2java
 */
@Entity
@Table(name = "news", catalog = "redmine")
public class News implements java.io.Serializable {

	private Integer id;
	private Integer projectId;
	private String title;
	private String summary;
	private String description;
	private int authorId;
	private Date createdOn;
	private int commentsCount;

	public News() {
	}

	public News(String title, int authorId, int commentsCount) {
		this.title = title;
		this.authorId = authorId;
		this.commentsCount = commentsCount;
	}

	public News(Integer projectId, String title, String summary,
			String description, int authorId, Date createdOn, int commentsCount) {
		this.projectId = projectId;
		this.title = title;
		this.summary = summary;
		this.description = description;
		this.authorId = authorId;
		this.createdOn = createdOn;
		this.commentsCount = commentsCount;
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

	@Column(name = "title", nullable = false, length = 60)
	public String getTitle() {
		return this.title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	@Column(name = "summary")
	public String getSummary() {
		return this.summary;
	}

	public void setSummary(String summary) {
		this.summary = summary;
	}

	@Column(name = "description", length = 65535)
	public String getDescription() {
		return this.description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	@Column(name = "author_id", nullable = false)
	public int getAuthorId() {
		return this.authorId;
	}

	public void setAuthorId(int authorId) {
		this.authorId = authorId;
	}

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "created_on", length = 19)
	public Date getCreatedOn() {
		return this.createdOn;
	}

	public void setCreatedOn(Date createdOn) {
		this.createdOn = createdOn;
	}

	@Column(name = "comments_count", nullable = false)
	public int getCommentsCount() {
		return this.commentsCount;
	}

	public void setCommentsCount(int commentsCount) {
		this.commentsCount = commentsCount;
	}

}
