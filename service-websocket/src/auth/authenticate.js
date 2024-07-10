const { get_user_by_id } = require("../services/internal");
const jwt = require('jsonwebtoken')


const authenticate = async (req, res, next) => {
    try {
        let token = req.headers['authorization']
        if (!token) {
            return res.status(400).json({ success: false, msg: "Required credentials" })
        }
        token = token.substring(7);
        const data = jwt.verify(token, process.env.JWT_SECRET_KEY)
        // console.log('jwtdata', data);
        const user = await get_user_by_id(req, data.id)
        if (!user) {
            return res.status(401).json({ success: false, msg: "Unauthorized access" })
        }
        req.userId = data.id
        next()
    }
    catch (e) {
        console.log(e)
        return res.status(500).json({ success: false, msg: "Internal server error" })
    }
}

const socketAuthenticate = async (socket, next) => {
    console.log('demo')
    const token = socket.handshake.query.token
    if (token) {
        const data = jwt.verify(token, process.env.JWT_SECRET)
        const user = await get_user_by_id(req, data.id)
        socket.user = user
        next()
    } else {
        next(new Error("token not found"))
    }
}

module.exports = {authenticate, socketAuthenticate}