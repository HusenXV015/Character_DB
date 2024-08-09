const request = require('supertest');
const app = require('../app');
const { signToken } = require('../helpers/jwt');
const { sequelize } = require('../models');

let access_token;

beforeAll(async () => {
  
    const users = require('../data/users.json');
    const games = require('../data/games.json');
    const characters = require('../data/characters.json');


    users.forEach(el => {
        el.password = require('../helpers/bcrypt').hash(el.password);
        el.updatedAt = el.createdAt = new Date();
    });

    await sequelize.queryInterface.bulkInsert('Users', users, {});
    await sequelize.queryInterface.bulkInsert('Games', games, {});
    await sequelize.queryInterface.bulkInsert('Characters', characters, {});

    const payload = {
        id: 1,
        email: 'admin@example.com',
        role: 'admin'
    };
    access_token = signToken(payload);
});

afterAll(async () => {
    await sequelize.queryInterface.bulkDelete('Users', null, { truncate: true, cascade: true, restartIdentity: true });
    await sequelize.queryInterface.bulkDelete('Games', null, { truncate: true, cascade: true, restartIdentity: true });
    await sequelize.queryInterface.bulkDelete('Characters', null, { truncate: true, cascade: true, restartIdentity: true });
});

describe('Character Endpoints', () => {
    describe('GET /characters', () => {
        it('should get all characters', async () => {
            const response = await request(app)
                .get('/characters')
                .set('Authorization', `Bearer ${access_token}`);
            expect(response.status).toBe(200);
            expect(response.body).toBeInstanceOf(Object);
            expect(response.body).toHaveProperty('characters', expect.any(Array));
            expect(response.body.characters.length).toBeGreaterThan(0);
        });
    });

    describe('GET /characters/:id', () => {
        it('should get character details by id', async () => {
            const response = await request(app)
                .get('/characters/1')
                .set('Authorization', `Bearer ${access_token}`);
            expect(response.status).toBe(200);
            expect(response.body).toBeInstanceOf(Object);
            expect(response.body).toHaveProperty('characters');
            expect(response.body.characters).toHaveProperty('id', 1);
        });

        it('should return 404 for non-existing character', async () => {
            const response = await request(app)
                .get('/characters/999')
                .set('Authorization', `Bearer ${access_token}`);
            expect(response.status).toBe(404);
            expect(response.body).toBeInstanceOf(Object);
            expect(response.body).toHaveProperty('message', 'Character not found');
        });
    });

    describe('POST /characters/add', () => {
        it('should create a new character successfully', async () => {
            const response = await request(app)
                .post('/characters/add')
                .set('Authorization', `Bearer ${access_token}`)
                .send({
                    name: 'New Character',
                    gender: 'Female',
                    gameName: 'New Game',
                    gameId: 1,
                    description: 'A new character',
                    skill: 'Magic',
                    weapon: 'Sword',
                    imgUrl: 'http://image.url'
                });
            expect(response.status).toBe(201);
            expect(response.body).toBeInstanceOf(Object);
            expect(response.body).toHaveProperty('message', 'Success input Character');
            expect(response.body.character).toHaveProperty('name', 'New Character');
        });

        it('should fail to create character with invalid data', async () => {
            const response = await request(app)
                .post('/characters/add')
                .set('Authorization', `Bearer ${access_token}`)
                .send({ name: '', gender: '', gameName: '', gameId: '', description: '', skill: '', weapon: '', imgUrl: '' });
            expect(response.status).toBe(400);
            expect(response.body).toBeInstanceOf(Object);
            expect(response.body).toHaveProperty('message', 'Validation error');
        });
    });

    describe('PUT /characters/:id', () => {
        it('should update a character successfully', async () => {
            const response = await request(app)
                .put('/characters/1')
                .set('Authorization', `Bearer ${access_token}`)
                .send({
                    name: 'Updated Character',
                    gender: 'Male',
                    gameName: 'Updated Game',
                    gameId: 1,
                    description: 'An updated character',
                    skill: 'Swordsmanship',
                    weapon: 'Axe',
                    imgUrl: 'http://updated.url'
                });
            expect(response.status).toBe(200);
            expect(response.body).toBeInstanceOf(Object);
            expect(response.body).toHaveProperty('message', 'Success edit Character');
        });

        it('should fail to update non-existing character', async () => {
            const response = await request(app)
                .put('/characters/999')
                .set('Authorization', `Bearer ${access_token}`)
                .send({
                    name: 'Updated Character',
                    gender: 'Male',
                    gameName: 'Updated Game',
                    gameId: 1,
                    description: 'An updated character',
                    skill: 'Swordsmanship',
                    weapon: 'Axe',
                    imgUrl: 'http://updated.url'
                });
            expect(response.status).toBe(404);
            expect(response.body).toBeInstanceOf(Object);
            expect(response.body).toHaveProperty('message', 'Character not found.');
        });
    });

    describe('PATCH /characters/:id', () => {
        it('should update a character partially', async () => {
            const response = await request(app)
                .patch('/characters/1')
                .set('Authorization', `Bearer ${access_token}`)
                .send({
                    name: 'Partially Updated Character'
                });
            expect(response.status).toBe(200);
            expect(response.body).toBeInstanceOf(Object);
            expect(response.body).toHaveProperty('message', 'Success update Character');
        });

        it('should fail to update non-existing character', async () => {
            const response = await request(app)
                .patch('/characters/999')
                .set('Authorization', `Bearer ${access_token}`)
                .send({ name: 'Partially Updated Character' });
            expect(response.status).toBe(404);
            expect(response.body).toBeInstanceOf(Object);
            expect(response.body).toHaveProperty('message', 'Character not found.');
        });
    });

    describe('DELETE /characters/:id', () => {
        it('should delete a character successfully', async () => {
            const response = await request(app)
                .delete('/characters/1')
                .set('Authorization', `Bearer ${access_token}`);
            expect(response.status).toBe(200);
            expect(response.body).toBeInstanceOf(Object);
            expect(response.body).toHaveProperty('message', 'Successfully deleted.');
        });

        it('should fail to delete non-existing character', async () => {
            const response = await request(app)
                .delete('/characters/999')
                .set('Authorization', `Bearer ${access_token}`);
            expect(response.status).toBe(404);
            expect(response.body).toBeInstanceOf(Object);
            expect(response.body).toHaveProperty('message', 'Character not found.');
        });
    });
});
