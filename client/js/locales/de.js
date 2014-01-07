I18n.translations = I18n.translations || {};

I18n.translations['de'] = {
    date_format: 'DD.MM.YYYY',
    date_format_picker: 'dd.mm.yy',

    main_navi: {
        pools: 'Pools',
        people: 'People',
        services: 'Dienste',
        messages: 'Nachrichten',
        projects: 'Projekte',
        tasks: 'Aufgaben',
        calendar: 'Kalender',
        search_placeholder: 'Pool, Person, usw.',
        search_button_title: 'Suchen',
        login: 'Anmelden',
        logout: 'Abmelden'
    },

    project: {
        header: {
            list: 'Projekte',
            new: 'Neues Projekt',
            edit: 'Projekt bearbeiten'
        },
        label: {
            title: 'Titel',
            description: 'Beschreibung',
            status: 'Status',
            start_date: 'Start',
            end_date: 'Ende'
        },
        status_options: {
            todo: 'ToDo',
            new: 'Neu',
            assigned: 'Zugewiesen',
            on_hold: 'Wartend',
            completed: 'Fertig',
            archieved: 'Archiviert',
            requested: 'Angefragt',
            offered: 'Angeboten'
        },
        button: {
            new: 'Neues Projekt'
        }
    },

    task: {
        header: {
            list: 'Aufgaben',
            new: 'Neuer Task',
            edit: 'Task bearbeiten'
        },
        label: {
            title: 'Titel',
            description: 'Beschreibung',
            status: 'Status',
            priority: 'Priorität',
            start_date: 'Start',
            end_date: 'Ende',
            duration: 'Geschätzter Aufwand',
            duration_short: 'Aufwand',
            progress: 'Fortschritt'
        },
        status_options: {
            todo: 'ToDo',
            new: 'Neu',
            assigned: 'Zugewiesen',
            on_hold: 'Wartend',
            completed: 'Fertig',
            archieved: 'Archiviert',
            requested: 'Angefragt',
            offered: 'Angeboten'
        },
        priority_options: {
            low: 'Niedrig',
            normal: 'Normal',
            high: 'Hoch'
        },
        button: {
            new: 'Neuer Task'
        }
    },

    locale: { // must not be translated
        en: 'English',
        de: 'Deutsch'
    },

    errors: {
        validation: {
            invalid: 'ist nicht gültig',
            empty: 'muss ausgefüllt werden',
            date_later_than: 'muss früher sein als {{attr}}',
            date_earlier_than: 'muss später sein als {{attr}}'
        },
        page_not_found: 'Die Seite wurde nicht gefunden.',
        save_failed: 'Serverfehler: Speichern fehlgeschlagen'
    },

    delete_confirm: '"{{name}}"\n\nDiesen Eintrag wirklich löschen?',

    save: 'Speichern',
    submit: 'Absenden',
    edit: 'Bearbeiten',
    delete: 'Löschen'
};