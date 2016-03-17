'use strict';

var azure = require('azure');
var Agent = require('agentkeepalive').HttpsAgent;

var keepaliveAgent = new Agent({
    maxSockets: 100,
    maxFreeSockets: 10,
    timeout: 60000,
    keepAliveTimeout: 30000
});

function ServiceBusClient(options) {
    this.serviceBus = azure.createServiceBusService(options.serviceBusConnection);
    this.serviceBus.setAgent(keepaliveAgent);
}

ServiceBusClient.prototype.createTopic = function(topic, callback) {
    this.serviceBus.createTopicIfNotExists(topic, function (error) {
        if (error) {
            return callback(error);
        }
        return callback();
    });
};

ServiceBusClient.prototype.createSubscription = function(topic, subscription, callback) {
    this.serviceBus.createSubscription(topic, subscription, function (error) {
        if (error) {
            return callback(error);
        }
        return callback();
    });
};

ServiceBusClient.prototype.createTopicAndSubscription = function(topic, subscription, callback) {
    var self = this;
    self.createTopic(topic, function (error) {
        if (error){
            return callback(error);
        }
        self.createSubscription(topic, subscription, function (error) {
            if (error) {
                return callback(error);
            }
            return callback();
        });
    });
};

ServiceBusClient.prototype.receiveSubscriptionMessage = function(topic, subscription, callback) {
    this.serviceBus.receiveSubscriptionMessage(topic, subscription, function (error, message) {
        if(error) {
            return callback(error);
        }
        return callback(null, message);
    });
};

ServiceBusClient.prototype.sendTopicMessage = function(topic, message, callback) {
    this.serviceBus.sendTopicMessage(topic, JSON.stringify(message), function(error) {
        if (error) {
            return callback(error);
        }
        return callback();
    });
};

module.exports = ServiceBusClient;