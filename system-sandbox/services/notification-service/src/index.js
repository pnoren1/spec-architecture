// notification-service entry point
const express = require('express');
const notificationRoutes = require('./routes/notifications');

const app = express();
app.use(express.json());
app.use('/notifications', notificationRoutes);

// TODO: initialize event consumers
// require('./handlers/userCreatedHandler').start();
// require('./handlers/emailFailedHandler').start();

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => console.log(`notification-service running on port ${PORT}`));
