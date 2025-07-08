//mock-auth.js
const express    = require('express');
const bodyParser = require('body-parser');
const jwt        = require('jsonwebtoken');
const { users }  = require('./db.json');  // your users array

const app = express();
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

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🔐 Mock auth server listening at http://localhost:${PORT}`);
});