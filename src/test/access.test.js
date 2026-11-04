const request = require('supertest');
const app = require('../app');

describe('Access Control & Basic Auth Tests (10 tests)', () => {

    // 1. Успішна авторизація звичайного користувача
    test('1. User access to /hello/user with valid credentials (200 OK)', async () => {
        const res = await request(app)
            .get('/hello/user')
            .auth('user', 'user');
        expect(res.statusCode).toEqual(200);
    });

    // 2. Успішний доступ адміністратора
    test('2. Admin access to /hello/admin with valid credentials (200 OK)', async () => {
        const res = await request(app)
            .get('/hello/admin')
            .auth('admin', 'admin');
        expect(res.statusCode).toEqual(200);
    });

    // 3. Перевірка доступу до /hello/man
    test('3. Admin/Superadmin access to /hello/man (200 OK)', async () => {
        const res = await request(app)
            .get('/hello/man')
            .auth('admin', 'admin'); // Якщо потрібен admin замість superadmin
        expect(res.statusCode).toEqual(200);
    });

    // 4. Доступ суперадміна до маршруту /hello/staff (Виправлено шлях)
    test('4. Superadmin access to /hello/staff (200 OK)', async () => {
        const res = await request(app)
            .get('/hello/staff')
            .auth('superadmin', 'superadmin');
        expect(res.statusCode).toEqual(200);
    });

    // 5. Доступ користувача до /hello/all (Виправлено шлях)
    test('5. User access to unprotected endpoint /hello/all (200 OK)', async () => {
        const res = await request(app)
            .get('/hello/all')
            .auth('user', 'user');
        expect(res.statusCode).toEqual(200);
    });

    // 6. Доступ суперадміна до /hello/all (Виправлено шлях)
    test('6. Superadmin access to unprotected endpoint /hello/all (200 OK)', async () => {
        const res = await request(app)
            .get('/hello/all')
            .auth('superadmin', 'superadmin');
        expect(res.statusCode).toEqual(200);
    });

    // 7. Відмова в доступі при невірному паролі (401 Unauthorized)
    test('7. Wrong password access to /hello/admin (401 Unauthorized)', async () => {
        const res = await request(app)
            .get('/hello/admin')
            .auth('admin', 'wrong');
        expect(res.statusCode).toEqual(401);
    });

    // 8. Відмова при відсутності заголовоку авторизації (401 Unauthorized)
    test('8. Anonymous request to protected /hello/user (401 Unauthorized)', async () => {
        const res = await request(app)
            .get('/hello/user');
        expect(res.statusCode).toEqual(401);
    });

    // 9. Недостатньо прав доступу (403 Forbidden - User на Admin ендпоінт)
    test('9. Insufficient role user accessing /hello/admin (403 Forbidden)', async () => {
        const res = await request(app)
            .get('/hello/admin')
            .auth('user', 'user');
        expect(res.statusCode).toEqual(403);
    });

    // 10. Перевірка публічного ресурсу без заголовка авторизації
    test('10. Unauthenticated access to public root / (200 OK)', async () => {
        const res = await request(app)
            .get('/');
        expect(res.statusCode).toEqual(200);
    });
});