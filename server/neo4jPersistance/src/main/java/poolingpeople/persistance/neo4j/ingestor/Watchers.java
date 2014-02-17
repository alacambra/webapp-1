package poolingpeople.persistance.neo4j.ingestor;

// Generated Feb 17, 2014 1:20:16 PM by Hibernate Tools 4.0.0

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import static javax.persistence.GenerationType.IDENTITY;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * Watchers generated by hbm2java
 */
@Entity
@Table(name = "watchers", catalog = "redmine")
public class Watchers implements java.io.Serializable {

	private Integer id;
	private String watchableType;
	private int watchableId;
	private Integer userId;

	public Watchers() {
	}

	public Watchers(String watchableType, int watchableId) {
		this.watchableType = watchableType;
		this.watchableId = watchableId;
	}

	public Watchers(String watchableType, int watchableId, Integer userId) {
		this.watchableType = watchableType;
		this.watchableId = watchableId;
		this.userId = userId;
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

	@Column(name = "watchable_type", nullable = false)
	public String getWatchableType() {
		return this.watchableType;
	}

	public void setWatchableType(String watchableType) {
		this.watchableType = watchableType;
	}

	@Column(name = "watchable_id", nullable = false)
	public int getWatchableId() {
		return this.watchableId;
	}

	public void setWatchableId(int watchableId) {
		this.watchableId = watchableId;
	}

	@Column(name = "user_id")
	public Integer getUserId() {
		return this.userId;
	}

	public void setUserId(Integer userId) {
		this.userId = userId;
	}

}
