'use strict';

const _ = require('lodash');

class Note {
    constructor(note) {
        this._note = note;
    }

    get id() {
        return this._note.id;
    }

    get version() {
        return this._note.version;
    }

    expose() {
        return _.pick(this._note, [
            'id',
            'subject',
            'body',
            'version',
            'updatedAt',
        ]);
    }

    update(note) {
        return this._note.update(note, {
            hooks: true
        });
    }

    delete() {
        return this._note.destroy();
    }
}

module.exports = Note;
