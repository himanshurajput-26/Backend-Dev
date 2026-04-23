// Key idea:
// Local → login
// JWT → protect API

// (Simplified answer)
app.post('/auth/login', passport.authenticate('local'), (req, res) => {
  res.json({ message: "Logged in (session)" });
});

app.post('/auth/api-login', (req, res) => {
  const token = jwt.sign({ id: 1 }, "secret");
  res.json({ token });
});

app.get('/dashboard', (req, res) => {
  if (!req.isAuthenticated()) return res.status(401).send("Login required");
  res.send("Dashboard");
});

app.get('/api/profile', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.json({ user: req.user });
});