define({
    0: {
        id: 0,
        title: 'Task0',
        description: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.',
        startDate: 1387206224,
        progress: 0.8,
        effort: 88,
        project: {
            id: 0,
            title: 'Project0'
        },
        parent_task: {
            id: 4,
            title: 'Task4'
        },
        subtaskCount: 5
    },
    1: {
        id: 1,
        title: 'Task1',
        description: 'Lorem ipsum',
        startDate: 1387206224,
        project: {
            id: 0,
            title: 'Project0'
        },
        parent_task: {
            id: 0,
            title: 'Task0'
        },
        subtaskCount: 3
    },
    2: {
        id: 2,
        title: 'Task2',
        startDate: 1387206224,
        progress: 1,
        parent_task: {
            id: 0,
            title: 'Task0'
        },
        subtaskCount: 2
    },
    3: {
        id: 3,
        title: 'Task3',
        description: 'Lirum larum',
        startDate: 1387206224,
        progress: 0.2,
        subtaskCount: 0
    },
    4: {
        id: 4,
        title: 'Task4',
        startDate: 1387206224,
        progress: 0.5
    }
});