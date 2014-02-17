package poolingpeople.persistance.neo4j.ingestor;

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
 * WikiPages generated by hbm2java
 */
@Entity
@Table(name = "wiki_pages", catalog = "redmine")
public class WikiPages implements java.io.Serializable {

	private Integer id;
	private int wikiId;
	private String title;
	private Date createdOn;
	private boolean protected_;
	private Integer parentId;

	public WikiPages() {
	}

	public WikiPages(int wikiId, String title, Date createdOn,
			boolean protected_) {
		this.wikiId = wikiId;
		this.title = title;
		this.createdOn = createdOn;
		this.protected_ = protected_;
	}

	public WikiPages(int wikiId, String title, Date createdOn,
			boolean protected_, Integer parentId) {
		this.wikiId = wikiId;
		this.title = title;
		this.createdOn = createdOn;
		this.protected_ = protected_;
		this.parentId = parentId;
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

	@Column(name = "wiki_id", nullable = false)
	public int getWikiId() {
		return this.wikiId;
	}

	public void setWikiId(int wikiId) {
		this.wikiId = wikiId;
	}

	@Column(name = "title", nullable = false)
	public String getTitle() {
		return this.title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "created_on", nullable = false, length = 19)
	public Date getCreatedOn() {
		return this.createdOn;
	}

	public void setCreatedOn(Date createdOn) {
		this.createdOn = createdOn;
	}

	@Column(name = "protected", nullable = false)
	public boolean isProtected_() {
		return this.protected_;
	}

	public void setProtected_(boolean protected_) {
		this.protected_ = protected_;
	}

	@Column(name = "parent_id")
	public Integer getParentId() {
		return this.parentId;
	}

	public void setParentId(Integer parentId) {
		this.parentId = parentId;
	}

}
