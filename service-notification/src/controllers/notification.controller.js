const notificationModel = require("../models/notification.model");
const amqp = require("amqplib");
const queue = "notifications";

const addNotification = async (req, res) => {
    const { message } = req.body;
    if (!message) {
        return res.status(400).send({ error: 'No data found' })
    }
    try {
        const userId = req.userId
        const notification = new notificationModel({ userId, message });
        const newNotification = await notification.save();

        // rabbitmq push msg
        const conn = await amqp.connect(process.env.RABBITMQ_URI);
        const channel = await conn.createChannel();
        await channel.assertQueue(queue);
        channel.sendToQueue(queue, Buffer.from(JSON.stringify(notification)));

        return res.status(201).send(newNotification);
    }
    catch (error) {
        return res.status(500).send(error);
    }
}

const getNotifications = async (req, res) => {
    try {
        // pagination
        const { msg_per_page, curr_page_no } = req.query
        let notifications;
        if (msg_per_page && curr_page_no) {
            notifications = await notificationModel.find().skip(msg_per_page * curr_page_no).limit(msg_per_page)
        }
        else {
            notifications = await notificationModel.find()

        }
        return res.status(200).send(notifications);
    }
    catch (error) {
        return res.status(500).send(error);
    }
}

const getNotificationById = async (req, res) => {
    try {
        const { id } = req.params
        const notification = await notificationModel.findOne({ id })
        if (!notification) {
            return res.send(404).send({ msg: 'No data found' })
        }
        return res.status(200).send(notification);
    }
    catch (error) {
        return res.status(500).send(error);
    }
}

const updateNotifications = async (req, res) => {
    try {
        const { id } = req.params
        const notification = await notificationModel.findOneAndUpdate({ id }, { read: true }, { new: true })
        if (!notification) {
            return res.status(404).send({ msg: 'No data found' })
        }
        return res.status(200).send(notification);
    }
    catch (error) {
        return res.status(500).send(error);
    }
}

module.exports = {
    addNotification,
    getNotifications,
    getNotificationById,
    updateNotifications
}