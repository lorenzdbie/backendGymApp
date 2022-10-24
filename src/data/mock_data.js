let TRAININGS = [{
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
];

let APPOINTMENTS = [{
    id: 1,
    date: '2022-10-07T00:00:00.000Z',
    user: {
      id: 2,
      name: 'Lorenz De Bie',
      birthdate: "1988-12-12T00:00:00.000Z",
      email: 'lorenz.debie@hotmail.com',
      password: '12345',
      weight: '83,0kg',
      height: '1,87m',
      credits: '5',
      role: 'user',
    },
    training: {
      id: 1,
      muscleGroup: "chest",
    },
    startTime: "2022-10-16T16:00:00.000Z",
    endTime: "2022-10-16T18:00:00.000Z",
    intensity: 3,
    specialRequests: ''
  },
  {
    id: 2,
    date: '2022-10-06T00:00:00.000Z',
    user: {
      id: 3,
      name: 'Grietje',
      birthdate: "1978-04-17T00:00:00.000Z",
      email: 'grietje@gmail.com',
      password: '%ByI&1',
      weight: '83,0kg',
      height: '1,87m',
      credits: '5',
      rol: 'user',
    },
    training: {
      id: 2,
      muscleGroup: "legs",
    },
    startTime: "2022-10-18T08:00:00.000Z",
    endTime: "2022-10-18T10:00:00.000Z",
    intensity: 4,
    specialRequests: ''
  },
  {
    id: 3,
    date: '2022-10-05T00:00:00.000Z',
    user: {
      id: 1,
      name: 'Galdino',
      birthdate: "1996-09-06T00:00:00.000Z",
      email: 'dino@hotmail.com',
      password: 'a123b',
      weight: '83,0kg',
      height: '1,87m',
      credits: '10',
      rol: 'admin',
    },
    training: {
      id: 3,
      muscleGroup: "back",
    },
    startTime: "2022-10-12T10:00:00.000Z",
    endTime: "2022-10-12T14:00:00.000Z",

    intensity: 5,
    specialRequests: ''
  },

]

module.exports = {
  APPOINTMENTS,
  TRAININGS
}