const express = require('express');
const routes = require('./routes/api');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

//set up
const app = express();
const PORT = 4000;

//middleware
app.use(bodyParser.json());


//connection
const url = 'mongodb+srv://admin:789321@cluster0.vqdcj.mongodb.net/<dbname>?retryWrites=true&w=majority'
mongoose.connect(url, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true
})
    .then((result) => app.listen(PORT, () => console.log(`listening to the port :${PORT}`)))
    .catch((err) => console.log(err));

app.use(express.static('public'));
app.use('/api', routes)

//error handling
app.use(function (err, req, res, next) {

    //console.log(err);
    res.status(422).send({ error: err.message });

})