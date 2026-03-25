// audit-service entry point
const express = require('express');
const auditRoutes = require('./routes/audit');

const app = express();
app.use(express.json());
app.use('/audit', auditRoutes);

// TODO: initialize event consumers
// require('./handlers/eventLogger').start();

const PORT = process.env.PORT || 3005;
app.listen(PORT, () => console.log(`audit-service running on port ${PORT}`));
