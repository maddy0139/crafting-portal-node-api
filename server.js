const express = require('express');
const bodyParser = require('body-parser');
const dbConfig = require('./config/database.config');
const mongoose = require('mongoose');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }))

app.use(bodyParser.json())

mongoose.Promise = global.Promise;
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log('successfully connected to the database');
}).catch((error) => {
    console.log(error);
    console.log('could not connect to the database');
    process.exit();
});

app.get('/', (req, res) => {
    res.json({ 'message': 'Crafting portal API' });
});
require('./app/routes/category.routes')(app);
require('./app/routes/user.routes')(app);
require('./app/routes/auth.routes')(app);
require('./app/routes/subcategory.routes')(app);
app.listen(3000, () => {
    console.log('server is listening on port 3000');
});