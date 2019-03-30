const logger = require('./utils/logger');
const app = require('./utils/express');

const port = 3010;

// listen to requests
app.listen(port, () => logger.info(`server started on port ${port} (${process.env.NODE_ENV})`));
