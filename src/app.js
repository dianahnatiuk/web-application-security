/*
 * Project:     web-application-security
 * File:        app.js
 * Author:      Діана Гнатюк
 * Created:     30.09.2026
 * Description: Точка входу: запуск Express-сервера на порту 8080
 */

'use strict';

const path = require('path');
const express = require('express');
const securityFilterChain = require('./config/securityConfig');
const plantController = require('./controller/plantController');
const helloController = require('./controller/helloController');

const app = express();
const PORT = 8080;

app.use(securityFilterChain);
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/api/v1/plants', plantController);
app.use('/hello', helloController);

app.listen(PORT, () => {
  console.log(`Server started: http://localhost:${PORT}`);
});
