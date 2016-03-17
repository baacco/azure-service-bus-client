# azure-service-bus-client

### Azure Service Bus wrapper for node.js

This is a very simple wrapper that just need to be initialized passing the Service Bus connection string, as such:

    var ServiceBusClient = require('azure-service-bus-client');
    var serviceBusClient = new ServiceBusClient(
        {
            serviceBusConnection: [SERVICE BUS CONNECTION STRING HERE]
        }
    );

This will give access to the **serviceBusClient**, to:

### Create a topic

    serviceBusClient.createTopic(topicName, function(error) {
        ...
    });

### Create a subscription

    serviceBusClient.createSubscription(createSubscription, function(error) {
        ...
    });

### Create a topic and subscribe to it

    serviceBusClient.createTopicAndSubscription(topicName, subscriptionName, function(error) {
        ...
    });

### Receive subscription messages

    serviceBusClient.receiveSubscriptionMessage(topicName, subscriptionName, function (err, message) {
        ...
    });


### Send topic messages

    serviceBusClient.sendTopicMessage(topicName, message, function(error) {
        if(error) {
            ...
        }
        ...
    });

### Changelog

- v1.0.1 - Basic working version and README

