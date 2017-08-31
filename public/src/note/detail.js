'use strict';

angular.module('app').component('noteDetail', {
    templateUrl: '/src/note/detail.html',
    bindings: {
        session: '<',
        note: '<',
        notehistory: '<',
        historicalSubject: '@',
        historicalBody: '@',
        historicalVersion: '@',
    },
    controller: function() {
        this.$onInit = function() {
            this.hasVersions = !_.isEmpty(this.notehistory);
            this.showHistory = false;
        };

        this.status = {
            isopen: false
        };

        this.toggleDropdown = function($event) {
            $event.preventDefault();
            $event.stopPropagation();
            this.status.isopen = !this.status.isopen;
        };

        this.loadVersion = function(notehistory) {
            this.historicalSubject = notehistory.subject;
            this.historicalBody = notehistory.body;
            this.historicalVersion = notehistory.version;
            this.showHistory = true;
        }
    },
});
