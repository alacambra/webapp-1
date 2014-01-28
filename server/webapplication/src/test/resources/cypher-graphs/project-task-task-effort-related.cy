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
	DEFAULT_PROGRESS:0.25,
	DEFAULT_DURATION:34,
	DEFAULT_END_DATE:2,
	DEFAULT_START_DATE:1,
	PRIORITY:3,
	STATUS:5}),
(T11:TASK{
	ID:"T11",
	TYPE:"TASK" ,
	DEFAULT_PROGRESS:0.5,
	DEFAULT_DURATION:100,
	DEFAULT_END_DATE:51,
	DEFAULT_START_DATE:34,
	PRIORITY:2,
	STATUS:1}),
(T12:TASK{
	ID:"T12",
	TYPE:"TASK" ,
	DEFAULT_PROGRESS:0.5,
	DEFAULT_DURATION:100,
	DEFAULT_END_DATE:51,
	DEFAULT_START_DATE:34,
	PRIORITY:2,
	STATUS:1}),
(T111:TASK{
	ID:"T111",
	TYPE:"TASK" ,
	DEFAULT_PROGRESS:0.5,
	DEFAULT_DURATION:100,
	DEFAULT_END_DATE:51,
	DEFAULT_START_DATE:34,
	PRIORITY:2,
	STATUS:1}),
(T112:TASK{
	ID:"T112",
	TYPE:"TASK" ,
	DEFAULT_PROGRESS:0.5,
	DEFAULT_DURATION:100,
	DEFAULT_END_DATE:51,
	DEFAULT_START_DATE:34,
	PRIORITY:2,
	STATUS:1}),
(T121:TASK{
	ID:"T121",
	TYPE:"TASK" ,
	DEFAULT_PROGRESS:0.5,
	DEFAULT_DURATION:100,
	DEFAULT_END_DATE:51,
	DEFAULT_START_DATE:34,
	PRIORITY:2,
	STATUS:1}),
(T122:TASK{
	ID:"T122",
	TYPE:"TASK" ,
	DEFAULT_PROGRESS:0.5,
	DEFAULT_DURATION:100,
	DEFAULT_END_DATE:51,
	DEFAULT_START_DATE:34,
	PRIORITY:2,
	STATUS:1}),
	
(E1111:EFFORT{
	ID:"E1111",	
	TYPE:"EFFORT",
	TIME:5}),
(E1112:EFFORT{
	ID:"E1112",
	TYPE:"EFFORT",
	TIME:10}),
(E1113:EFFORT{
	ID:"E1113",
	TYPE:"EFFORT",
	TIME:15}),
(E1121:EFFORT{
	ID:"E1121",
	TYPE:"EFFORT",
	TIME:20}),
(E1122:EFFORT{
	ID:"E1122",
	TYPE:"EFFORT",
	TIME:25}),
(E1123:EFFORT{
	ID:"E1123",
	TYPE:"EFFORT",
	TIME:30}),
(E1211:EFFORT{
	ID:"E1211",	
	TYPE:"EFFORT",
	TIME:5}),
(E1212:EFFORT{
	ID:"E1212",
	TYPE:"EFFORT",
	TIME:10}),
(E1213:EFFORT{
	ID:"E1213",
	TYPE:"EFFORT",
	TIME:15}),
(E1221:EFFORT{
	ID:"E1221",
	TYPE:"EFFORT",
	TIME:20}),
(E1222:EFFORT{
	ID:"E1222",
	TYPE:"EFFORT",
	TIME:25}),
(E1223:EFFORT{
	ID:"E1223",
	TYPE:"EFFORT",
	TIME:30}),

	
P1-[:PROJECT_HAS_TASK]->T1,

T1-[:HAS_SUBTASK]->T11,
T1-[:HAS_SUBTASK]->T12,

T11-[:HAS_SUBTASK]->T111,
T11-[:HAS_SUBTASK]->T112,

T12-[:HAS_SUBTASK]->T121,
T12-[:HAS_SUBTASK]->T122,

T111-[:HAS_EFFORT]->E1111,
T111-[:HAS_EFFORT]->E1112,
T111-[:HAS_EFFORT]->E1113,

T112-[:HAS_EFFORT]->E1121,
T112-[:HAS_EFFORT]->E1122,
T112-[:HAS_EFFORT]->E1123,

T121-[:HAS_EFFORT]->E1211,
T121-[:HAS_EFFORT]->E1212,
T121-[:HAS_EFFORT]->E1213,

T122-[:HAS_EFFORT]->E1221,
T122-[:HAS_EFFORT]->E1222,
T122-[:HAS_EFFORT]->E1223;




































