/* eslint-disable no-undef */
const { app, connect } = require('./app.js')

const PORT = process.env.PORT || 3003
connect()
app.listen(PORT, () => {
  console.log(`server is listening on port ${PORT}`)
})
