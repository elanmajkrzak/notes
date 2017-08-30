'use strict';

const Sequelize = require('sequelize');

module.exports.define = sequelize => {
    return sequelize.define('NoteHistory', {
        id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        subject: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        body: {
            type: Sequelize.TEXT,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        version: {
            type: Sequelize.INTEGER,
            allowNull: false,
        }
    }, {
        indexes: [
            {
                name: 'NotesHistory_notes_id',
                unique: true,
                fields: ['noteId', 'id']
            },
        ],
    });
};
