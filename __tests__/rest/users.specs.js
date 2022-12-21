// const config = require('config');

// const {
//   withServer,
// } = require('../helpers');
// const {
//   tables,
// } = require('../../src/data');


// const data = {
//   users: [{
//     id: 1000,
//     firstName: 'test firstName',
//     lastName: 'test lastName',
//     birthdate: new Date(1990, 11, 18),
//     email: config.get('auth.testUser.username'),
//     weight: 80,
//     height: 180,
//     credits: 3,
//     auth0id: config.get('auth.testUser.userId'),

//   }],
//   // users: [{
//   //   id: 1000,
//   //   firstName: 'test user firstName 1',
//   //   lastName: 'test user lastName 1',
//   //   birthdate: new Date(1990, 11, 18),
//   //   email: 'test email 1',
//   //   password: 'test password 1',
//   //   weight: 100,
//   //   height: 100,
//   //   credits: 10,
//   //   role: 'user',
//   // },
//   // {
//   //   id: 1001,
//   //   firstName: 'test user firstName 2',
//   //   lastName: 'test user lastName 2',
//   //   birthdate: new Date(1988, 12, 12),
//   //   email: 'test email 2',
//   //   password: 'test password 2',
//   //   weight: 100,
//   //   height: 100,
//   //   credits: 10,
//   //   role: 'admin',
//   // },
//   // {
//   //   id: 1002,
//   //   firstName: 'test user firstName 3',
//   //   lastName: 'test user lastName 3',
//   //   birthdate: new Date(1990, 10, 31),
//   //   email: 'test email 3',
//   //   password: 'test password 3',
//   //   weight: 100,
//   //   height: 100,
//   //   credits: 10,
//   //   role: 'user',
//   // },
//   // ],
// };

// const dataToDelete = {
//   users: [1000],
// };

// describe('Users', () => {
//   let knex;
//   let request;
//   let authHeader;



//   withServer(({
//     knex: k,
//     request: r,
//     authHeader: a,
//   }) => {
//     knex = k;
//     request = r;
//     authHeader = a;
//   });

//   const url = '/api/users';

//   describe('GET /api/users', () => {

//     beforeAll(async () => {
//       await knex(tables.user).insert(data.users);
//     });

//     afterAll(async () => {
//       await knex(tables.user).whereIn('id', dataToDelete.users).delete();
//     });

//     test('should 200 return and all users', async () => {
//       const response = await request.get(url).set('Authorization', authHeader);
//       expect(response.status).toBe(200);

//       expect(response.body.count).toBeGreaterThanOrEqual(1);
//       expect(response.body.users.length).toBeGreaterThanOrEqual(1);
//     });
//   });

//   describe('GET /api/users/check', () => {
//     beforeAll(async () => {
//       await knex(tables.user).insert(data.users[0]);
//     });

//     afterAll(async () => {
//       await knex(tables.user).where('id', data.users[0].id).delete();
//     });

//     test('should return 200 and return user with the given id', async () => {
//       const userId = data.users[0].id;
//       const response = await request.get(`${url}/check`).set('Authorization', authHeader);
//       expect(response.status).toBe(200);
//       expect(response.body).toEqual({
//         id: userId,
//         firstName: data.users[0].firstName,
//         lastName: data.users[0].lastName,
//         birthdate: new Date(1990, 11, 18).toJSON(),
//         email: data.users[0].email,
//         weight: 80,
//         height: 180,
//         credits: 3,
//         auth0id: data.users[0].auth0id,
//       });
//     });
//   });


//   describe('GET /api/users/:id', () => {

//     beforeAll(async () => {
//       await knex(tables.user).insert(data.users[0]);
//     });

//     afterAll(async () => {
//       await knex(tables.user).where('id', data.users[0].id).delete();
//     });

//     test('should return 200 and return user with the given id', async () => {
//       const userId = data.users[0].id;
//       const response = await request.get(`${url}/${userId}`).set('Authorization', authHeader);
//       expect(response.status).toBe(200);
//       expect(response.body).toEqual({
//         id: userId,
//         firstName: data.users[0].firstName,
//         lastName: data.users[0].lastName,
//         birthdate: new Date(1990, 11, 18).toJSON(),
//         email: data.users[0].email,
//         weight: 80,
//         height: 180,
//         credits: 3,
//         auth0id: data.users[0].auth0id,
//       });
//     });
//   });


//   describe('POST /api/users/register', () => {

//     const usersToDelete = [];

//     afterAll(async () => {
//       await knex(tables.user).whereIn('id', usersToDelete).delete();
//     });

//     test('should return 201 and create a new user', async () => {
//       const response = await request.post(`${url}/register`).set('Authorization', authHeader).send({
//         firstName: data.users[0].firstName,
//         lastName: data.users[0].lastName,
//         birthdate: '2022-01-31T00:00:00.000Z',
//         email: data.users[0].email,
//         weight: 80,
//         height: 180,
//         credits: 3,
//         // auth0id: data.users[0].auth0id,
//       });
//       console.log(response.body);

//       expect(response.status).toBe(201);
//       expect(response.body.id).toBeTruthy();
//       expect(response.body.firstName).toBe(data.users[0].firstName);
//       expect(response.body.lastName).toBe(data.users[0].lastName);
//       expect(response.body.birthdate).toBe('2022-01-31T00:00:00.000Z');
//       expect(response.body.email).toBe(data.users[0].email);
//       expect(response.body.weight).toBe(80);
//       expect(response.body.height).toBe(180);
//       expect(response.body.credits).toBe(3);
//       expect(response.body.auth0id).toBe(data.users[0].auth0id);

//       usersToDelete.push(response.body.id);
//     });
//   });

//   describe('PUT /api/users/:id', () => {

//     beforeAll(async () => {
//       await knex(tables.user).insert(data.users);
//     });

//     afterAll(async () => {
//       await knex(tables.user).where('id', data.users[0].id).delete();
//     });

//     test('should return 200 and update the user with the given id', async () => {

//       const userId = data.users[0].id;
//       const response = await request.put(`${url}/${userId}`).set('Authorization', authHeader).send({
//         firstName: data.users[0].firstName,
//         lastName: data.users[0].lastName,
//         birthdate: '2022-01-31T00:00:00.000Z',
//         email: data.users[0].email,
//         weight: 80,
//         height: 180,
//         credits: 10,
//         // auth0id: data.users[0].auth0id,
//       });

//       expect(response.status).toBe(200);
//       expect(response.body).toEqual({
//         id: data.users[0].id,
//         firstName: data.users[0].firstName,
//         lastName: data.users[0].lastName,
//         birthdate: '2022-01-31T00:00:00.000Z',
//         email: data.users[0].email,
//         weight: 80,
//         height: 180,
//         credits: 10,
//         auth0id: data.users[0].auth0id,
//       });

//       // usersToDelete.push(response.body.id);
//     });
//   });


//   describe('DELETE /api/users/:id', () => {

//     beforeAll(async () => {
//       await knex(tables.user).insert(data.users[0]);
//     });


//     test('should return 204 and delete the user with the given id', async () => {
//       const response = await request.delete(`${url}/${data.users[0].id}`).set('Authorization', authHeader);
//       expect(response.status).toBe(204);
//       expect(response.body).toEqual({});
//     });
//   });
// });