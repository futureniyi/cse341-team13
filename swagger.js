const swaggerAutogen = require('swagger-autogen')();

const doc = {
  swagger: '2.0',
  info: {
    title: 'University Library Management API',
    description: 'Swagger documentation for the CSE 341 Final Project API.',
    version: '1.0.0'
  },
  schemes: ['https', 'http'],
  consumes: ['application/json'],
  produces: ['application/json']
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);
