const kafka = require('node-rdkafka');

const producer = new kafka.Producer({
  'metadata.broker.list': 'localhost:9092', // Replace with your Kafka broker address
  'dr_cb': true
});

producer.on('ready', () => {
  console.log('Producer ready');

  const topic = 'test';
  const message = 'Hello, Kafka!';

  producer.produce(topic, null, Buffer.from(message));
});

producer.on('delivery-report', (err, report) => {
  if (err) {
    console.error('Error delivering message:', err);
  } else {
    console.log('Message delivered:', report);
  }
});

producer.connect();
