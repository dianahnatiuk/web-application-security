/*
 * Project:     web-application-security
 * File:        authorize.js
 * Author:      Діана Гнатюк
 * Created:     27.10.2026
 * Description: Перевірка ролей: hasRole і hasAnyRole (403 при недостатніх правах)
 */

'use strict';

function hasAnyRole(...roles) {
    return (req, res, next) => {
        if (req.user && roles.includes(req.user.role)) {
            return next();
        }
        return res.status(403).end();
    };
}

function hasRole(role) {
    return hasAnyRole(role);
}

module.exports = { hasRole, hasAnyRole };