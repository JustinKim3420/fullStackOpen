const { app, connect } = require("./app.js");

const PORT = process.env.PORT || 3000;
connect();
app.listen(PORT, () => {
  console.log("server is listening on port 3000");
});
