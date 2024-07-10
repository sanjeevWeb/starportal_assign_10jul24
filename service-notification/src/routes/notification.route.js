const express = require('express');
const { addNotification, getNotifications, getNotificationById, updateNotifications } = require('../controllers/notification.controller');
const authenticate = require('../auth/authenticate');

const router = express.Router();


/**
 * @swagger
 * /api/notifications:
 *   post:
 *     summary: Create a user.
 *     requestBody:
 *        required:true
 *        content:
 *          application/json:
 *              schema:
 *               type: object
 *               properties:
 *                   type: object
 *                   properties:
 *                     message:
 *                       type: string
 *                       description: The message.
 *     responses:
 *       201:
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                         type: integer
 *                         description: The notification UUID.
 *                       userId:
 *                         type: integer
 *                         description: The user ID.
 *                         example: a UUID
 *                       message:
 *                         type: string
 *                         description: The message.
 *                         example: how are you?
 *                       read:
 *                         type: boolean
 *                         description: The status.
 *                         example: true
 *                     
*/

router.post('/notifications', authenticate, addNotification);

/**
 * @openapi
 * /api/notifications:
 *   get:
 *   description: A list of notifcations.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         description: The notification UUID.
 *                       userId:
 *                         type: integer
 *                         description: The user ID.
 *                         example: a UUID
 *                       message:
 *                         type: string
 *                         description: The message.
 *                         example: how are you?
 *                       read:
 *                         type: boolean
 *                         description: The status.
 *                         example: true
 */

router.get('/notifications', authenticate, getNotifications);

/**
 * @openapi
 * /api/notifications/{id}:
 *   get:
 *     summary:  A paticular user data.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the user to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Returns user info.
 */

router.get('/notifications/:id', authenticate, getNotificationById);


/**
 * @swagger
 * /api/notifications/{id}:
 *   put:
 *     summary: Update read state.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the user to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: user info
 *         
 *                     
*/

router.put('/notifications/:id', authenticate, updateNotifications);

module.exports = router;