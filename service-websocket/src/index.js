require('dotenv').config()
const amqp = require('amqplib');
const express = require('express')

const app = express()

const queue = 'notifications';

const httpServer = require('http').createServer(app);

io = require('socket.io')(httpServer, {
    cors: ['*']
});

io.on('connection', async (socket) => {
    socket.broadcast.emit(`id ${socket.userId} connected`);

    socket.on('disconnect', () => {
        socket.broadcast.emit(`id ${socket.userId} disconnected`);
    });
});

const startRabbitMQ = async () => {
    const conn = await amqp.connect(process.env.RABBITMQ_URI);
    const channel = await conn.createChannel();
    await channel.assertQueue(queue);
    channel.consume(queue, (msg) => {
        const notification = JSON.parse(msg.content.toString());
        console.log('notification',notification);
        io.emit('notification', notification.message);
        channel.ack(msg);
    });
};
startRabbitMQ().catch(console.error);

app.use((error, req, res, next) => {
    if(error.status) {
        return res.status(error.status).json({ message: error.message });
    }

    res.status(500).json({ message: 'something went wrong' })
})

httpServer.listen(4003, () => {
    console.log('server is running on port 4003');
});

