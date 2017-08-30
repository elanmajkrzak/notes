'use strict';

module.exports.define = models => {
    models.Note.hasMany(models.NoteHistory, {
        foreignKey: {
            name: 'noteId',
            allowNull: false
        },
        as: 'versions',
        onUpdate: 'RESTRICT',
        onDelete: 'CASCADE'
    });
};
