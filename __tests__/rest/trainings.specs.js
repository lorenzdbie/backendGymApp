// // const supertest = require('supertest');
// // const createServer = require('../../src/createServer');
// // const {
// //   getKnex,
// //   tables
// // } = require('../../src/data');

// const {
//   withServer,
// } = require('../helpers');
// const {
//   tables,
// } = require('../../src/data');


// const data = {
//   trainings: [{
//     id: 100,
//     name: 'test training name 1',
//     muscleGroup: 'test muscleGroup 1',
//   }, {
//     id: 110,
//     name: 'test training name 2',
//     muscleGroup: 'test muscleGroup 2',
//   }, {
//     id: 120,
//     name: 'test training name 3',
//     muscleGroup: 'test muscleGroup 3',
//   },{
//     id: 130,
//     name: 'test training name 4',
//     muscleGroup: 'test muscleGroup 4',
//   },{
//     id: 140,
//     name: 'test training name 5',
//     muscleGroup: 'test muscleGroup 5',
//   },
//   ],
// };

// const dataToDelete = {
//   trainings: [
//     100, 110, 120, 130, 140,
//   ],
// };

// describe('TrainingExercises', () => {
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

//   const url = '/api/trainings';

//   describe('GET /api/trainings', () => {

//     beforeAll(async () => {
//       await knex(tables.training).insert(data.trainings);
//     });

//     afterAll(async () => {
//       await knex(tables.training).whereIn('id', dataToDelete.trainings).delete();
//     });

//     test('should return 200 and all trainingExcercises', async () => {

//       const response = await request.get(url).set('Authorization', authHeader);
//       expect(response.status).toBe(200);

//       expect(response.body.count).toBeGreaterThanOrEqual(4);
//       expect(response.body.trainings.length).toBeGreaterThanOrEqual(4);
//     });
//   });

//   describe('GET /api/trainings/:id', () => {

//     beforeAll(async () => {
//       await knex(tables.training).insert(data.trainings[0]);
//     });

//     afterAll(async () => {
//       await knex(tables.training).where('id', data.trainings[0].id).delete();
//     });

//     test('should return 200 and the trainingExcercise with the given id', async () => {
//       const response = await request.get(`${url}/${data.trainings[0].id}`).set('Authorization', authHeader);
//       expect(response.status).toBe(200);
//       expect(response.body).toEqual(data.trainings[0]);
//     });
//   });

//   describe('POST /api/trainings', () => {

//     const trainingsToDelete = [];

//     afterAll(async () => {
//       await knex(tables.training).whereIn('id', trainingsToDelete).delete();
//     });

//     test('should return 201 and the created trainingExcercise with the musle group: Back', async () => {
//       const response = await request.post(url).set('Authorization', authHeader).send({
//         name: 'Cable rows',
//         muscleGroup: 'Back',
//       });

//       expect(response.status).toBe(201);
//       expect(response.body.id).toBeTruthy();
//       expect(response.body.name).toBe('Cable rows');
//       expect(response.body.muscleGroup).toBe('Back');

//       trainingsToDelete.push(response.body.id);
//     });

//   });

//   describe('PUT /api/trainings/:id', () => {

//     beforeAll(async () => {
//       await knex(tables.training).insert(data.trainings);
//     });

//     afterAll(async () => {
//       await knex(tables.training).whereIn('id', dataToDelete.trainings).delete();
//     });

//     test('should return 200 and the updated trainingExcercise with muscle group: Gastrocnemius', async () => {
//       const response = await request.put(`${url}/${data.trainings[0].id}`).set('Authorization', authHeader).send({
//         name: 'Calf Raise',
//         muscleGroup: 'Gastrocnemius',
//       });
//       expect(response.status).toBe(200);
//       expect(response.body).toEqual({
//         id: data.trainings[0].id,
//         name: 'Calf Raise',
//         muscleGroup: 'Gastrocnemius',
//       });
//     });
//   });

//   describe('DELETE /api/trainings/:id', () => {
//     beforeAll(async () => {
//       await knex(tables.training).insert(data.trainings[0]);
//     });

//     test('should return 204, delete the trainingExcercise with the given id and return nothing', async () => {
//       const response = await request.delete(`${url}/${data.trainings[0].id}`).set('Authorization', authHeader);
//       expect(response.status).toBe(204);
//       expect(response.body).toEqual({});
//     });
//   });
// });