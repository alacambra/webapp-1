package poolingpeople.exporter.models.redmine;

// Generated Feb 17, 2014 1:20:16 PM by Hibernate Tools 4.0.0

import javax.persistence.AttributeOverride;
import javax.persistence.AttributeOverrides;
import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

/**
 * ChangesetsIssues generated by hbm2java
 */
@Entity
@Table(name = "changesets_issues", catalog = "redmine", uniqueConstraints = @UniqueConstraint(columnNames = {
		"changeset_id", "issue_id" }))
public class ChangesetsIssues implements java.io.Serializable {

	private ChangesetsIssuesId id;

	public ChangesetsIssues() {
	}

	public ChangesetsIssues(ChangesetsIssuesId id) {
		this.id = id;
	}

	@EmbeddedId
	@AttributeOverrides({
			@AttributeOverride(name = "changesetId", column = @Column(name = "changeset_id", nullable = false)),
			@AttributeOverride(name = "issueId", column = @Column(name = "issue_id", nullable = false)) })
	public ChangesetsIssuesId getId() {
		return this.id;
	}

	public void setId(ChangesetsIssuesId id) {
		this.id = id;
	}

}