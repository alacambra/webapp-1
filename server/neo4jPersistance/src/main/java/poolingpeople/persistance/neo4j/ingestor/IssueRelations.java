package poolingpeople.persistance.neo4j.ingestor;

// Generated Feb 17, 2014 1:20:16 PM by Hibernate Tools 4.0.0

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import static javax.persistence.GenerationType.IDENTITY;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

/**
 * IssueRelations generated by hbm2java
 */
@Entity
@Table(name = "issue_relations", catalog = "redmine", uniqueConstraints = @UniqueConstraint(columnNames = {
		"issue_from_id", "issue_to_id" }))
public class IssueRelations implements java.io.Serializable {

	private Integer id;
	private int issueFromId;
	private int issueToId;
	private String relationType;
	private Integer delay;

	public IssueRelations() {
	}

	public IssueRelations(int issueFromId, int issueToId, String relationType) {
		this.issueFromId = issueFromId;
		this.issueToId = issueToId;
		this.relationType = relationType;
	}

	public IssueRelations(int issueFromId, int issueToId, String relationType,
			Integer delay) {
		this.issueFromId = issueFromId;
		this.issueToId = issueToId;
		this.relationType = relationType;
		this.delay = delay;
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

	@Column(name = "issue_from_id", nullable = false)
	public int getIssueFromId() {
		return this.issueFromId;
	}

	public void setIssueFromId(int issueFromId) {
		this.issueFromId = issueFromId;
	}

	@Column(name = "issue_to_id", nullable = false)
	public int getIssueToId() {
		return this.issueToId;
	}

	public void setIssueToId(int issueToId) {
		this.issueToId = issueToId;
	}

	@Column(name = "relation_type", nullable = false)
	public String getRelationType() {
		return this.relationType;
	}

	public void setRelationType(String relationType) {
		this.relationType = relationType;
	}

	@Column(name = "delay")
	public Integer getDelay() {
		return this.delay;
	}

	public void setDelay(Integer delay) {
		this.delay = delay;
	}

}
