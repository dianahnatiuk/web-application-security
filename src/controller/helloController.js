/*
 * Project:     web-application-security
 * File:        helloController.js
 * Author:      Діана Гнатюк
 * Created:     27.10.2026
 * Description: Тестові роути для перевірки ролей
 */

'use strict';

const express = require('express');

const router = express.Router();

function text(message) {
    return (req, res) => res.type('text/plain').send(message);
}

router.get('/admin', text('hello admin'));
router.get('/user', text('hello user'));
router.get('/superadmin', text('hello superadmin'));
router.get('/man', text('hello man (user or admin)'));
router.get('/all', text('hello all authenticated users'));

module.exports = router;