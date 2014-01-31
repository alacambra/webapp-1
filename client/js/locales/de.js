I18n.translations = I18n.translations || {};

I18n.translations['de'] = {
    date_format: 'DD.MM.YYYY',
    date_format_picker: 'dd.mm.yy',

    main_navi: {
        home: 'Start',
        pools: 'Pools',
        people: 'People',
        services: 'Dienste',
        message: 'Nachricht',
        messages: 'Nachrichten',
        projects: 'Projekte',
        task: 'Aufgabe',
        tasks: 'Aufgaben',
        effort: 'Aufwand',
        efforts: 'Aufwände',
        calendar: 'Kalender',
        search_placeholder: 'Pool, Person, usw.',
        search_button_title: 'Suchen',
        login: 'Anmelden',
        logout: 'Abmelden'
    },

    effort: {
        label: {
            date: 'Datum',
            time: 'Dauer',
            comment: 'Kommentar'
        },
        button: {
            new: 'Neuer Aufwand'
        }
    },

    pool: {
        label: {
            name: 'Name',
            description: 'Beschreibung',
            street: 'Straße',
            house_number: 'Hausnummer',
            city: 'Ort',
            zip: 'PLZ',
            country: 'Land',
            email: 'E-Mail',
            website: 'Website',
            founding_date: 'Gründungsjahr',
            employee_count: 'Anzahl Mitarbeiter',
            phone: 'Telefon',
            fax: 'Fax'
        },
        country_options : {
            unselected: '',
            germany: 'Deutschland',
            great_britain: 'Großbritannien',
            austria: 'Österreich',
            switzerland: 'Schweiz'
        },
        employee_count_options: {
            unselected: '',
            10: '1-10',
            50: '11-50',
            200: '51-200',
            500: '201-500',
            many: '>500'
        },
        button: {
            new: 'Neuer Pool'
        }
    },

    project: {
        label: {
            title: 'Titel',
            description: 'Beschreibung',
            task_count: 'Aufgaben',
            status: 'Status',
            start_date: 'Start',
            end_date: 'Ende',
            progress: 'Fortschritt',
            effort: 'Aufgewendete Zeit',
            effort_short: 'Zeit'
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

    service: {
        label: {
            name: 'Name',
            description: 'Beschreibung'
        },
        button: {
            new: 'Neuer Dienst'
        }
    },

    task: {
        label: {
            title: 'Titel',
            description: 'Beschreibung',
            status: 'Status',
            priority: 'Priorität',
            start_date: 'Start',
            end_date: 'Ende',
            duration: 'Geschätzter Aufwand',
            duration_short: 'Aufwand',
            progress: 'Fortschritt',
            effort: 'Aufgewendete Zeit',
            effort_short: 'Zeit',
            project: 'Projekt',
            subtask: 'Unteraufgaben',
            parent_task: 'Übergeordnete Aufgabe',
            assigned_to: 'Zugewiesen'
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
            new: 'Neue Aufgabe'
        },
        delete_confirm: 'Aufgabe "{{name}}" und seine {{count}} Unteraufgaben werden gelöscht.\n\nSind Sie wirklich sicher die Aufgabe {{name}} und seine {{count}} Unteraufgaben zu löschen?',
        assoc_to_project_prompt: 'Bitte geben Sie die ID des Zielprojektes ein:',
        assoc_to_project_failed: 'Task "{{name}}" konnte nicht verschoben werden.\n\nEin Projekt mit der ID "{{id}}" existiert nicht.',
        assoc_to_task_prompt: 'Bitte geben Sie die ID der Zielaufgabe ein:',
        assoc_to_task_failed: 'Task "{{name}}" konnte nicht verschoben werden.\n\nEine Aufgabe mit der ID "{{id}}" existiert nicht.',
        assoc_to_user_prompt: 'Bitte geben Sie die ID des Benutzers ein:',
        assoc_to_user_failed: 'Task "{{name}}" konnte nicht zugewiesen werden.\n\nEin Benutzer mit der ID "{{id}}" existiert nicht.'
    },

    user: {
        label: {
            full_name: 'Name',
            first_name: 'Vorname',
            last_name: 'Nachname',
            birth_date: 'Geburtsdatum',
            email: 'E-Mail',
            password: 'Passwort',
            password_confirmation: 'Passwort Wiederholung'
        },
        button: {
            new: 'Neue Person'
        }
    },

    user_session: {
        label: {
            username: 'Benutzer',
            password: 'Passwort'
        },
        auth_error: 'Anmeldung fehlgeschlagen',
        button: {
            login: 'Absenden'
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
            confirmation: 'stimmt nicht mit der Wiederholung überein',
            too_long: 'ist zu lang (nicht mehr als {{count}} Zeichen)',
            too_short: 'ist zu kurz (nicht weniger als {{count}} Zeichen)',
            wrong_length: 'hat die falsche Länge (muss genau {{count}} Zeichen haben)',
            wrong_value: 'darf nicht {{val}} sein',
            no_number: 'muss eine Zahl sein',
            date_later_than: 'muss früher sein als {{attr}}',
            date_earlier_than: 'muss später sein als {{attr}}'
        },
        page_not_found: 'Die Seite wurde nicht gefunden.',
        save_failed: 'Serverfehler: Speichern fehlgeschlagen',
        server_unreachable : 'Der Server antwortet nicht. Bitte versuchen Sie es erneut.'
    },

    common: {
        empty_list: 'Liste ist leer.'
    },

    delete_confirm: '"{{name}}"\n\nDiesen Eintrag wirklich löschen?',

    save: 'Speichern',
    submit: 'Absenden',
    edit: 'Bearbeiten',
    delete: 'Löschen',
    new: 'Neu'
};