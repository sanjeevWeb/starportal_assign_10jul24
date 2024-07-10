const { register, login, userById } = require("../controller/user.controller");
const express = require('express')

const router = express.Router();

/**
 * @swagger
 * /register:
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
 *                     username:
 *                       type: string
 *                       description: The user's name.
 *                       example: Tarak Mehta
 *                     email:
 *                       type: string
 *                       description: The user's email id.
 *                       example: sample@sample.com
 *                     password:
 *                       type: string
 *                       description: The user's password to create account.
 *                       example: any random string
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
 *                       type: integer
 *                       description: The user UUID.
 *                       example: 0
 *                     username:
 *                       type: string
 *                       description: The user's name.
 *                       example: Tarak Mehta
 *                     email:
 *                       type: string
 *                       description: The user's email id.
 *                       example: sample@sample.com
 *                     _id:
 *                       type: string
 *                       description: The user's mongodb id.
 *                       example: _any random string
*/

router.post('/register', register);


/**
 * @swagger
 * /login:
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
 *                     email:
 *                       type: string
 *                       description: The user's email id.
 *                       example: sample@sample.com
 *                     password:
 *                       type: string
 *                       description: The user's password to create account.
 *                       example: any random string
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
 *                     token:
 *                       type: string
 *                       description: The user JWT token.
 *                     
*/
router.post('/login', login);


/**
 * @swagger
 * /user/{id}:
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
router.get('/user/:id', userById);

module.exports = router;
