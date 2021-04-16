const {app, connect} = require('./app')
const logger = require('./utils/logger')
const config = require('./utils/config')

connect();

app.listen(config.PORT, () => {
	logger.info(`Server running on port ${config.PORT}`)
})
