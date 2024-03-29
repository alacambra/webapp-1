CREATE (
P1:PROJECT{
	ID:"1",
	TYPE:"PROJECT",
	DEFAULT_START_DATE:10,
	DEFAULT_EFFORT:0,	
	DEFAULT_END_DATE:20,
	DEFAULT_PROGRESS:2.5,
	STATUS:1}),
(T1:TASK{
	ID:"2",
	TYPE:"TASK" ,
	DEFAULT_PROGRESS:0.25,
	DEFAULT_EFFORT:0,	
	DEFAULT_DURATION:34,
	DEFAULT_END_DATE:2,
	DEFAULT_START_DATE:1,
	PRIORITY:3,
	STATUS:5}),
(T2:TASK{
	ID:"3",
	TYPE:"TASK" ,
	DEFAULT_PROGRESS:0.5,
	DEFAULT_EFFORT:0,	
	DEFAULT_DURATION:100,
	DEFAULT_END_DATE:51,
	DEFAULT_START_DATE:34,
	PRIORITY:2,
	STATUS:1}),
(E1:EFFORT{
	ID:"E1",	
	TYPE:"EFFORT",
	TIME:5}),
(E2:EFFORT{
	ID:"E2",
	TYPE:"EFFORT",
	TIME:10}),
(E3:EFFORT{
	ID:"E3",
	TYPE:"EFFORT",
	TIME:15}),
(E4:EFFORT{
	ID:"E4",
	TYPE:"EFFORT",
	TIME:20}),
(E5:EFFORT{
	ID:"E5",
	TYPE:"EFFORT",
	TIME:25}),
(E6:EFFORT{
	ID:"E6",
	TYPE:"EFFORT",
	TIME:30}),
	
P1-[:PROJECT_HAS_TASK]->T1,
P1-[:PROJECT_HAS_TASK]->T2,
T1-[:HAS_EFFORT]->E1,
T1-[:HAS_EFFORT]->E2,
T1-[:HAS_EFFORT]->E3,
T2-[:HAS_EFFORT]->E4,
T2-[:HAS_EFFORT]->E5,
T2-[:HAS_EFFORT]->E6;