package poolingpeople.exporter.models.redmine;

// Generated Feb 17, 2014 1:20:16 PM by Hibernate Tools 4.0.0

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import static javax.persistence.GenerationType.IDENTITY;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * AuthSources generated by hbm2java
 */
@Entity
@Table(name = "auth_sources", catalog = "redmine")
public class AuthSources implements java.io.Serializable {

	private Integer id;
	private String type;
	private String name;
	private String host;
	private Integer port;
	private String account;
	private String accountPassword;
	private String baseDn;
	private String attrLogin;
	private String attrFirstname;
	private String attrLastname;
	private String attrMail;
	private boolean ontheflyRegister;
	private boolean tls;
	private String filter;
	private Integer timeout;

	public AuthSources() {
	}

	public AuthSources(String type, String name, boolean ontheflyRegister,
			boolean tls) {
		this.type = type;
		this.name = name;
		this.ontheflyRegister = ontheflyRegister;
		this.tls = tls;
	}

	public AuthSources(String type, String name, String host, Integer port,
			String account, String accountPassword, String baseDn,
			String attrLogin, String attrFirstname, String attrLastname,
			String attrMail, boolean ontheflyRegister, boolean tls,
			String filter, Integer timeout) {
		this.type = type;
		this.name = name;
		this.host = host;
		this.port = port;
		this.account = account;
		this.accountPassword = accountPassword;
		this.baseDn = baseDn;
		this.attrLogin = attrLogin;
		this.attrFirstname = attrFirstname;
		this.attrLastname = attrLastname;
		this.attrMail = attrMail;
		this.ontheflyRegister = ontheflyRegister;
		this.tls = tls;
		this.filter = filter;
		this.timeout = timeout;
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

	@Column(name = "type", nullable = false, length = 30)
	public String getType() {
		return this.type;
	}

	public void setType(String type) {
		this.type = type;
	}

	@Column(name = "name", nullable = false, length = 60)
	public String getName() {
		return this.name;
	}

	public void setName(String name) {
		this.name = name;
	}

	@Column(name = "host", length = 60)
	public String getHost() {
		return this.host;
	}

	public void setHost(String host) {
		this.host = host;
	}

	@Column(name = "port")
	public Integer getPort() {
		return this.port;
	}

	public void setPort(Integer port) {
		this.port = port;
	}

	@Column(name = "account")
	public String getAccount() {
		return this.account;
	}

	public void setAccount(String account) {
		this.account = account;
	}

	@Column(name = "account_password")
	public String getAccountPassword() {
		return this.accountPassword;
	}

	public void setAccountPassword(String accountPassword) {
		this.accountPassword = accountPassword;
	}

	@Column(name = "base_dn")
	public String getBaseDn() {
		return this.baseDn;
	}

	public void setBaseDn(String baseDn) {
		this.baseDn = baseDn;
	}

	@Column(name = "attr_login", length = 30)
	public String getAttrLogin() {
		return this.attrLogin;
	}

	public void setAttrLogin(String attrLogin) {
		this.attrLogin = attrLogin;
	}

	@Column(name = "attr_firstname", length = 30)
	public String getAttrFirstname() {
		return this.attrFirstname;
	}

	public void setAttrFirstname(String attrFirstname) {
		this.attrFirstname = attrFirstname;
	}

	@Column(name = "attr_lastname", length = 30)
	public String getAttrLastname() {
		return this.attrLastname;
	}

	public void setAttrLastname(String attrLastname) {
		this.attrLastname = attrLastname;
	}

	@Column(name = "attr_mail", length = 30)
	public String getAttrMail() {
		return this.attrMail;
	}

	public void setAttrMail(String attrMail) {
		this.attrMail = attrMail;
	}

	@Column(name = "onthefly_register", nullable = false)
	public boolean isOntheflyRegister() {
		return this.ontheflyRegister;
	}

	public void setOntheflyRegister(boolean ontheflyRegister) {
		this.ontheflyRegister = ontheflyRegister;
	}

	@Column(name = "tls", nullable = false)
	public boolean isTls() {
		return this.tls;
	}

	public void setTls(boolean tls) {
		this.tls = tls;
	}

	@Column(name = "filter")
	public String getFilter() {
		return this.filter;
	}

	public void setFilter(String filter) {
		this.filter = filter;
	}

	@Column(name = "timeout")
	public Integer getTimeout() {
		return this.timeout;
	}

	public void setTimeout(Integer timeout) {
		this.timeout = timeout;
	}

}
