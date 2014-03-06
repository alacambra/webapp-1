package poolingpeople.persistence.neo4j;

public enum PoolingpeopleObjectType {
	PROJECT, 
	TASK, 
	USER(true), 
	POOL(true), 
	ROLL, 
	SERVICE,
	EFFORT,
	CHANGELOG,
	SUBJECT,
	CHANGELOG_ACTION;

	PoolingpeopleObjectType(boolean isSubject) {
		this.isSubject = isSubject;
	}

	PoolingpeopleObjectType(){}

	private boolean isSubject = false;

	public boolean isSubject() {
		return isSubject;
	}
}
