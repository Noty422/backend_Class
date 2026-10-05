const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('./model');

const SECRET_KEY = process.env.JWT_SECRET;

async function findUserByEmail(email) {
  return User.findOne({ email: email.toLowerCase() });
}

async function signup(name, email, password, role = 'client') {
  const normalizedEmail = email.trim().toLowerCase();
  const existingUser = await findUserByEmail(normalizedEmail);
  if (existingUser) return { error: 'Email already registered' };

  const hashedPassword = await bcrypt.hash(password, 10);
  return User.create({
    name,
    email: normalizedEmail,
    password: hashedPassword,
    role
  });
}

async function login(email, password) {
  const user = await findUserByEmail(email);
  if (!user) return null;

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) return null;

  const token = jwt.sign({ id: user._id, role: user.role }, SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES_IN || '1h'
  });
  return { token, user };
}

module.exports = { signup, login, findUserByEmail };