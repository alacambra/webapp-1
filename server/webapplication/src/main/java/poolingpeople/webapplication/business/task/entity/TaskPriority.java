package poolingpeople.webapplication.business.task.entity;

public enum TaskPriority {
	NONE(0),
	LOW(1),
	NORMAL(2),
	HIGH(3);
	
	private final int priorityNumber;
	
	private TaskPriority(int num) {
		this.priorityNumber = num;
	}
	
	public int getNumber() {
		return priorityNumber;
	}
	
	public static TaskPriority getPriority(Integer num) {
		TaskPriority[] prios = TaskPriority.values();
		
		for (int i = 0; i < prios.length; i++ ){
			if (num == prios[i].getNumber()) {
                            return prios[i];
                        }
		}
		
		throw new RuntimeException("TaskPriority does not exist");
	}
}














