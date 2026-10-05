const { signup, login } = require('./service');

async function handleSignup(req, res) {
  try {
    const { name, email, password, role, adminKey } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Name, email, and password are required' });
    }

    let finalRole = 'client';
    if (role === 'admin') {
      if (!process.env.ADMIN_SECRET || adminKey !== process.env.ADMIN_SECRET) {
        return res.status(403).json({ message: 'Invalid admin key' });
      }
      finalRole = 'admin';
    }

    const result = await signup(name, email, password, finalRole);
    if (result.error) return res.status(409).json({ message: result.error });

    const { password: _, ...userWithoutPassword } = result.toObject();
    res.status(201).json(userWithoutPassword);
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({ message: 'Email already registered' });
    }
    res.status(500).json({ message: err.message });
  }
}

async function handleLogin(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const result = await login(email, password);
    if (!result) return res.status(401).json({ message: 'Invalid email or password' });

    const { token, user } = result;
    const { password: _, ...userWithoutPassword } = user.toObject();
    res.status(200).json({ token, user: userWithoutPassword });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

module.exports = { handleSignup, handleLogin };