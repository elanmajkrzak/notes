'use strict';

const _ = require('lodash');
const q = require('q');
const model = require('../model');
const domain = require('../domain');

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

    createNoteHistory(note) {
        return this._note.createVersion(note).then(modelNoteHistory => {
            return new domain.NoteHistory(modelNoteHistory);
        });
    }

    update(note) {
        return this._note.update(note, {
            hooks: true
        });
    }

    delete() {
        return this._note.destroy();
    }

    static getById(id) {
        return model.Note.findOne({
            where: {
                id
            }
        }).then(modelNote => {
            if (!modelNote) {
                return q.reject(new domain.Error(domain.Error.Code.NOTE_NOT_FOUND));
            }
            else {
                return new Note(modelNote);
            }
        });
    }
}

module.exports = Note;
