/**
 * Created by Angel on 4/14/2016.
 */
/// <reference path="../../typings/main.d.ts" />

var assert = require('assert');

describe('This is a test test', () =>  {
    describe('test in test test', () => {
        it('should not fail', done => done());
        it('should be awesome', done => done());
        it('is a test', done => done());
        it('contains a test', done => done());
        it('is tssty', done => done());
        it('does tests', done => done());
        it('is another test', done => done());
        it('has more tests', done => done());
        it('is another test', done => done());
        it('failed test', () => {assert.equal(7,7)});
        it('is my name');
        it('idk');
        it('has not been implemented');
        it('is another test');
    });
});