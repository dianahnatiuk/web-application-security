/*
 * Project:     web-application-security
 * File:        securityConfig.js
 * Author:      Діана Гнатюк
 * Created:     27.10.2026
 * Description: Правила доступу (аналог SecurityFilterChain): permitAll, hasRole, hasAnyRole, authenticated
 */

'use strict';

const basicAuth = require('../middleware/basicAuth');
const { hasRole, hasAnyRole } = require('../middleware/authorize');

const permitAll = (req, res, next) => next();
const authenticated = [basicAuth];

// Правила перевіряються по порядку: перше, що збіглося, і діє
const rules = [
    { paths: ['/', '/index.html'], access: [permitAll] },
    { paths: ['/hello/admin'], access: [basicAuth, hasRole('ADMIN')] },
    { paths: ['/hello/user'], access: [basicAuth, hasRole('USER')] },
    { paths: ['/hello/superadmin'], access: [basicAuth, hasRole('SUPERADMIN')] },
    { paths: ['/hello/man'], access: [basicAuth, hasAnyRole('USER', 'ADMIN')] },
];

function run(chain, req, res, next) {
    let index = 0;
    function step() {
        const handler = chain[index];
        index += 1;
        if (!handler) return next();
        return handler(req, res, step);
    }
    step();
}

// Усе, про що в правилах нічого не сказано, вимагає автентифікації
function securityFilterChain(req, res, next) {
    const rule = rules.find((r) => r.paths.includes(req.path));
    run(rule ? rule.access : authenticated, req, res, next);
}

module.exports = securityFilterChain;