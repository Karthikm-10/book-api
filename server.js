//import dependencies
const express = require("express")
const dotEnv = require("dotenv")
const mongoose = require("mongoose")
const bookRouter = require('./routes/bookRoute')
dotEnv.config()
const app = express()
const PORT = process.env.PORT || 5000

app.use(express.json())
app.use('/',bookRouter)
//Connect MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser : true,
    useUnifiedTopology : true
})
.then(() => console.log("MongoDb connected successfully"))
.catch(() => console.log("MongoDb is Not connected"))

//Start the server
app.listen(PORT,() => {
    console.log(`Server is running on the port ${PORT}`);
})