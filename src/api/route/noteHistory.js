'use strict';

const domain = require('../../domain');

module.exports.create = (req, res) => {
    const id = req.body.id;
    const reqNote = req.body.note;

    return domain.Note.getById(id).then(note => {
        return note.createNoteHistory(reqNote).then(noteHistory => {
            res.json(noteHistory.expose());
        });

    });
};
