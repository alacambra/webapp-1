I18n.translations = I18n.translations || {};

I18n.translations['de'] = {
    date_format: 'DD.MM.YYYY',
    date_format_picker: 'dd.mm.yy',

    task: {
        header: 'Aufgaben',
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

        new: 'Neuer Task',
        edit: 'Task bearbeiten'
    },

    locale: { // must not be translated
        en: 'English',
        de: 'Deutsch'
    },

    errors: {
        page_not_found: 'Die Seite wurde nicht gefunden.'
    },

    delete_confirm: 'Diesen Eintrag wirklich löschen?\n\n"{{name}}"',

    save: 'Speichern',
    edit: 'Bearbeiten',
    delete: 'Löschen'
};