const request = require('supertest');
const app = require('../app');
const { sequelize } = require('../models');
const { hash } = require('../helpers/bcrypt');
const { signToken } = require('../helpers/jwt');

afterAll(async () => {
    await sequelize.queryInterface.bulkDelete('Users', null, { truncate: true, cascade: true, restartIdentity: true });
});

describe('UserController Tests', () => {
    describe('POST /register', () => {
        describe('POST /register - succeed', () => {
            it('should return an object with a message and user object on success', async () => {
                const body = { username: 'testuser', email: 'test@mail.com', password: '12345', gender: 'male' };
                const response = await request(app)
                    .post('/register')
                    .send(body);
                expect(response.status).toBe(201);
                expect(response.body).toBeInstanceOf(Object);
                expect(response.body).toHaveProperty('massage', 'success create new user');
                expect(response.body).toHaveProperty('user', expect.any(Object));
            });
        });

        describe('POST /register - fail', () => {
            it('should return an error for missing email', async () => {
                const body = { username: 'testuser', email: '', password: '12345', gender: 'male' };
                const response = await request(app)
                    .post('/register')
                    .send(body);
                expect(response.status).toBe(400);
                expect(response.body).toBeInstanceOf(Object);
                expect(response.body).toHaveProperty('message', expect.any(String));
            });

            it('should return an error for missing password', async () => {
                const body = { username: 'testuser', email: 'test@mail.com', password: '', gender: 'male' };
                const response = await request(app)
                    .post('/register')
                    .send(body);
                expect(response.status).toBe(400);
                expect(response.body).toBeInstanceOf(Object);
                expect(response.body).toHaveProperty('message', expect.any(String));
            });

            it('should return an error for invalid email format', async () => {
                const body = { username: 'testuser', email: 'invalidemail', password: '12345', gender: 'male' };
                const response = await request(app)
                    .post('/register')
                    .send(body);
                expect(response.status).toBe(400);
                expect(response.body).toBeInstanceOf(Object);
                expect(response.body).toHaveProperty('message', expect.any(String));
            });

            it('should return an error for short password', async () => {
                const body = { username: 'testuser', email: 'test@mail.com', password: '123', gender: 'male' };
                const response = await request(app)
                    .post('/register')
                    .send(body);
                expect(response.status).toBe(400);
                expect(response.body).toBeInstanceOf(Object);
                expect(response.body).toHaveProperty('message', expect.any(String));
            });
        });
    });

    describe('POST /login', () => {
        beforeAll(async () => {
            const user = {
                username: 'user1',
                email: 'user1@mail.com',
                password: hash('12345'),
                gender: 'male'
            };
            await sequelize.queryInterface.bulkInsert('Users', [user], {});
        });

        describe('POST /login - succeed', () => {
            it('should return an object with access_token on success', async () => {
                const body = { email: 'user1@mail.com', password: '12345' };
                const response = await request(app)
                    .post('/login')
                    .send(body);
                expect(response.status).toBe(200);
                expect(response.body).toBeInstanceOf(Object);
                expect(response.body).toHaveProperty('access_token', expect.any(String));
            });
        });

        describe('POST /login - fail', () => {
            it('should return an error for missing email', async () => {
                const body = { email: '', password: '12345' };
                const response = await request(app)
                    .post('/login')
                    .send(body);
                expect(response.status).toBe(400);
                expect(response.body).toBeInstanceOf(Object);
                expect(response.body).toHaveProperty('message', expect.any(String));
            });

            it('should return an error for missing password', async () => {
                const body = { email: 'user1@mail.com', password: '' };
                const response = await request(app)
                    .post('/login')
                    .send(body);
                expect(response.status).toBe(400);
                expect(response.body).toBeInstanceOf(Object);
                expect(response.body).toHaveProperty('message', expect.any(String));
            });

            it('should return an error for invalid email', async () => {
                const body = { email: 'wrongemail@mail.com', password: '12345' };
                const response = await request(app)
                    .post('/login')
                    .send(body);
                expect(response.status).toBe(401);
                expect(response.body).toBeInstanceOf(Object);
                expect(response.body).toHaveProperty('message', expect.any(String));
            });

            it('should return an error for incorrect password', async () => {
                const body = { email: 'user1@mail.com', password: 'wrongpassword' };
                const response = await request(app)
                    .post('/login')
                    .send(body);
                expect(response.status).toBe(401);
                expect(response.body).toBeInstanceOf(Object);
                expect(response.body).toHaveProperty('message', expect.any(String));
            });
        });
    });

    describe('POST /googleLogin', () => {
        it('should return an object with access_token on success', async () => {
            jest.mock('google-auth-library', () => {
                return {
                    OAuth2Client: jest.fn().mockImplementation(() => {
                        return {
                            verifyIdToken: jest.fn().mockResolvedValue({
                                getPayload: jest.fn().mockReturnValue({
                                    email: 'testgoogleuser@mail.com',
                                }),
                            }),
                        };
                    }),
                };
            });

            jest.spyOn(User, 'findOrCreate').mockResolvedValueOnce([
                { id: 1, username: 'testgoogleuser@mail.com', password: 'password_google' },
                true,
            ]);

            const token = 'dummy-google-oauth-token';
            const response = await request(app)
                .post('/googleLogin')
                .set('token', token);

            expect(response.status).toBe(200);
            expect(response.body).toBeInstanceOf(Object);
            expect(response.body).toHaveProperty('access_token', expect.any(String));
        });

        it('should return an error if Google token is invalid', async () => {
            jest.spyOn(OAuth2Client.prototype, 'verifyIdToken').mockImplementation(() => {
                throw new Error('Invalid token');
            });

            const token = 'invalid-google-oauth-token';
            const response = await request(app)
                .post('/googleLogin')
                .set('token', token);

            expect(response.status).toBe(500);
            expect(response.body).toBeInstanceOf(Object);
            expect(response.body).toHaveProperty('message', expect.any(String));
        });
    });
});
