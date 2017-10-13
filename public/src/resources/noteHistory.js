'use strict';

angular.module('app').factory('NoteHistory', function($resource) {
    return $resource('/api/noteHistory/:id', {}, {});
});
