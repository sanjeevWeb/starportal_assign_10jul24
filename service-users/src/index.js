require('dotenv').config()
const express = require('express')
const cors = require('cors')
const userRoute = require('./routes/user.route.js')
const connectDB = require('./database/index.js');
const swaggerJSDoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express');

const app = express()

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'service-users and service-notifications',
            version: '1.0.0',
            description: 'This is a REST API application made with Express'
        },
        servers: [
            {
                url: `http://localhost:4001/api`,
                description: 'service-users'
            },
            {
                url: `http://localhost:4002/api`,
                description: 'service-notifications'
            }
        ]
    },
    // apis: ["..src/routes*.route.js"], 
    // apis: [path.join(process.cwd()),"./routes*.route.js"], 
    apis: [__filename, "./routes*.js"],
};

const swaggerSpecification = swaggerJSDoc(swaggerOptions);

// required middlewares
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

//swagger ui setup
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpecification))

//connecting db
connectDB(process.env.MONGODB_URI)

//route middlewares
app.use('/api', userRoute)

app.listen(4001, () => {
    console.log('running on port 4001');
})