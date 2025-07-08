//mock-auth.js
const cors = require('cors');
const express    = require('express');
const bodyParser = require('body-parser');
const jwt        = require('jsonwebtoken');
const { users }  = require('./db.json');  // your users array

const app = express();
app.use(cors({ origin: [
  'http://localhost:4200', 
  'http://localhost:4201', 
  'http://localhost:4202',
  'http://localhost:4203',
  'http://localhost:4204',
] }));
app.use(bodyParser.json());

const SECRET = 'dev-jwt-secret';

// Login endpoint
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;

  //preserve for debugging
  if (process.env.NODE_ENV !== 'production') {
  console.log('[LOGIN] Incoming payload:', req.body);
  console.log('[LOGIN] Loaded users:', users);
}

  const user = users.find(u => u.email === email && u.password === password);
  if (!user){
      console.error('[LOGIN] No match for:', email);
     return res.status(401).json({ message: 'Invalid credentials' });
    }

  const token = jwt.sign({ sub: user.id, email: user.email }, SECRET, { expiresIn: '1h' });
  res.json({ accessToken: token, user: { id: user.id, email: user.email } });
});

// Protected profile endpoint
app.get('/api/users/:id', (req, res) => {
  const header = req.headers.authorization || '';
  const token  = header.replace('Bearer ', '');
  if (!token) return res.status(401).json({ message: 'Unauthorized' });

  try {
    const payload = jwt.verify(token, SECRET);
    if (payload.sub !== +req.params.id) return res.status(403).json({ message: 'Forbidden' });
    const user = users.find(u => u.id === payload.sub);
    res.json(user);
  } catch {
    res.status(401).json({ message: 'Invalid token' });
  }
});

// Register endpoint
app.post('/api/register', (req, res) => {
  const { email, password, name } = req.body;
  if (users.find(u => u.email === email)) {
    return res.status(409).json({ message: 'Email already in use' });
  }

  const newUser = {
    id: users.length + 1,
    email,
    password,
    name: name || email.split('@')[0]
  };
  users.push(newUser);
  // Note: for a real DB you'd persist to disk; here we just modify the in-memory array
  const token = jwt.sign({ sub: newUser.id, email: newUser.email }, SECRET, { expiresIn: '1h' });
  res.status(201).json({ accessToken: token, user: { id: newUser.id, email: newUser.email } });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🔐 Mock auth server listening at http://localhost:${PORT}`);
});