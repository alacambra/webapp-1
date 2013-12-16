package poolingpeople.webapplication.business.task.entity;

public enum TaskPriority {
	LOW(0),
	NORMAL(1),
	HIGH(2);
	
	private int priorityNumber;
	
	private TaskPriority(int num) {
		this.priorityNumber = num;
	}
	
	public int getNumber() {
		return priorityNumber;
	}
	
	public static TaskPriority getPriority(Integer num) {
		TaskPriority[] prios = TaskPriority.values();
		
		for (int i = 0; i < prios.length; i++ ){
			if (num == prios[i].getNumber())
				return prios[i];
		}
		
		throw new RuntimeException("valuue not found");
	}
}














