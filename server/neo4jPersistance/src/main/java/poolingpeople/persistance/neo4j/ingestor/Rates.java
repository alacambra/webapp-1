package poolingpeople.persistance.neo4j.ingestor;

// Generated Feb 17, 2014 1:20:16 PM by Hibernate Tools 4.0.0

import java.math.BigDecimal;
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
 * Rates generated by hbm2java
 */
@Entity
@Table(name = "rates", catalog = "redmine")
public class Rates implements java.io.Serializable {

	private Integer id;
	private BigDecimal amount;
	private Integer userId;
	private Integer projectId;
	private Date dateInEffect;

	public Rates() {
	}

	public Rates(BigDecimal amount, Integer userId, Integer projectId,
			Date dateInEffect) {
		this.amount = amount;
		this.userId = userId;
		this.projectId = projectId;
		this.dateInEffect = dateInEffect;
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

	@Column(name = "amount", precision = 15)
	public BigDecimal getAmount() {
		return this.amount;
	}

	public void setAmount(BigDecimal amount) {
		this.amount = amount;
	}

	@Column(name = "user_id")
	public Integer getUserId() {
		return this.userId;
	}

	public void setUserId(Integer userId) {
		this.userId = userId;
	}

	@Column(name = "project_id")
	public Integer getProjectId() {
		return this.projectId;
	}

	public void setProjectId(Integer projectId) {
		this.projectId = projectId;
	}

	@Temporal(TemporalType.DATE)
	@Column(name = "date_in_effect", length = 10)
	public Date getDateInEffect() {
		return this.dateInEffect;
	}

	public void setDateInEffect(Date dateInEffect) {
		this.dateInEffect = dateInEffect;
	}

}
