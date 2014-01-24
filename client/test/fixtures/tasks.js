define({
    "0": {
        "id": 0,
        "title": "Task0",
        "description": "Lorem ipsum dolor sit amet, _consetetur sadipscing_ elitr.\n\nSed diam *nonumy eirmod tempor* invidunt ut\n\n# labore et dolore\n# magna aliquyam erat\n# sed diam voluptua\n\nAt vero eos et\n\n* accusam et justo\n* duo dolores et ea\n\nRebum stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.",
        "startDate": 1387206224,
        "endDate": 1388206224,
        "progress": 0.8,

        "effort": 45,
        "project": {
            "id": 0,
            "title": "Project0"
        },
        "subtaskCount": 2,
        "assignee": {
            "id": 0,
            "firstName": "Anna",
            "lastName": "Atlas"
        }
    },
    "1": {
        "id": 1,
        "title": "Task1",
        "description": "Lorem ipsum",
        "startDate": 1387206224,
        "endDate": 1388206224,

        "effort": 315,
        "project": {
            "id": 0,
            "title": "Project0"
        },
        "assignee": {
            "id": 2,
            "firstName": "Charlie",
            "lastName": "Chaos"
        }
    },
    "2": {
        "id": 2,
        "title": "Task2",
        "startDate": 1387206224,
        "endDate": 1388206224,
        "progress": 1,

        "effort": 120,
        "project": {
            "id": 1,
            "title": "Project1"
        }
    },
    "3": {
        "id": 3,
        "title": "Task3",
        "description": "Lirum larum",
        "startDate": 1387206224,
        "endDate": 1388206224,
        "progress": 0.2,

        "parentTask": {
            "id": 0,
            "title": "Task0"
        },
        "subtaskCount": 1
    },
    "4": {
        "id": 4,
        "title": "Task4",
        "startDate": 1387206224,
        "endDate": 1388206224,
        "progress": 0.5,

        "parentTask": {
            "id": 0,
            "title": "Task0"
        }
    },
    "5": {
        "id": 5,
        "title": "Task5",
        "startDate": 1387206224,
        "endDate": 1388206224,
        "progress": 0.8,

        "parentTask": {
            "id": 3,
            "title": "Task3"
        }
    },
    "6": {
        "id": 6,
        "title": "Task6",
        "startDate": 1387206224
    }
});