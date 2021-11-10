const express = require('express');
const app = express()
const routesUrls = require('./Routes/routes')
const mongoose = require('mongoose')
// app.use(express.json())
const dotenv = require('dotenv')
// mongoose.connect('mongodb://localhost/SHORT-URL', {
//   useNewUrlParser: true, useUnifiedTopology: true,
  
// }, ()=> {
//     console.log("Database Connected")
// })

dotenv.config()
mongoose.connect(process.env.DATABASE_ACCESS, ()=>{
    console.log("Database Connected")
})

app.set('view engine', 'ejs')
app.use(express.urlencoded({extended: false}))




//routeURL
app.use('/', routesUrls)
app.use('/shortUrls', routesUrls)
app.use('/:shortUrl', routesUrls)


app.listen(3000, ()=>console.log("server is running"))