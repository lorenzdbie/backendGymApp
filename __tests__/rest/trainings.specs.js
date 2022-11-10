const supertest = require('supertest');
const createServer = require('../../src/createServer');
const {
  getKnex,
  tables
} = require('../../src/data');


const data = {
  trainings: [{
    training_id: 10,
      name: "test training name 1",
      muscleGroup: "test muscleGroup 1",
    },
    {
      training_id: 11,
      name: "test training name 2",
      muscleGroup: "test muscleGroup 2",

    },
    {
      training_id: 12,
      name: "test training name 3",
      muscleGroup: "test muscleGroup 3",
    },
    {
      training_id: 13,
      name: "test training name 4",
      muscleGroup: "test muscleGroup 4",
    },
    {
      training_id: 14,
      name: "test training name 5",
      muscleGroup: "test muscleGroup 5",
    },
  ]
};

const dataToDelete = {
  trainings: [
    10, 11, 12, 13, 14
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
    await server.stop();
  });

  const url = '/api/trainings';

  describe('GET /api/trainings', () => {

    beforeAll(async () => {
      await knex(tables.training).insert(data.trainings);
    });

    afterAll(async () => {
      await knex(tables.training).whereIn('training_id', dataToDelete.trainings).delete();
    });

    test('should return 200 and all trainingExcercises', async () => {

      const response = await request.get(url);
      expect(response.status).toBe(200);

      expect(response.body.count).toBeGreaterThanOrEqual(4);
      expect(response.body.trainings.length).toBeGreaterThanOrEqual(4);
    });
  });

  describe('GET /api/trainings/:training_id', () => {

    beforeAll(async () => {
      await knex(tables.training).insert(data.trainings[0]);
    });

    afterAll(async () => {
      await knex(tables.training).whereIn('training_id', data.trainings[0].training_id).delete();
    });

    test('should return 200 and the trainingExcercise with the given training_id', async () => {
      const response = await request.get(`${url}/${data.trainings[0].training_id}`);
      expect(response.status).toBe(200);
      expect(response.body).toEqual(data.trainings[0]);
    });
  });

  describe('POST /api/trainings', () => {

    const trainingstoDelete = [];

    afterAll(async () => {
      await knex(tables.training).whereIn('training_id', trainingstoDelete).delete();
    });

    test('should return 201 and the created trainingExcercise with the musle group: Back', async () => {
      const response = await request.post(url).send({
        name: "Cable rows",
        muscleGroup: "Back",
      });

      expect(response.status).toBe(201);
      expect(response.body.training_id).toBeTruthy();
      expect(response.body.name).toBe("Cable rows");
      expect(response.body.muscleGroup).toBe("Back");

      trainingstoDelete.push(response.body.training_id);
    });


    test('should return 201 and the created trainingExcercise with muscle group: Calves', async () => {
      const response = await request.post(url).send({
        name: "Calf raise",
        muscleGroup: "Calves",
      });
      expect(response.status).toBe(201);
      expect(response.body.training_id).toBeTruthy();
      expect(response.body.name).toBe("Calf raise");
      expect(response.body.muscleGroup).toBe("Calves");

      trainingstoDelete.push(response.body.training_id);
    });
  });

  describe('PUT /api/trainings/:training_id', () => {

    beforeAll(async () => {
      await knex(tables.training).insert(data.trainings);
    });

    afterAll(async () => {
      await knex(tables.training).whereIn('training_id', dataToDelete.trainings).delete();
    });

    test('should return 200 and the updated trainingExcercise with muscle group: Gastrocnemius', async () => {
      const response = await request.put(`${url}/${data.trainings[0].training_id}`).send({
        // name: "Calf Raise",
        muscleGroup: "Gastrocnemius",
      });
      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        training_id: data.trainings[0].training_id,
        // name: "Calf Raise",
        muscleGroup: "Gastrocnemius",
      });
    });
  });

  describe('DELETE /api/trainings/:training_id', () => {
    beforeAll(async () => {
      await knex(tables.training).insert(data.trainings[0]);
    });

    test('should return 204, delete the trainingExcercise with the given training_id and return nothing', async () => {
      const response = await request.delete(`${url}/${data.trainings[0].training_id}`);
      expect(response.status).toBe(204);
      expect(response.body).toEqual({});
    });
  });
});