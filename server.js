const express = require('express')
//const auth=require("./routes/middleware/auth.js")
const router = express.Router();
     
const swaggerJSDoc=require('swagger-jsdoc')
const swaggerUI=require('swagger-ui-express')


var cors = require('cors')
const bodyParser = require('body-parser')
const app = express()
app.use(cors())
app.use(bodyParser.json())
const db=require('./db')
app.use(express.json())
const path = require('path')
require('dotenv').config()

const roomsRoutes = require('./routes/roomsRoute')
const userRoute = require('./routes/userRoute')
const bookingsRoute=require('./routes/bookingsRoute')
const adminRoute=require('./routes/adminRoute')

app.use('/api/rooms',roomsRoutes) 
app.use('/api/users' , userRoute)
app.use('/api/bookings' , bookingsRoute)
app.use('/api/adminb' , adminRoute)


if(process.env.NODE_ENV ==='production')
{
    app.use('/' , express.static('./frontend/build'))

    app.get('*' , (req , res)=>{

        res.sendFile(path.resolve(__dirname  , 'frontend/build/index.html'))

    })
}

const port = process.env.PORT || 5000
app.listen(port, () => console.log(`Node JS Server Started ${port}`))




const swaggerOptions={
    definition:{
        openapi:'3.0.0',
        info:{
            title:'Hotel Management System',
            version:'1.0.0',
            description:'Employe Api for employee management',
            contact:{
                name:'Md Asif Ali',
                email:'mdasifali2k0@gmail.com'
            },
            server:["http://localhost:5000"]
        }
    },
    apis:[`${__dirname}/routes/userRoute.js`,`${__dirname}/routes/roomsRoute.js`,`${__dirname}/routes/adminRoute.js`,`${__dirname}/routes/bookingsRoute.js`]
    
}

const swaggerDocs=swaggerJSDoc(swaggerOptions);
app.use('/api-docs',swaggerUI.serve,swaggerUI.setup(swaggerDocs));

