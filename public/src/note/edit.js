'use strict';

angular.module('app').component('noteEdit', {
    templateUrl: '/src/note/edit.html',
    bindings: {
        session: '<',
        note: '<',
        notehistory: '@',
    },
    controller: function(Note, NoteHistory, $location) {
        this.$onInit = function() {
            this.notehistory = this.note.body;
        };

        this.updateNote = function() {
            this.error = this._validate();

            if (!this.error) {
                NoteHistory.save({
                    id: this.note.id,
                    note: {
                        subject: this.note.subject,
                        body: this.notehistory,
                        version: this.note.version
                    }
                });

                Note.update({
                    id: this.note.id
                }, {
                    body: this.note.body
                }).$promise.then(() => {
                    $location.path(`/notes/${ this.note.id }`);
                }).catch(reason => {
                    this.error = 'Error occurred while updating the note.';
                });
            }
        };

        this._validate = function() {
            if (!this.note.body) {
                return 'The body is empty.';
            }
        };
    },
});
