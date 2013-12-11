define(['app',
        'tpl!app/tasks/edit/templates/edit.tpl',
        'backbone_syphon'],
function(App, edit_tpl) {
    App.module('Tasks.Edit', function(Edit, App, Backbone, Marionette, $, _) {
        Edit.Task = Marionette.ItemView.extend({
            template: edit_tpl,


            events: {
                'click button.js-submit': 'submit'
            },


            templateHelpers: {
                format_date: function(date) {
                    if (date == null || date === undefined) return '';
                    return moment(date * 1000).format('DD.MM.YYYY');
                },

                status_text: function(status) {
                    var texts = ['ToDo', 'New', 'Assigned', 'On hold', 'Completed', 'Archieved', 'Requested', 'Offered'];
                    return texts[status] || '';
                },

                priority_text: function(priority) {
                    var texts = ['Low', 'Normal', 'High'];
                    return texts[priority] || '';
                },

                format_duration: function(duration) {
                    if (duration == null || duration === undefined) return '';
                    var duration = moment.duration(duration, 'minutes');
                    return parseInt(duration.asHours()) + ':' + pad(duration.asMinutes() % 60);
                },

                format_progress: function(progress) {
                    if (progress == null || progress === undefined) return '';
                    return progress * 100 + '%';
                }
            },


            onSaveSuccessful: function() {
                setTimeout(function() {
                    $('#js-task-save-inidcator').fadeOut(300, function() {
                        $('.js-submit').removeClass('disabled')
                    });
                }, 100);
            },


            onSaveError: function() {
                setTimeout(function() {
                    $('#js-task-save-inidcator').fadeOut(300, function() {
                        $('.js-submit').removeClass('disabled')
                    });
                }, 100);
                console.log('save error');
            },


            submit: function(e) {
                e.preventDefault();
                var data = Backbone.Syphon.serialize(this);
                this.trigger('form:submit', data);
                this.$('#js-task-save-inidcator').fadeIn(300);
                this.$('.js-submit').addClass('disabled');
            }
        });
    });

    return App.Tasks.Edit;
});
