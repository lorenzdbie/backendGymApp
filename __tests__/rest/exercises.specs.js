const supertest = require('supertest');
const createServer = require('../../src/createServer');
const {
  getKnex,
  tables
} = require('../../src/data');


const data = {
  trainings: [{
      id: 1,
      name: "Bench press",
      muscleGroup: "Chest",
    },
    {
      id: 2,
      name: "legs",
      muscleGroup: "Legs",

    },
    {
      id: 3,
      name: "Squat",
      muscleGroup: "Glutus Maximus, hamstring, quads",
    },
    {
      id: 4,
      name: "Pull-up",
      muscleGroup: "Back",
    },
    {
      id: 5,
      name: "Dumbell Curl",
      muscleGroup: "Biceps",
    },
  ]
};

const dataToDelete = {
  trainings: [
    1, 2, 3, 4, 5
  ]
};

describe('TrainingExercises', () => {
  let server;
  let knex;
  let request;


  beforeAll(async () => {
    server = await createServer();
    knex = getKnex();
    request = supertest(server.getApp().callback());
  });

  afterAll(async () => {
    await server.close();
  });

  const url = '/api/exercises';

  describe('GET /api/exercises', () => {

    beforeAll(async () => {
      await knex(tables.training).insert(data.trainings);
    });

    afterAll(async () => {
      await knex(tables.training).whereIn('id', dataToDelete.trainings).delete();
    });

    test('should return 200 and all trainingExcercises', async () => {

      const response = await request.get(url);
      expect(response.status).toBe(200);

      expect(response.body.count).toBeGreaterThanOrEqual(4);
      expect(response.body.items.length).toBeGreaterThanOrEqual(4);
    });
  });

  describe('GET /api/trainings/:id', () => {

    beforeAll(async () => {
      await knex(tables.training).insert(data.trainings[0]);
    });

    afterAll(async () => {
      await knex(tables.training).whereIn('id', data.trainings[0].id).delete();
    });

    test('should return 200 and the trainingExcercise with the given id', async () => {
      const response = await request.get(`${url}/${data.trainings[0].id}`);
      expect(response.status).toBe(200);
      expect(response.body).toEqual(data.trainings[0]);
    });
  });

  describe('POST /api/trainings', () => {

    const trainingstoDelete = [];

    afterAll(async () => {
      await knex(tables.training).whereIn('id', trainingstoDelete).delete();
    });

    test('should return 201 and the created trainingExcercise with the musle group: Back', async () => {
      const response = await request.post(url).send({
        name: "Cable rows",
        muscleGroup: "Back",
      });

      expect(response.status).toBe(201);
      expect(response.body.id).toBeTruthy();
      expect(response.body.name).toBe("Cable rows");
      expect(response.body.muscleGroup).toBe("Back");

      trainingstoDelete.push(response.body.id);
    });


    test('should return 201 and the created trainingExcercise with muscle group: Calves', async () => {
      const response = await request.post(url).send({
        name: "Calf raise",
        muscleGroup: "Calves",
      });
      expect(response.status).toBe(201);
      expect(response.body.id).toBeTruthy();
      expect(response.body.name).toBe("Calf raise");
      expect(response.body.muscleGroup).toBe("Calfs");

      trainingstoDelete.push(response.body.id);
    });
  });

  describe('PUT /api/trainings/:id', () => {

    beforeAll(async () => {
      await knex(tables.training).insert(data.trainings);
    });

    afterAll(async () => {
      await knex(tables.training).whereIn('id', dataToDelete.trainings).delete();
    });

    test('should return 200 and the updated trainingExcercise with muscle group: Gastrocnemius', async () => {
      const response = await request.put(`${url}/${data.trainings[0].id}`).send({
        name: "Calf Raise",
        muscleGroup: "Gastrocnemius",
      });
      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        id: data.trainings[0].id,
        name: "Calf Raise",
        muscleGroup: "Gastrocnemius",
      });
    });
  });

  describe('DELETE /api/trainings/:id', () => {
    beforeAll(async () => {
      await knex(tables.training).insert(data.trainings[0]);
    });

    test('should return 204, delete the trainingExcercise with the given id and return nothing', async () => {
      const response = await request.delete(`${url}/${data.trainings[0].id}`);
      expect(response.status).toBe(204);
      expect(response.body).toEqual({});
    });
  });
});