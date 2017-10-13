'use strict';

const Sequelize = require('sequelize');
const config = require('../config');
const sequelize = new Sequelize(config.postgresql.url, {
    logging: false
});

const User = require('./user');
const Note = require('./note');
const NoteHistory = require('./noteHistory');
const userNoteAssociation = require('./userNote');
const noteNoteHistoryAssociation = require('./noteNoteHistory');

const models = {
    sequelize,
    User: User.define(sequelize),
    Note: Note.define(sequelize),
    NoteHistory: NoteHistory.define(sequelize),
};

userNoteAssociation.define(models);
noteNoteHistoryAssociation.define(models);

module.exports = models;
