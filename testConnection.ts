import dataSource from './src/typeorm-cli.config.js'; // Adjust path if needed

dataSource
  .initialize()
  .then(() => {
    console.log('Data Source has been initialized successfully!');
  })
  .catch((err) => {
    console.error('Error during Data Source initialization:', err);
  });
