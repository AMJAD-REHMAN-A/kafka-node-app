const kafka = require('node-rdkafka');

const consumer = new kafka.KafkaConsumer({
  'group.id': 'test-group',
  'metadata.broker.list': 'localhost:9092', // Replace with your Kafka broker address
  'auto.offset.reset': 'earliest'
});

consumer.on('ready', () => {
  console.log('Consumer ready');

  consumer.subscribe(['test']);
  consumer.consume();
});

consumer.on('data', (message) => {
  console.log('Received message:', message.value.toString());
});

consumer.on('event.error', (error) => {
  console.error('Consumer error:', error);
});

consumer.connect();
