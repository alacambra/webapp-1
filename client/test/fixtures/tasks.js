define({
    "0": {
        "id":          0,
        "title":       "Find publisher",
        "description": "Lorem ipsum dolor sit amet, _consetetur sadipscing_ elitr.\n\nSed diam *nonumy eirmod tempor* invidunt ut\n\n# labore et dolore\n# magna aliquyam erat\n# sed diam voluptua\n\nAt vero eos et\n\n* accusam et justo\n* duo dolores et ea\n\nRebum stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.",
        "status":      4,
        "priority":    2,
        "startDate":   1381701600,
        "endDate":     1385593200,
        "duration":    2400,
        "progress":    1,

        "project": {
            "id": 0,
            "title": "Write Book"
        },

        "subtaskCount": 0,

        "assignee": {
            "id": 0,
            "firstName": "Alice",
            "lastName": "Riddell"
        },

        "statusIsDefault":    true,
        "priorityIsDefault":  true,
        "startDateIsDefault": true,
        "endDateIsDefault":   true,
        "durationIsDefault":  true,
        "progressIsDefault":  true
    },

    "1": {
        "id":          1,
        "title":       "Writing",
        "description": null,
        "status":      1,
        "priority":    2,
        "startDate":   1387494000,
        "endDate":     1408140000,
        "duration":    9600,
        "progress":    0.65,

        "effort": 0,

        "project": {
            "id": 0,
            "title": "Write Book"
        },

        "subtaskCount": 2,

        "assignee": {
            "id": 1,
            "firstName": "Bob",
            "lastName": "Bishop"
        },

        "statusIsDefault":    false,
        "priorityIsDefault":  false,
        "startDateIsDefault": false,
        "endDateIsDefault":   true,
        "durationIsDefault":  false,
        "progressIsDefault":  false
    },

        "2": {
            "id":          2,
            "title":       "Foreword",
            "description": "lirum larum",
            "status":      4,
            "priority":    2,
            "startDate":   1382220000,
            "endDate":     null,
            "duration":    7200,
            "progress":    1,

            "effort": 585,

            "subtaskCount": 0,

            "parentTask": {
                "id": 1,
                "title": "Writing"
            },

            "assignee": {
                "id": 2,
                "firstName": "Charly",
                "lastName": "Brown"
            },

            "statusIsDefault":    true,
            "priorityIsDefault":  true,
            "startDateIsDefault": true,
            "endDateIsDefault":   true,
            "durationIsDefault":  true,
            "progressIsDefault":  true
        },

        "3": {
            "id":          3,
            "title":       "Chapter 1",
            "description": "Bli bla blub",
            "status":      1,
            "priority":    1,
            "startDate":   1391209200,
            "endDate":     null,
            "duration":    9600,
            "progress":    0.2,

            "effort": 75,

            "subtaskCount": 1,

            "parentTask": {
                "id": 1,
                "title": "Writing"
            },

            "assignee": {
                "id": 2,
                "firstName": "Charly",
                "lastName": "Brown"
            },

            "statusIsDefault":    false,
            "priorityIsDefault":  false,
            "startDateIsDefault": false,
            "endDateIsDefault":   true,
            "durationIsDefault":  false,
            "progressIsDefault":  false
        },

            "4": {
                "id":          4,
                "title":       "Find good examples",
                "description": "",
                "status":      1,
                "priority":    1,
                "startDate":   1391209200,
                "endDate":     null,
                "duration":    9600,
                "progress":    0.2,

                "subtaskCount": 0,

                "parentTask": {
                    "id": 3,
                    "title": "Chapter 1"
                },

                "assignee": {
                    "id": 2,
                    "firstName": "Charly",
                    "lastName": "Brown"
                },

                "statusIsDefault":    true,
                "priorityIsDefault":  true,
                "startDateIsDefault": true,
                "endDateIsDefault":   true,
                "durationIsDefault":  true,
                "progressIsDefault":  true
            },

    "5": {
        "id":          5,
        "title":       "Buy paint",
        "description": null,
        "status":      5,
        "priority":    0,
        "startDate":   null,
        "endDate":     null,
        "duration":    120,
        "progress":    1,

        "effort": 210,

        "project": {
            "id": 2,
            "title": "Paint house"
        },

        "subtaskCount": 0,

        "assignee": {
            "id": 1,
            "firstName": "Bob",
            "lastName": "Bishop"
        },

        "statusIsDefault":    true,
        "priorityIsDefault":  true,
        "startDateIsDefault": true,
        "endDateIsDefault":   true,
        "durationIsDefault":  true,
        "progressIsDefault":  true
    },

    "6": {
        "id":          6,
        "title":       "Pay bill",
        "description": "Phone",
        "status":      1,
        "priority":    0,
        "startDate":   null,
        "endDate":     1396134000,
        "duration":    15,
        "progress":    0,

        "subtaskCount": 0,

        "assignee": {
            "id": 1,
            "firstName": "Bob",
            "lastName": "Bishop"
        },

        "statusIsDefault":    true,
        "priorityIsDefault":  true,
        "startDateIsDefault": true,
        "endDateIsDefault":   true,
        "durationIsDefault":  true,
        "progressIsDefault":  true
    }
});