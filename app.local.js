const app = require('./app')
const port = 3000

console.log("exec app.local.js");
app.listen(port)

console.log(`listening on http://localhost:${port}`)
