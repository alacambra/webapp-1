CREATE (
P1:PROJECT{
	ID:"P1",
	TYPE:"PROJECT",
	DEFAULT_START_DATE:10,
	DEFAULT_END_DATE:20,
	DEFAULT_PROGRESS:2.5,
	STATUS:1}),
(T1:TASK{
	ID:"T1",
	TYPE:"TASK" ,
	DEFAULT_PROGRESS:0.251,
	DEFAULT_DURATION:34,
	DEFAULT_END_DATE:2,
	DEFAULT_START_DATE:1,
	PRIORITY:3,
	STATUS:5}),
(T11:TASK{
	ID:"T11",
	TYPE:"TASK" ,
	DEFAULT_PROGRESS:0.8,
	DEFAULT_DURATION:100,
	DEFAULT_END_DATE:51,
	DEFAULT_START_DATE:34,
	PRIORITY:2,
	STATUS:1}),
(T12:TASK{
	ID:"T12",
	TYPE:"TASK" ,
	DEFAULT_PROGRESS:0.75,
	DEFAULT_DURATION:100,
	DEFAULT_END_DATE:5,
	DEFAULT_START_DATE:3,
	PRIORITY:2,
	STATUS:1}),
(T111:TASK{
	ID:"T111",
	TYPE:"TASK" ,
	DEFAULT_PROGRESS:0.67,
	DEFAULT_DURATION:100,
	DEFAULT_END_DATE:510,
	DEFAULT_START_DATE:4,
	PRIORITY:2,
	STATUS:1}),
(T112:TASK{
	ID:"T112",
	TYPE:"TASK" ,
	DEFAULT_PROGRESS:0.1,
	DEFAULT_DURATION:100,
	DEFAULT_END_DATE:51,
	DEFAULT_START_DATE:24,
	PRIORITY:2,
	STATUS:1}),
(T121:TASK{
	ID:"T121",
	TYPE:"TASK" ,
	DEFAULT_PROGRESS:0.53,
	DEFAULT_DURATION:100,
	DEFAULT_END_DATE:51,
	DEFAULT_START_DATE:34,
	PRIORITY:2,
	STATUS:1}),
(T122:TASK{
	ID:"T122",
	TYPE:"TASK" ,
	DEFAULT_PROGRESS:0.15,
	DEFAULT_DURATION:100,
	DEFAULT_END_DATE:460,
	DEFAULT_START_DATE:67,
	PRIORITY:2,
	STATUS:1}),
	
(E1_1:EFFORT{
	ID:"E1_1",	
	TYPE:"EFFORT",
	TIME:5}),
(E11_1:EFFORT{
	ID:"E11_1",	
	TYPE:"EFFORT",
	TIME:5}),
(E12_1:EFFORT{
	ID:"E12_1",	
	TYPE:"EFFORT",
	TIME:5}),
(E111_1:EFFORT{
	ID:"E111_1",	
	TYPE:"EFFORT",
	TIME:5}),
(E111_2:EFFORT{
	ID:"E111_2",
	TYPE:"EFFORT",
	TIME:10}),
(E111_3:EFFORT{
	ID:"E111_3",
	TYPE:"EFFORT",
	TIME:15}),
(E112_1:EFFORT{
	ID:"E112_1",
	TYPE:"EFFORT",
	TIME:20}),
(E112_2:EFFORT{
	ID:"E112_2",
	TYPE:"EFFORT",
	TIME:25}),
(E112_3:EFFORT{
	ID:"E112_3",
	TYPE:"EFFORT",
	TIME:30}),
(E121_1:EFFORT{
	ID:"E121_1",	
	TYPE:"EFFORT",
	TIME:5}),
(E121_2:EFFORT{
	ID:"E121_2",
	TYPE:"EFFORT",
	TIME:10}),
(E121_3:EFFORT{
	ID:"E121_3",
	TYPE:"EFFORT",
	TIME:15}),
(E122_1:EFFORT{
	ID:"E122_1",
	TYPE:"EFFORT",
	TIME:20}),
(E122_2:EFFORT{
	ID:"E122_2",
	TYPE:"EFFORT",
	TIME:25}),
(E122_3:EFFORT{
	ID:"E122_3",
	TYPE:"EFFORT",
	TIME:30}),
	
P1-[:PROJECT_HAS_TASK]->T1,

T1-[:HAS_SUBTASK]->T11,
T1-[:HAS_SUBTASK]->T12,
T1-[:HAS_EFFORT]->E1_1,

T11-[:HAS_SUBTASK]->T111,
T11-[:HAS_SUBTASK]->T112,
T11-[:HAS_EFFORT]->E11_1,

T12-[:HAS_SUBTASK]->T121,
T12-[:HAS_SUBTASK]->T122,
T11-[:HAS_EFFORT]->E12_1,

T111-[:HAS_EFFORT]->E111_1,
T111-[:HAS_EFFORT]->E111_2,
T111-[:HAS_EFFORT]->E111_3,

T112-[:HAS_EFFORT]->E112_1,
T112-[:HAS_EFFORT]->E112_2,
T112-[:HAS_EFFORT]->E112_3,

T121-[:HAS_EFFORT]->E121_1,
T121-[:HAS_EFFORT]->E121_2,
T121-[:HAS_EFFORT]->E121_3,

T122-[:HAS_EFFORT]->E122_1,
T122-[:HAS_EFFORT]->E122_2,
T122-[:HAS_EFFORT]->E122_3;



































