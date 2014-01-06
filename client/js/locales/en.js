I18n.translations = I18n.translations || {};

I18n.translations['en'] = {
    date_format: 'YYYY-MM-DD',
    date_format_picker: 'yy-mm-dd',

    main_navi: {
        pools: 'Pools',
        people: 'People',
        services: 'Services',
        messages: 'Messages',
        projects: 'Projects',
        tasks: 'Tasks',
        calendar: 'Calendar',
        search_placeholder: 'Pool, Person, etc.',
        search_button: 'Search',
        login: 'Login',
        logout: 'Logout'
    },

    project: {
        header: {
            list: 'Projects',
            new: 'New Project',
            edit: 'Edit Project'
        },
        label: {
            title: 'Title',
            description: 'Description',
            status: 'Status',
            start_date: 'Start',
            end_date: 'End'
        },
        status_options: {
            todo: 'ToDo',
            new: 'New',
            assigned: 'Assigned',
            on_hold: 'On hold',
            completed: 'Completed',
            archieved: 'Archieved',
            requested: 'Requested',
            offered: 'Offered'
        },
        button: {
            new: 'New Project'
        }
    },

    task: {
        header: {
            list: 'Tasks',
            new: 'New Task',
            edit: 'Edit Task'
        },
        label: {
            title: 'Title',
            description: 'Description',
            status: 'Status',
            priority: 'Priority',
            start_date: 'Start',
            end_date: 'End',
            duration: 'Estimated Duration',
            duration_short: 'Duration',
            progress: 'Progress'
        },
        status_options: {
            todo: 'ToDo',
            new: 'New',
            assigned: 'Assigned',
            on_hold: 'On hold',
            completed: 'Completed',
            archieved: 'Archieved',
            requested: 'Requested',
            offered: 'Offered'
        },
        priority_options: {
            low: 'Low',
            normal: 'Normal',
            high: 'High'
        },
        button: {
            new: 'New Task'
        }
    },

    locale: { // must not be translated
        en: 'English',
        de: 'Deutsch'
    },

    errors: {
        page_not_found: 'The page could not be found.'
    },

    delete_confirm: '"{{name}}\n\n"Really delete this entity?',

    save: 'Save',
    submit: 'Submit',
    edit: 'Edit',
    delete: 'Delete'
};