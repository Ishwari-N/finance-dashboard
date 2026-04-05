const app = require('./src/app');
const initDatabase = require('./src/config/initDb'); // Add this line
const port = process.env.PORT || 5000;

// Initialize Database Tables
initDatabase();

app.listen(port, () => {
  console.log(`🚀 Server is flying on http://localhost:${port}`);
});