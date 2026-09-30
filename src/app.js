/*
 * Project:     web-application-security
 * File:        app.js
 * Author:      Діана Гнатюк
 * Created:     30.09.2026
 * Description: Точка входу: запуск Express-сервера на порту 8080
 */

'use strict';

const express = require('express');
const plantController = require('./controller/plantController');

const app = express();
const PORT = 8080;

app.use(express.json());
app.use('/api/v1/plants', plantController);

app.listen(PORT, () => {
  console.log(`Server started: http://localhost:${PORT}/api/v1/plants`);
});
