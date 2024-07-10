const userModel = require("../models/user.model.js");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
    const { username, email, password } = req.body;
    if(!username || !email || !password){
        return res.status(400).send({ error: 'All fields required'})
    }

    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const user = new userModel({ username, email, password: hashedPassword });
        const newUser = await user.save();
        return res.status(201).send(newUser);
    }
    catch (error) {
        return res.status(400).send(error);
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if(!email || !password){
            return res.status(400).send({ error: 'All fields required'})
        }
        const user = await userModel.findOne({ email });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).send({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET_KEY, { expiresIn: '1d' });
        return res.status(200).send({ token });
    }
    catch (error) {
        return res.status(400).send(error);
    }
}

const userById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await userModel.findOne({ id }).select('-password');
        console.log('user', user);
        if (!user) {
            return res.status(401).send({ message: 'Invalid credentials' });
        }

        res.status(200).send(user);
    }
    catch (error) {
        res.status(400).send(error);
    }
}

module.exports = {
    register,
    login,
    userById
}