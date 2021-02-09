const app = require('./app');
const {sequelize} = require('./models');

const port = process.env.PORT || 3000;

sequelize.sync().then(() => {
  const server = app.listen(port, () => {
    console.log(`server listen on port: ${port}`)
  });

  process.on('SIGTERM', () => {
    console.log('👋 SIGTERM RECEIVED. Shutting down gracefully');
    server.close(() => {
      console.log('💥 Process terminated!');
    });
  });
});