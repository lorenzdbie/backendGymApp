// const  config = require('config');

// const {withServer} = require('../helpers');
// const {tables} = require('../../src/data');



// const data = {
//   appointments: [{
//     id: 1,
//     date: new Date(2022, 11, 18),
//     user_id: 10,
//     training_id: 10,
//     startTime: new Date(2022, 11, 18, 10, 0),
//     endTime: new Date(2022, 11, 18, 11, 0),
//     intensity: 3,
//     specialRequest: 'I want to do this exercise',
//   },
//   {
//     id: 2,
//     date: new Date(2022, 11, 19),
//     user_id: 10,
//     training_id: 10,
//     startTime: new Date(2022, 11, 19, 17, 30),
//     endTime: new Date(2022, 11, 19, 18, 30),
//     intensity: 1,
//     specialRequest: 'I am in bad shape',
//   }, {
//     id: 3,
//     date: new Date(2022, 11, 20),
//     user_id: 10,
//     training_id: 10,
//     startTime: new Date(2022, 11, 20, 8, 0),
//     endTime: new Date(2022, 11, 20, 10, 30),
//     intensity: 5,
//     specialRequest: 'I want to train for a championship',
//   },
//   ],
//   trainings: [{
//     id: 10,
//     name: 'test training name 1',
//     muscleGroup: 'test muscleGroup 1',
//   } ],
//   users: [{
//     id: 10,
//     firstName: 'test firstName',
//     lastName: 'test lastName',
//     birthdate: new Date(1990, 11, 18),
//     email: config.get('auth.testUser.username'),
//     weight: 80,
//     height: 180,
//     credits: 1,
//     auth0id: config.get('auth.testUser.userId'),
    
//   } ],
// };

// const dataToDelete = {
//   appointments: [1, 2, 3],
//   trainings: [10],
//   users: [10],
// };

// describe('Appointments', () => {
//   let knex;
//   let request;
//   let authHeader;

//   withServer(({knex: k, request: r, authHeader: a}) => {
//     knex = k;
//     request = r;
//     authHeader = a;
//   });


//   // beforeAll(async () => {
//   //   server = await createServer();
//   //   knex = getKnex();
//   //   request = supertest(server.getApp().callback());
//   // });

//   // afterAll(async () => {
//   //   await server.stop();
//   // });

//   const url = '/api/appointments';

//   describe('GET /api/appointments', () => {

//     beforeAll(async () => {
//       await knex(tables.training).insert(data.trainings);
//       await knex(tables.user).insert(data.users);
//       await knex(tables.appointment).insert(data.appointments);
//     });

//     afterAll(async () => {
//       await knex(tables.appointment).whereIn('id', dataToDelete.appointments).delete();
//       await knex(tables.training).whereIn('id', dataToDelete.trainings).delete();
//       await knex(tables.user).whereIn('id', dataToDelete.users).delete();
      
//     });

//     test('should return 200 and return all appointments', async () => {
//       const response = await request.get(url).set('Authorization', authHeader);
//       expect(response.status).toBe(200);
//       expect(response.body.count).toBeGreaterThanOrEqual(2);
//     });
//   });

//   describe('GET /api/appointments/:id', () => {

//     beforeAll(async () => {
//       await knex(tables.training).insert(data.trainings);
//       await knex(tables.user).insert(data.users);
//       await knex(tables.appointment).insert(data.appointments[0]);
//     });

//     afterAll(async () => {
//       await knex(tables.appointment).where('id', dataToDelete.appointments[0]).delete();
//       await knex(tables.training).whereIn('id', dataToDelete.trainings).delete();
//       await knex(tables.user).whereIn('id', dataToDelete.users).delete();
//     });

//     test('should return 200 and return one appointment', async () => {
//       const appointmentId = data.appointments[0].id;
//       const response = await request.get(`${url}/${appointmentId}`).set('Authorization', authHeader);

//       expect(response.status).toBe(200);
//       expect(response.body).toEqual({
//         id: appointmentId,
//         date: new Date(2022, 11, 18).toJSON(),
//         user: {
//           id: 10,
//           firstName: data.users[0].firstName,
//           lastName: data.users[0].lastName,
//           email: data.users[0].email,
//         },
//         training: {
//           id: 10,
//           name: 'test training name 1',
//           muscleGroup: 'test muscleGroup 1',
//         },
//         startTime: new Date(2022, 11, 18, 10, 0).toJSON(),
//         endTime: new Date(2022, 11, 18, 11, 0).toJSON(),
//         intensity: 3,
//         specialRequest: 'I want to do this exercise',
//       });
//     });
//   });

//   describe('POST /api/appointments', () => {

//     const appointmentsToDelete = [];
//     // const trainingsToDelete = [];
//     // const usersToDelete = [];
                    
//     beforeAll(async () => {
//       await knex(tables.training).insert(data.trainings);
//       await knex(tables.user).insert(data.users);
//     });

