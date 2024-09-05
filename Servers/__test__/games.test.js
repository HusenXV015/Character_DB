const request = require('supertest');
const app = require('../app');
const { sequelize } = require('../models');
const { queryInterface } = sequelize;
const { hash } = require('../helpers/bcrypt');
const usersData = require('../data/users.json');
const gamesData = require('../data/games.json');

beforeAll(async () => {
  // Seeding Users
  usersData.forEach(user => {
    user.password = hash(user.password);
    user.createdAt = new Date();
    user.updatedAt = new Date();
  });
  await queryInterface.bulkInsert('Users', usersData, {});

  // Seeding Games
  gamesData.forEach(game => {
    game.createdAt = new Date();
    game.updatedAt = new Date();
  });
  await queryInterface.bulkInsert('Games', gamesData, {});
});

afterAll(async () => {
  await queryInterface.bulkDelete('Games', null, {});
  await queryInterface.bulkDelete('Users', null, {});
});

describe('Game Tests', () => {
  it('should fetch all games successfully', async () => {
    const response = await request(app).get('/games').set('Authorization', `Bearer YOUR_TOKEN`);
    expect(response.status).toBe(200);
    expect(response.body.games.length).toBeGreaterThan(0);
  });

  const request = require('supertest');
const app = require('../app');
const { Game } = require('../models');
const { signToken } = require('../helpers/jwt');

let token;
let testGame;

beforeAll(async () => {
  testGame = await Game.create({ name: 'Test Game' });
  const payload = { id: 1, email: 'admin@example.com' }; // contoh payload admin
  token = signToken(payload);
});

afterAll(async () => {
  await Game.destroy({ where: {} });
});

describe('GET /games', () => {
  it('should fetch all games', async () => {
    const res = await request(app)
      .get('/games')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.games).toHaveLength(1);
    expect(res.body.games[0]).toHaveProperty('name', 'Test Game');
  });
});

describe('POST /games/add', () => {
  it('should create a new game', async () => {
    const res = await request(app)
      .post('/games/add')
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'New Game' });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('game');
    expect(res.body.game).toHaveProperty('name', 'New Game');
  });
});

describe('DELETE /games/:id', () => {
  it('should delete the game', async () => {
    const res = await request(app)
      .delete(`/games/${testGame.id}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('message', `Success to delete game with id ${testGame.id}`);
  });
});

});
