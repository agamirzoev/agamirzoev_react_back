const jwt = require('jsonwebtoken');
const { Users } = require('../models');

const secret = process.env.accessTokenSecret;

module.exports = {
  async registration(req, res) {
    const {
      email, password, login, name,
    } = req.body;
    const person = await Users.findOne({ where: { email } });
    if (person) {
      return res.status(400).json({ message: 'User is already exists' });
    }
    const user = await Users.create({
      email,
      name,
      login,
      password,
      avatar: null,
    });
    const payload = { id: user.id };
    const token = jwt.sign(payload, secret);
    return res.json({ message: 'Registration was successful!', token });
  },

  async login(req, res) {
    const { email, password } = req.body;
    const user = await Users.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: 'User not found!' });
    }
    const isPasswordValid = user.password === password;

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Incorrect password!' });
    }
    const payload = { id: user.id };
    const token = jwt.sign(payload, secret);
    return res.json({ message: 'Authorization was successful!', token });
  },
};