import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import Mqtt from 'react-native-mqtt';

const MQTTComponent = () => {
  useEffect(() => {
    // MQTT broker configurations
    const client = Mqtt.connect('broker.hivemq.com', {
      clientId: 'YourClientID',
      username: 'YourUsername',
      password: 'YourPassword',
    });

    // Subscribe to a topic
    client.on('connect', () => {
      console.log('Connected to MQTT broker');
      client.subscribe('yourTopic', err => {
        if (!err) {
          console.log('Subscribed to topic');
        }
      });
    });
    
    // Handle incoming messages
    client.on('message', (topic, message) => {
      console.log(`Received message on topic ${topic}: ${message.toString()}`);
      // Handle the received message here based on your application's logic
    });

    // Connect to the MQTT broker
    client.connect();

    return () => {
      // Disconnect from the MQTT broker when the component unmounts
      client.end();
    };
  }, []);

  return (
    <View>
      <Text>MQTT Example</Text>
      {/* Your app's components */}
    </View>
  );
};

export default MQTTComponent;
