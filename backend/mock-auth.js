//mock-auth.js
const cors = require('cors');
const express    = require('express');
const bodyParser = require('body-parser');
const jwt        = require('jsonwebtoken');
const fs          = require('fs');
const path        = require('path');

const DB_PATH     = path.resolve(__dirname, 'db.json');
const { users }   = require(DB_PATH); // initial load

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

// Enable persistence for  
const ENABLE_PERSISTENCE = process.env.PERSIST_DB === 'true';

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
//TODO and check
// Register endpoint with persistence
app.post('/api/register', (req, res) => {
  
  //preserve for debugging
  if (process.env.NODE_ENV !== 'production') {
    console.log('DB_PATH:', DB_PATH);
  }
  const { email, password, name } = req.body;

  // reload so we always operate on the latest file
  const db       = JSON.parse(fs.readFileSync(DB_PATH, 'utf8'));
  const existing = db.users.find(u => u.email === email);

  if (existing) {
    return res.status(409).json({ message: 'Email already in use' });
  }

  const newUser = {
    id: db.users.length + 1,
    email,
    password,
    name: name || email.split('@')[0]
  };

  db.users.push(newUser);

  // only persist to disk when flag is on
  if (ENABLE_PERSISTENCE) {
    fs.writeFileSync(
      DB_PATH,
      JSON.stringify(db, null, 2),
      'utf8'
   );
 }
  const token = jwt.sign({ sub: newUser.id, email: newUser.email }, SECRET, { expiresIn: '1h' });
  res.status(201).json({ accessToken: token, user: { id: newUser.id, email: newUser.email } });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🔐 Mock auth server listening at http://localhost:${PORT}`);
});