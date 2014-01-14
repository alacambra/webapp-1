I18n.translations = I18n.translations || {};

I18n.translations['en'] = {
    date_format: 'YYYY-MM-DD',
    date_format_picker: 'yy-mm-dd',

    main_navi: {
        home: 'Home',
        pools: 'Pools',
        people: 'People',
        services: 'Services',
        message: 'Message',
        messages: 'Messages',
        projects: 'Projects',
        task: 'Task',
        tasks: 'Tasks',
        efforts: 'Efforts',
        calendar: 'Calendar',
        search_placeholder: 'Pool, Person, etc.',
        search_button_title: 'Search',
        login: 'Login',
        logout: 'Logout'
    },

    effort: {
        header: {
            list: 'Efforts',
            new: 'New effort',
            edit: 'Edit effort',
            show: 'Show Effort'
        },
        label: {
            date: 'Date',
            time: 'Duration',
            comment: 'Comment'
        },
        button: {
            new: 'New effort'
        }
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
            progress: 'Progress',
            effort: 'Effort'
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

    user: {
        header: {
            list: 'People',
            new: 'New Person',
            edit: 'Edit person'
        },
        label: {
            full_name: 'Name',
            first_name: 'First name',
            last_name: 'Last name',
            birth_date: 'Birth date',
            email: 'E-Mail',
            password: 'Password',
            password_confirmation: 'Password confirmation'
        },
        button: {
            new: 'New Person'
        }
    },

    user_session: {
        header: {
            login: 'Login'
        },
        label: {
            username: 'Username',
            password: 'Password'
        },
        auth_error: 'Login failed',
        button: {
            login: 'Send'
        }
    },

    locale: { // must not be translated
        en: 'English',
        de: 'Deutsch'
    },

    errors: {
        validation: {
            invalid: 'is invalid',
            empty: 'must be filled',
            confirmation: 'does not match confirmation',
            too_long: 'is too long (not more than {{count}} characters)',
            too_short: 'is too short (not less than {{count}} characters)',
            wrong_length: 'has wrong length (must have exactly {{count}} characters)',
            wrong_value: 'must not be {{val}}',
            date_later_than: 'must be earlier than {{attr}}',
            date_earlier_than: 'must be later than {{attr}}'
        },
        page_not_found: 'The page could not be found.',
        save_failed: 'Server error: Save failed',
        server_unreachable : 'The server did not respond. Please try again.'
    },

    delete_confirm: '"{{name}}\n\n"Really delete this entity?',

    save: 'Save',
    submit: 'Submit',
    edit: 'Edit',
    delete: 'Delete'
};