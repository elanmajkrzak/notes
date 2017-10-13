'use strict';

const _ = require('lodash');
require('should');
const domain = require('../../src/domain');
const model = require('../../src/model');

describe('Tests for domain Note', function() {
    let noteId;
    let noteVersion;
    let modelUser;
    let domainNote;

    beforeEach(() => {
        return model.sequelize.sync({
            force: true
        }).then(() => {
            return model.User.createUser('user1', 'password1').then(user => {
                modelUser = user;

                return user.createNote({
                    subject: 'some subject',
                    body: 'some body',
                }).then(note => {
                    noteId = note.id;
                    noteVersion = note.version;
                    domainNote = new domain.Note(note);
                });
            });
        });
    });

    describe('instance method', () => {
        describe('getters', () => {
            it('should get the id', () => {
                domainNote.id.should.equal(noteId);
            });
            it('should get the version', () => {
                domainNote.version.should.equal(noteVersion);
            });
        });

        describe('expose', () => {
            it('should expose the id, subject, body, version, and updatedAt of the note', () => {
                domainNote.expose().should.match({
                    id: noteId,
                    subject: 'some subject',
                    body: 'some body',
                    version: noteVersion,
                    updatedAt: _.isDate,
                });
            });
        });

        describe('update', () => {
            it('should update the body of the note', () => {
                return domainNote.update({
                    body: 'new body'
                }).then(() => {
                    domainNote.expose().should.match({
                        id: noteId,
                        subject: 'some subject',
                        body: 'new body',
                        version: noteVersion + 1,
                        updatedAt: _.isDate,
                    });
                });
            });
        });

        describe('delete', () => {
            it('should delete the note', () => {
                return domainNote.delete().then(() => {
                    return modelUser.getNotes().then(notes => {
                        notes.should.be.empty();
                    });
                });
            });
        });
    });
});
