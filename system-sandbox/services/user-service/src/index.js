// user-service entry point
const express = require('express');
const userRoutes = require('./routes/users');

const app = express();
app.use(express.json());
app.use('/users', userRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`user-service running on port ${PORT}`));
