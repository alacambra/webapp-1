package poolingpeople.exporter.models.redmine;

// Generated Feb 17, 2014 1:20:16 PM by Hibernate Tools 4.0.0

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import static javax.persistence.GenerationType.IDENTITY;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * Trackers generated by hbm2java
 */
@Entity
@Table(name = "trackers", catalog = "redmine")
public class Trackers implements java.io.Serializable {

	private Integer id;
	private String name;
	private boolean isInChlog;
	private Integer position;
	private boolean isInRoadmap;
	private Integer fieldsBits;

	public Trackers() {
	}

	public Trackers(String name, boolean isInChlog, boolean isInRoadmap) {
		this.name = name;
		this.isInChlog = isInChlog;
		this.isInRoadmap = isInRoadmap;
	}

	public Trackers(String name, boolean isInChlog, Integer position,
			boolean isInRoadmap, Integer fieldsBits) {
		this.name = name;
		this.isInChlog = isInChlog;
		this.position = position;
		this.isInRoadmap = isInRoadmap;
		this.fieldsBits = fieldsBits;
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

	@Column(name = "name", nullable = false, length = 30)
	public String getName() {
		return this.name;
	}

	public void setName(String name) {
		this.name = name;
	}

	@Column(name = "is_in_chlog", nullable = false)
	public boolean isIsInChlog() {
		return this.isInChlog;
	}

	public void setIsInChlog(boolean isInChlog) {
		this.isInChlog = isInChlog;
	}

	@Column(name = "position")
	public Integer getPosition() {
		return this.position;
	}

	public void setPosition(Integer position) {
		this.position = position;
	}

	@Column(name = "is_in_roadmap", nullable = false)
	public boolean isIsInRoadmap() {
		return this.isInRoadmap;
	}

	public void setIsInRoadmap(boolean isInRoadmap) {
		this.isInRoadmap = isInRoadmap;
	}

	@Column(name = "fields_bits")
	public Integer getFieldsBits() {
		return this.fieldsBits;
	}

	public void setFieldsBits(Integer fieldsBits) {
		this.fieldsBits = fieldsBits;
	}

}
