/*
 * Project:     web-application-security
 * File:        helloController.js
 * Author:      Діана Гнатюк
 * Created:     27.10.2026
 * Description: Тестові роути для перевірки ролей. Ролі задаються над кожним роутом (аналог @PreAuthorize)
 */

'use strict';

const express = require('express');
const { hasRole, hasAnyRole } = require('../middleware/authorize');

const router = express.Router();

function text(message) {
    return (req, res) => res.type('text/plain').send(message);
}

// permitAll (див. securityConfig.js)
router.get('/public', text('hello public (permitAll)'));

// @PreAuthorize("hasRole('ADMIN')")
router.get('/admin', hasRole('ADMIN'), text('hello admin'));

// @PreAuthorize("hasRole('USER')")
router.get('/user', hasRole('USER'), text('hello user'));

// @PreAuthorize("hasRole('SUPERADMIN')")
router.get('/superadmin', hasRole('SUPERADMIN'), text('hello superadmin'));

// @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
router.get('/man', hasAnyRole('USER', 'ADMIN'), text('hello man (user or admin)'));

// @PreAuthorize("hasAnyRole('ADMIN', 'SUPERADMIN')")
router.get('/staff', hasAnyRole('ADMIN', 'SUPERADMIN'), text('hello staff (admin or superadmin)'));

// Без анотації: доступ для будь-якого автентифікованого користувача
router.get('/all', text('hello all authenticated users'));

module.exports = router;