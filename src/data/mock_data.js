let TRAININGS = [{
    id: 1,
    muscleGroup: 'chest',
  }, {
    id: 2,
    muscleGroup: 'legs',
  },
  {
    id: 3,
    muscleGroup: 'back',
  }
]

let APPOINTMENTS = [{
    id: 1,
    date: '2022-10-07T00:00:00.000Z',
    user: {
      id: 2,
      name: 'Lorenz De Bie'
    },
    training: {
      id: 1,
      muscleGroup: "chest",
    },
    appointmentDetails: {
      id: 1,
      appointmentDate: "2022-10-16T16:00:00.000Z",
      startTime: "2022-10-16T16:00:00.000Z",
      endTime: "2022-10-16T18:00:00.000Z",
    },
    intensity: 3,
  },
  {
    id: 2,
    date: '2022-10-06T00:00:00.000Z',
    user: {
      id: 3,
      name: 'Grietje'
    },
    training: {
      id: 2,
      muscleGroup: "legs",
    },
    appointmentDetails: {
      id: 2,
      appointmetDate: "2022-10-18T08:00:00.000Z",
      startTime: "2022-10-18T08:00:00.000Z",
      endTime: "2022-10-18T10:00:00.000Z",
    },
    intensity: 4,
  },
  {
    id: 3,
    date: '2022-10-05T00:00:00.000Z',
    user: {
      id: 1,
      name: 'Galdino'
    },
    training: {
      id: 3,
      muscleGroup: "back",
    },
    appointmentDetails: {
      id: 3,
      appointmentDate: "2022-10-12T10:00:00.000Z",
      startTime: "2022-10-12T10:00:00.000Z",
      endTime: "2022-10-12T14:00:00.000Z",
    },
    intensity: 5,
  },
  
]

module.exports = {
  APPOINTMENTS,
  TRAININGS
}