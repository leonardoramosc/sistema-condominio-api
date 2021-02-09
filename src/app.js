const express = require('express');
const cors = require('cors');

const ownerRouter = require('./routes/ownerRoutes');
const condominioRouter = require('./routes/condominioRoutes');
const signUpRouter = require('./auth/sign-up.route');
const loginRouter = require('./auth/login.route');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ 
  credentials: true,
  origin: '*'
}));

app.get('/', (req, res) => {
  res.status(200).json({
    status: 'success',
    msg: 'connetion succesfull'
  })
})

// 3) ROUTES
app.use('/api/v1/sign-up', signUpRouter);
app.use('/api/v1/login', loginRouter);
app.use('/api/v1/condominios', condominioRouter);
app.use('/api/v1/propietarios', ownerRouter);

module.exports = app;