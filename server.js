const express = require('express');
const router = require("./routes/routes")
const port = 3000
const app = express()
app.use(express.json())

app.use(router)

app.listen(port, () => {
    console.log(`server is running at port ${port}`)
})