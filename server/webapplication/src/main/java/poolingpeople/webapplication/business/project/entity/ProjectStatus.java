package poolingpeople.webapplication.business.project.entity;

public enum ProjectStatus {
	TODO(0),
	NEW(1),
	ASSIGNED(2),
	HOLD(3),
	COMPLETED(4),
	ARCHIVED(5),
	REQUESTED(6),
	OFFERED(7);
	
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






































