// template-service entry point
const express = require('express');
const templateRoutes = require('./routes/templates');

const app = express();
app.use(express.json());
app.use('/templates', templateRoutes);

const PORT = process.env.PORT || 3004;
app.listen(PORT, () => console.log(`template-service running on port ${PORT}`));
