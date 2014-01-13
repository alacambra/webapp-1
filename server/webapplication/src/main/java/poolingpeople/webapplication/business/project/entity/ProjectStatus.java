package poolingpeople.webapplication.business.project.entity;

public enum ProjectStatus {
	NEW(0),
	ASSIGNED(1),
	HOLD(2),
	COMPLETED(3),
	ARCHIVED(4),
	OFFERES(5);
	
	private final int statusNumber;
	
	private ProjectStatus(Integer num) {
		this.statusNumber = num;
	}
	
	public int getNumber() {
		return statusNumber;
	}
	
	public static ProjectStatus getStatus(Integer num) {
		ProjectStatus[] status = ProjectStatus.values();
		
		for (int i = 0; i < status.length; i++ ){
			if (num == status[i].getNumber()) {
                            return status[i];
                        }
		}
		
		throw new RuntimeException("Project status does not exist");
	}
	
}






































