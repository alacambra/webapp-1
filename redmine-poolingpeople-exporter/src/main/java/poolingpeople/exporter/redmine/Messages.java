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
 * Messages generated by hbm2java
 */
@Entity
@Table(name = "messages", catalog = "redmine")
public class Messages implements java.io.Serializable {

	private Integer id;
	private int boardId;
	private Integer parentId;
	private String subject;
	private String content;
	private Integer authorId;
	private int repliesCount;
	private Integer lastReplyId;
	private Date createdOn;
	private Date updatedOn;
	private Boolean locked;
	private Integer sticky;

	public Messages() {
	}

	public Messages(int boardId, String subject, int repliesCount,
			Date createdOn, Date updatedOn) {
		this.boardId = boardId;
		this.subject = subject;
		this.repliesCount = repliesCount;
		this.createdOn = createdOn;
		this.updatedOn = updatedOn;
	}

	public Messages(int boardId, Integer parentId, String subject,
			String content, Integer authorId, int repliesCount,
			Integer lastReplyId, Date createdOn, Date updatedOn,
			Boolean locked, Integer sticky) {
		this.boardId = boardId;
		this.parentId = parentId;
		this.subject = subject;
		this.content = content;
		this.authorId = authorId;
		this.repliesCount = repliesCount;
		this.lastReplyId = lastReplyId;
		this.createdOn = createdOn;
		this.updatedOn = updatedOn;
		this.locked = locked;
		this.sticky = sticky;
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

	@Column(name = "board_id", nullable = false)
	public int getBoardId() {
		return this.boardId;
	}

	public void setBoardId(int boardId) {
		this.boardId = boardId;
	}

	@Column(name = "parent_id")
	public Integer getParentId() {
		return this.parentId;
	}

	public void setParentId(Integer parentId) {
		this.parentId = parentId;
	}

	@Column(name = "subject", nullable = false)
	public String getSubject() {
		return this.subject;
	}

	public void setSubject(String subject) {
		this.subject = subject;
	}

	@Column(name = "content", length = 65535)
	public String getContent() {
		return this.content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	@Column(name = "author_id")
	public Integer getAuthorId() {
		return this.authorId;
	}

	public void setAuthorId(Integer authorId) {
		this.authorId = authorId;
	}

	@Column(name = "replies_count", nullable = false)
	public int getRepliesCount() {
		return this.repliesCount;
	}

	public void setRepliesCount(int repliesCount) {
		this.repliesCount = repliesCount;
	}

	@Column(name = "last_reply_id")
	public Integer getLastReplyId() {
		return this.lastReplyId;
	}

	public void setLastReplyId(Integer lastReplyId) {
		this.lastReplyId = lastReplyId;
	}

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "created_on", nullable = false, length = 19)
	public Date getCreatedOn() {
		return this.createdOn;
	}

	public void setCreatedOn(Date createdOn) {
		this.createdOn = createdOn;
	}

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "updated_on", nullable = false, length = 19)
	public Date getUpdatedOn() {
		return this.updatedOn;
	}

	public void setUpdatedOn(Date updatedOn) {
		this.updatedOn = updatedOn;
	}

	@Column(name = "locked")
	public Boolean getLocked() {
		return this.locked;
	}

	public void setLocked(Boolean locked) {
		this.locked = locked;
	}

	@Column(name = "sticky")
	public Integer getSticky() {
		return this.sticky;
	}

	public void setSticky(Integer sticky) {
		this.sticky = sticky;
	}

}
