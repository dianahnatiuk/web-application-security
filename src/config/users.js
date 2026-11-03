/*
 * Project:     web-application-security
 * File:        users.js
 * Author:      Діана Гнатюк
 * Created:     27.10.2026
 * Description: Користувачі в пам'яті (аналог InMemoryUserDetailsManager), паролі {noop}
 */

'use strict';

const bcrypt = require('bcryptjs');

// Аналог @Bean PasswordEncoder (BCryptPasswordEncoder)
const passwordEncoder = {
    encode: (rawPassword) => bcrypt.hashSync(rawPassword, 10),
    matches: (rawPassword, encodedPassword) => bcrypt.compareSync(rawPassword, encodedPassword),
};

const users = [
    { username: 'admin', password: passwordEncoder.encode('admin'), role: 'ADMIN' },
    { username: 'user', password: passwordEncoder.encode('user'), role: 'USER' },
    { username: 'superadmin', password: passwordEncoder.encode('superadmin'), role: 'SUPERADMIN' },
];

function findUser(username) {
    return users.find((u) => u.username === username);
}

function passwordMatches(user, rawPassword) {
    return passwordEncoder.matches(rawPassword, user.password);
}

module.exports = { findUser, passwordMatches, passwordEncoder };
