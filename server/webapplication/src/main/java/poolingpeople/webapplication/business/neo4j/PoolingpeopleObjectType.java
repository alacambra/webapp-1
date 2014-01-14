package poolingpeople.webapplication.business.neo4j;

public enum PoolingpeopleObjectType {
	PROJECT, 
	TASK, 
	USER(true), 
	POOL(true), 
	ROLL, 
	SERVICE, EFFORT;

	PoolingpeopleObjectType(boolean isSubject) {
		this.isSubject = isSubject;
	}

	PoolingpeopleObjectType(){}

	private boolean isSubject = false;

	public boolean isSubject() {
		return isSubject;
	}
}
