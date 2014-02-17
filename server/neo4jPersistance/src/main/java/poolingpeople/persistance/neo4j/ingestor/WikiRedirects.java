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
 * WikiRedirects generated by hbm2java
 */
@Entity
@Table(name = "wiki_redirects", catalog = "redmine")
public class WikiRedirects implements java.io.Serializable {

	private Integer id;
	private int wikiId;
	private String title;
	private String redirectsTo;
	private Date createdOn;

	public WikiRedirects() {
	}

	public WikiRedirects(int wikiId, Date createdOn) {
		this.wikiId = wikiId;
		this.createdOn = createdOn;
	}

	public WikiRedirects(int wikiId, String title, String redirectsTo,
			Date createdOn) {
		this.wikiId = wikiId;
		this.title = title;
		this.redirectsTo = redirectsTo;
		this.createdOn = createdOn;
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

	@Column(name = "title")
	public String getTitle() {
		return this.title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	@Column(name = "redirects_to")
	public String getRedirectsTo() {
		return this.redirectsTo;
	}

	public void setRedirectsTo(String redirectsTo) {
		this.redirectsTo = redirectsTo;
	}

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "created_on", nullable = false, length = 19)
	public Date getCreatedOn() {
		return this.createdOn;
	}

	public void setCreatedOn(Date createdOn) {
		this.createdOn = createdOn;
	}

}
