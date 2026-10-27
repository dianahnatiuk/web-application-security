/*
 * Project:     web-application-security
 * File:        users.js
 * Author:      Діана Гнатюк
 * Created:     27.10.2026
 * Description: Користувачі в пам'яті (аналог InMemoryUserDetailsManager), паролі {noop}
 */

'use strict';

const users = [
    { username: 'admin', password: '{noop}admin', role: 'ADMIN' },
    { username: 'user', password: '{noop}user', role: 'USER' },
    { username: 'superadmin', password: '{noop}superadmin', role: 'SUPERADMIN' },
];

function findUser(username) {
    return users.find((u) => u.username === username);
}

function passwordMatches(user, rawPassword) {
    const stored = user.password;
    if (stored.startsWith('{noop}')) {
        return stored.slice('{noop}'.length) === rawPassword;
    }
    return false;
}

module.exports = { findUser, passwordMatches };