//     afterAll(async () => {
//       await knex(tables.appointment).whereIn('id', appointmentsToDelete).delete();
//       await knex(tables.training).whereIn('id', dataToDelete.trainings).delete();
//       await knex(tables.user).whereIn('id', dataToDelete.users).delete();
     
//     });


//     test('should return 201 and the newly created appointment', async () => {

//       const response = await request.post(url).set('Authorization', authHeader).send({
//         date: '2022-12-12T00:00:00.000Z',
//         userId: 10,
//         trainingId: 10,
//         startTime: '2022-12-12T12:00:00.000Z',
//         endTime: '2022-12-12T13:30:00.000Z',
//         intensity: 3,
//         specialRequest: 'This is a newly created appointment',
//       });

//       expect(response.status).toBe(201);
//       expect(response.body.id).toBeTruthy();
//       expect(response.body.date).toBe('2022-12-12T00:00:00.000Z');
//       expect(response.body.user).toEqual({
//         id: 10,
//         firstName: data.users[0].firstName,
//         lastName: data.users[0].lastName,
//         email: data.users[0].email,
//       });
//       expect(response.body.training).toEqual({
//         id: 10,
//         name: 'test training name 1',
//         muscleGroup: 'test muscleGroup 1',
//       });
//       expect(response.body.startTime).toBe('2022-12-12T12:00:00.000Z');
//       expect(response.body.endTime).toBe('2022-12-12T13:30:00.000Z');
//       expect(response.body.intensity).toBe(3);
//       expect(response.body.specialRequest).toBe('This is a newly created appointment');

//       appointmentsToDelete.push(response.body.id);
//       // usersToDelete.push(response.body.user.id);
//       // trainingsToDelete.push(response.body.training.id);

//     });
//   });

//   describe('PUT /api/appointments/:id', () => {

//     beforeAll(async () => {
//       await knex(tables.training).insert(data.trainings);
//       await knex(tables.user).insert(data.users);
//       await knex(tables.appointment).insert([{
//         id: 4,
//         date: new Date(2022, 12, 22),
//         user_id: 10,
//         training_id: 10,
//         startTime: new Date(2022, 12, 22, 14, 0, 0),
//         endTime: new Date(2022, 12, 22, 16, 0, 0),
//         intensity: 3,
//         specialRequest: '',
//       }]);
//     });

//     afterAll(async () => {
//       await knex(tables.appointment).where('id', 4).delete();
//       await knex(tables.training).whereIn('id',dataToDelete.trainings).delete();
//       await knex(tables.user).whereIn('id', dataToDelete.users).delete();
//     });

//     test('should return 200 and the updated appointment', async () => {

//       const response = await request.put(`${url}/4`).set('Authrization', authHeader).send({
//         date: '2022-12-12T00:00:00.000Z',
//         user_id: 10,
//         training_id: 10,
//         startTime: '2022-12-12T00:12:00.000Z',
//         endTime: '2022-12-12T00:13:30.000Z',
//         intensity: 5,
//         specialRequest: 'This is a newly created appointment',
//       });

//       expect(response.status).toBe(200);
//       expect(response.body.id).toBeTruthy();
//       expect(response.body.date).toBe('2022-12-12T00:00:00.000Z');
//       expect(response.body.user).toEqual({
//         id: 10,
//         firstName: data.users[0].firstName,
//         lastName: data.users[0].lastName,
//         email: data.users[0].email,
//       });
//       expect(response.body.training).toEqual({
//         id: 10,
//         name: 'test training name 1',
//         muscleGroup: 'test muscleGroup 1',
//       });
//       expect(response.body.startTime).toBe('2022-12-12T00:12:00.000Z');
//       expect(response.body.endTime).toBe('2022-12-12T00:13:30.000Z');
//       expect(response.body.intensity).toBe(5);
//       expect(response.body.specialRequest).toBe('This is a newly created appointment');


//     });
//   });


//   describe('DELETE /api/appointments/:id', () => {

//     beforeAll(async () => {
//       await knex(tables.training).insert(data.trainings);
//       await knex(tables.user).insert(data.users);
//       await knex(tables.appointment).insert([{
//         id: 4,
//         date: new Date(2022, 12, 22),
//         user_id: 10,
//         training_id: 10,
//         startTime: new Date(2022, 12, 22, 14, 0, 0),
//         endTime: new Date(2022, 12, 22, 16, 0, 0),
//         intensity: 3,
//         specialRequest: '',
//       }]);
//     });

//     afterAll(async () => {
//       await knex(tables.training).whereIn('id', dataToDelete.trainings).delete();
//       await knex(tables.user).whereIn('id', dataToDelete.users).delete();
//     });


//     test('should return 204, delete the appointment and return nothing', async () => {
//       const response = await request.delete(`${url}/4`).set('Authorization', authHeader);
//       expect(response.status).toBe(204);
//       expect(response.body).toEqual({});
//     });
//   });
// });