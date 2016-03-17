var expect = require('chai').expect;
var serviceBusHandler = require('../index');
var sinon = require('sinon');
var stub = sinon.createStubInstance(serviceBusHandler);

stub.createTopic.callsArgWith(1, null);
stub.createSubscription.callsArgWith(2, null);
stub.createTopicAndSubscription.callsArgWith(2, null);

describe('Given a serviceBusHandler', function () {
    describe('When createTopicAndSubscription is called', function () {

        it('Then one createTopicIfNotExists and one createSubscription call are made', function (done) {
            stub.createTopicAndSubscription('testTopic', 'testSubscription', function () {
                expect(stub.createTopic).to.have.been.calledOnce;
                expect(stub.createSubscription).to.have.been.calledOnce;
                done();
            });
        });
    });
});