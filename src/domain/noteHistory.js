'use strict';

const _ = require('lodash');

class NoteHistory {
    constructor(note) {
        this._noteHistory = note;
    }

    get id() {
        return this._noteHistory.id;
    }

    get version() {
        return this._noteHistory.version;
    }

    expose() {
        return _.pick(this._noteHistory, [
            'id',
            'subject',
            'body',
            'version',
            'updatedAt',
        ]);
    }

    update(noteHistory) {
        return this._noteHistory.update(noteHistory);
    }

    delete() {
        return this._noteHistory.destroy();
    }
}

module.exports = NoteHistory;
