require('dotenv').config();
const express = require('express');
const session = require('express-session');
const checkForSession = require('./middlewares/checkForSession');
const swgCtrl = require('./controllers/swagController');
const authCtrl = require('./controllers/authController');
const cartCtrl = require('./controllers/cartController');
const searchCtrl = require('./controllers/searchController');

const app = express();

let {SERVER_PORT, SESSION_SECRET} = process.env;

app.use(express.json());
app.use(
    session({
        secret: SESSION_SECRET,
        resave: false,
        saveUninitialized: true
    })
);
app.use(checkForSession);
app.use(express.static(`${__dirname}/../build`));

//swagCtrl
app.get('/api/swag', swgCtrl.read);

//authCtrl
app.get('/api/user', authCtrl.getUser);
app.post('/api/login', authCtrl.login);
app.post('/api/register', authCtrl.register);
app.post('/api/signout', authCtrl.signout);

//cartCtrl
app.post('/api/cart/checkout', cartCtrl.checkout);
app.post('/api/cart/:id', cartCtrl.add);
app.delete('/api/cart/:id', cartCtrl.delete);

//searchCtrl
app.get('/api/search', searchCtrl.search);


app.listen(SERVER_PORT, () => {
    console.log(`Server is listening on port ${SERVER_PORT}`);
});