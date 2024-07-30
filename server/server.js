const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
require('dotenv').config();
require('./cronJobs');
const { readdirSync } = require('fs');
const connectDB = require('./config/db');
const { swaggerUi, swaggerSpec } = require('./config/swaggerConfig');


const app = express();

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
connectDB();

app.use(morgan('dev'));
app.use(bodyParser.json({ limit: '20mb' }));
app.use(cors());
app.use(cors({
  origin: 'http://localhost:3000', // หรือ URL ของ frontend ของคุณ
  methods: ['GET', 'POST'],
  credentials: true,
}));
readdirSync('./routes').map((r) => app.use('/api', require('./routes/' + r)));



const port = process.env.PORT;
app.listen(port, () => {
  console.log('Server is running on port ' + port);
});
