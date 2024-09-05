const request = require('supertest');
const app = require('../app');
const { sequelize } = require('../models');
const { queryInterface } = sequelize;
const { hash } = require('../helpers/bcrypt');
const usersData = require('../data/users.json');
const gamesData = require('../data/games.json');
const charactersData = require('../data/character.json');

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

  // Seeding Characters
  charactersData.forEach(character => {
    character.createdAt = new Date();
    character.updatedAt = new Date();
  });
  await queryInterface.bulkInsert('Characters', charactersData, {});
});

afterAll(async () => {
  await queryInterface.bulkDelete('Characters', null, {});
  await queryInterface.bulkDelete('Games', null, {});
  await queryInterface.bulkDelete('Users', null, {});
});

describe('Character Tests', () => {
  it('should fetch all characters successfully', async () => {
    const response = await request(app).get('/characters').set('Authorization', `Bearer YOUR_TOKEN`);
    expect(response.status).toBe(200);
    expect(response.body.characters.length).toBeGreaterThan(0);
  });

  const request = require('supertest');
const app = require('../app');
const { Character, User, Game } = require('../models');
const { signToken } = require('../helpers/jwt');

// Mock Data
let token;
let testCharacter;
let testGame;

beforeAll(async () => {
  // Buat game dan user untuk test
  const userTest = await User.create({
    username: 'testuser',
    email: 'testuser@example.com',
    password: 'password123',
    gender: 'male'
  });

  const payload = { id: userTest.id, email: userTest.email };
  token = signToken(payload);

  testGame = await Game.create({ name: 'Test Game' });

  testCharacter = await Character.create({
    name: 'Test Character',
    gender: 'Male',
    gameName: 'Test Game',
    gameId: testGame.id,
    description: 'Test Description',
    skill: 'Fireball',
    weapon: 'Sword',
    userId: userTest.id
  });
});

afterAll(async () => {
  await Character.destroy({ where: {} });
  await Game.destroy({ where: {} });
  await User.destroy({ where: {} });
});

describe('GET /characters', () => {
  it('should fetch all characters successfully', async () => {
    const res = await request(app)
      .get('/characters')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.characters).toHaveLength(1);
  });
});

describe('GET /characters/:id', () => {
  it('should fetch a character by ID', async () => {
    const res = await request(app)
      .get(`/characters/${testCharacter.id}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.characters).toHaveProperty('name', 'Test Character');
  });

  it('should return 404 if character is not found', async () => {
    const res = await request(app)
      .get('/characters/999')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(404);
    expect(res.body).toHaveProperty('message', 'Character not found');
  });
});

describe('POST /characters/add', () => {
  it('should create a new character', async () => {
    const res = await request(app)
      .post('/characters/add')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'New Character',
        gender: 'Female',
        gameName: 'Test Game',
        gameId: testGame.id,
        description: 'New Description',
        skill: 'Ice Blast',
        weapon: 'Bow'
      });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('character');
    expect(res.body.character).toHaveProperty('name', 'New Character');
  });
});

});
