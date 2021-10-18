require("dotenv").config();
const Express = require('express');
const app = Express();
const dbConnection = require("./db");

const controllers = require("./controllers");
const { application } = require("express");

app.use(Express.json());

app.use("/user", controllers.userController);

// app.use(require("./middleware/validate-jwt"));
app.use("/workout", controllers.workoutController);

dbConnection.authenticate()
    .then(() => dbConnection.sync())
    .then(() => {
        app.listen(5000, () => {
            console.log(`[Server]: App is listening on 5000.`);
        });
    })
    .catch((err) => {
        console.log(`[Server]: Server crashed. Error = ${err}`);
    });

// app.use('/test', (req, res) => {
//     res.send('This is a message from the test endpoint on the server!')
// });

// app.listen(5000, () => {
//     console.log(`[Server]: App is listening on 5000.`);
// });