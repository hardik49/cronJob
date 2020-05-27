const express =  require('express');

const route = require('./routes');

const app = express();
const port = 1000;

app.use("/", route);

app.listen(port, () => {
  console.log(`Server is running on http://127.0.0.1:${port}`)
});