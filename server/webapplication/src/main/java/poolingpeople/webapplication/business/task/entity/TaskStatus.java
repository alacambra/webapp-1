package poolingpeople.webapplication.business.task.entity;

public enum TaskStatus {
	TODO(0),
	NEW(1),
	ASSIGNED(2),
	HOLD(3),
	COMPLETED(4),
	ARCHIVED(5),
	REQUESTED(6),
	OFFERED(7);
	
	private final int statusNumber;
	
	private TaskStatus(Integer num) {
		this.statusNumber = num;
	}
	
	public int getNumber() {
		return statusNumber;
	}
	
	public static TaskStatus getStatus(Integer num) {
		TaskStatus[] status = TaskStatus.values();
		
		for (int i = 0; i < status.length; i++ ){
			if (num == status[i].getNumber()) {
                            return status[i];
                        }
		}
		
		throw new RuntimeException("Taskstatus does not exist");
	}
	
}






































