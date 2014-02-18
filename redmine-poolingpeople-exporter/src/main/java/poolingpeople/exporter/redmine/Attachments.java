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
 * Attachments generated by hbm2java
 */
@Entity
@Table(name = "attachments", catalog = "redmine")
public class Attachments implements java.io.Serializable {

	private Integer id;
	private Integer containerId;
	private String containerType;
	private String filename;
	private String diskFilename;
	private int filesize;
	private String contentType;
	private String digest;
	private int downloads;
	private int authorId;
	private Date createdOn;
	private String description;
	private String diskDirectory;

	public Attachments() {
	}

	public Attachments(String filename, String diskFilename, int filesize,
			String digest, int downloads, int authorId) {
		this.filename = filename;
		this.diskFilename = diskFilename;
		this.filesize = filesize;
		this.digest = digest;
		this.downloads = downloads;
		this.authorId = authorId;
	}

	public Attachments(Integer containerId, String containerType,
			String filename, String diskFilename, int filesize,
			String contentType, String digest, int downloads, int authorId,
			Date createdOn, String description, String diskDirectory) {
		this.containerId = containerId;
		this.containerType = containerType;
		this.filename = filename;
		this.diskFilename = diskFilename;
		this.filesize = filesize;
		this.contentType = contentType;
		this.digest = digest;
		this.downloads = downloads;
		this.authorId = authorId;
		this.createdOn = createdOn;
		this.description = description;
		this.diskDirectory = diskDirectory;
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

	@Column(name = "container_id")
	public Integer getContainerId() {
		return this.containerId;
	}

	public void setContainerId(Integer containerId) {
		this.containerId = containerId;
	}

	@Column(name = "container_type", length = 30)
	public String getContainerType() {
		return this.containerType;
	}

	public void setContainerType(String containerType) {
		this.containerType = containerType;
	}

	@Column(name = "filename", nullable = false)
	public String getFilename() {
		return this.filename;
	}

	public void setFilename(String filename) {
		this.filename = filename;
	}

	@Column(name = "disk_filename", nullable = false)
	public String getDiskFilename() {
		return this.diskFilename;
	}

	public void setDiskFilename(String diskFilename) {
		this.diskFilename = diskFilename;
	}

	@Column(name = "filesize", nullable = false)
	public int getFilesize() {
		return this.filesize;
	}

	public void setFilesize(int filesize) {
		this.filesize = filesize;
	}

	@Column(name = "content_type")
	public String getContentType() {
		return this.contentType;
	}

	public void setContentType(String contentType) {
		this.contentType = contentType;
	}

	@Column(name = "digest", nullable = false, length = 40)
	public String getDigest() {
		return this.digest;
	}

	public void setDigest(String digest) {
		this.digest = digest;
	}

	@Column(name = "downloads", nullable = false)
	public int getDownloads() {
		return this.downloads;
	}

	public void setDownloads(int downloads) {
		this.downloads = downloads;
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

	@Column(name = "description")
	public String getDescription() {
		return this.description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	@Column(name = "disk_directory")
	public String getDiskDirectory() {
		return this.diskDirectory;
	}

	public void setDiskDirectory(String diskDirectory) {
		this.diskDirectory = diskDirectory;
	}

}
