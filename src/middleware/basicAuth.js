/*
 * Project:     web-application-security
 * File:        basicAuth.js
 * Author:      Діана Гнатюк
 * Created:     06.10.2026
 * Description: Middleware базової (Basic) авторизації для всіх запитів
 */

'use strict';

const { findUser, passwordMatches } = require('../config/users');

function basicAuth(req, res, next) {
    const header = req.headers.authorization || '';
    const [scheme, encoded] = header.split(' ');

    if (scheme === 'Basic' && encoded) {
        const decoded = Buffer.from(encoded, 'base64').toString('utf8');
        const separator = decoded.indexOf(':');

        if (separator !== -1) {
            const username = decoded.slice(0, separator);
            const password = decoded.slice(separator + 1);
            const user = findUser(username);

            if (user && passwordMatches(user, password)) {
                req.user = { username: user.username, role: user.role };
                return next();
            }
        }
    }

    res.set('WWW-Authenticate', 'Basic realm="plant-catalog"');
    return res.status(401).end();
}

module.exports = basicAuth;