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

    task: {
        header: 'Tasks',
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

        new: 'New Task',
        edit: 'Task bearbeiten'
    },

    locale: { // must not be translated
        en: 'English',
        de: 'Deutsch'
    },

    errors: {
        page_not_found: 'The page could not be found.'
    },

    delete_confirm: 'Really delete this entity?\n\n"{{name}}"',

    save: 'Save',
    submit: 'Submit',
    edit: 'Edit',
    delete: 'Delete'
};