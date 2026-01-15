const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const usersRoutes = require('./routes/usersRoutes');
const toolsRoutes = require('./routes/toolsRoutes');
const licensesRoutes = require('./routes/licensesRoutes');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/users', usersRoutes);
app.use('/api/tools', toolsRoutes);
app.use('/api/licenses', licensesRoutes);
const activityRoutes = require('./routes/activityRoutes');
app.use('/api/activity', activityRoutes);

app.get('/', (req, res) => {
    res.send('SaaS License Management API is running');
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
