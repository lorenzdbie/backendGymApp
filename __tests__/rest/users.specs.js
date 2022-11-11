const {
  withServer,
} = require('../helpers');
const {
  tables,
} = require('../../src/data');


const data = {
  users: [{
    id: 1000,
    firstName: 'test user firstName 1',
    lastName: 'test user lastName 1',
    birthdate: new Date(1990, 11, 18),
    email: 'test email 1',
    password: 'test password 1',
    weight: 100,
    height: 100,
    credits: 10,
    role: 'user',
  },
  {
    id: 1001,
    firstName: 'test user firstName 2',
    lastName: 'test user lastName 2',
    birthdate: new Date(1988, 12, 12),
    email: 'test email 2',
    password: 'test password 2',
    weight: 100,
    height: 100,
    credits: 10,
    role: 'admin',
  },
  {
    id: 1002,
    firstName: 'test user firstName 3',
    lastName: 'test user lastName 3',
    birthdate: new Date(1990, 10, 31),
    email: 'test email 3',
    password: 'test password 3',
    weight: 100,
    height: 100,
    credits: 10,
    role: 'user',
  },
  ],
};

const dataToDelete = {
  users: [1000, 1001, 1002],
};

describe('Users', () => {
  let knex;
  let request;


  withServer(({
    knex: k,
    request: r,
  }) => {
    knex = k;
    request = r;
  });

  const url = '/api/users';

  describe('GET /api/users', () => {

    beforeAll(async () => {
      await knex(tables.user).insert(data.users);
    });

    afterAll(async () => {
      await knex(tables.user).whereIn('id', dataToDelete.users).delete();
    });

    test('should 200 return and all users', async () => {
      const response = await request.get(url);
      expect(response.status).toBe(200);

      expect(response.body.count).toBeGreaterThanOrEqual(2);
      expect(response.body.users.length).toBeGreaterThanOrEqual(2);
    });
  });

  describe('GET /api/users/:id', () => {

    beforeAll(async () => {
      await knex(tables.user).insert(data.users[0]);
    });

    afterAll(async () => {
      await knex(tables.user).where('id', data.users[0].id).delete();
    });

    test('should return 200 and return user with the given id', async () => {
      const userId = data.users[0].id;
      const response = await request.get(`${url}/${userId}`);
      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        id: userId,
        firstName: 'test user firstName 1',
        lastName: 'test user lastName 1',
        birthdate: new Date(1990, 11, 18).toJSON(),
        email: 'test email 1',
        password: 'test password 1',
        weight: 100,
        height: 100,
        credits: 10,
        role: 'user',
      });
    });
  });


  describe('POST /api/users', () => {

    const usersToDelete = [];

    afterAll(async () => {
      await knex(tables.user).whereIn('id', usersToDelete).delete();
    });

    test('should return 201 and create a new user', async () => {
      const response = await request.post(url).send({
        firstName: 'test firstName',
        lastName: 'test lastName',
        birthdate: new Date(1990, 11, 18),
        email: 'test email',
        password: 'test password',
        weight: 80,
        height: 180,
        credits: 1,
        role: 'user',
      });

      expect(response.status).toBe(201);
      expect(response.body.id).toBeTruthy();
      expect(response.body.firstName).toBe('test firstName');
      expect(response.body.lastName).toBe('test lastName');
      expect(response.body.birthdate).toBe(new Date(1990, 11, 18).toJSON());
      expect(response.body.email).toBe('test email');
      expect(response.body.password).toBe('test password');
      expect(response.body.weight).toBe(80);
      expect(response.body.height).toBe(180);
      expect(response.body.credits).toBe(1);
      expect(response.body.role).toBe('user');

      usersToDelete.push(response.body.id);
    });
  });

  describe('PUT /api/users/:id', () => {

    beforeAll(async () => {
      await knex(tables.user).insert(data.users);
    });

    afterAll(async () => {
      await knex(tables.user).whereIn('id', dataToDelete.users).delete();
    });

    test('should return 200 and update the user with the given id', async () => {

      const response = await request.put(`${url}/${data.users[0].id}`).send({
        firstName: 'test newFirstName',
        lastName: 'test newLName',
        birthdate: '2022-01-31T00:00:00.000Z',
        email: 'test email',
        password: 'test password',
        weight: 80,
        height: 180,
        credits: 10,
        role: 'adim',
      });

      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        id: data.users[0].id,
        firstName: 'test newFirstName',
        lastName: 'test newLName',
        birthdate: '2022-01-31T00:00:00.000Z',
        email: 'test email',
        password: 'test password',
        weight: 80,
        height: 180,
        credits: 10,
        role: 'adim',
      });
    });
  });


  describe('DELETE /api/users/:id', () => {

    beforeAll(async () => {
      await knex(tables.user).insert(data.users[0]);
    });


    test('should return 204 and delete the user with the given id', async () => {
      const response = await request.delete(`${url}/${data.users[0].id}`);
      expect(response.status).toBe(204);
      expect(response.body).toEqual({});
    });
  });
});