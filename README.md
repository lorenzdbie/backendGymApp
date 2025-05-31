# Examenopdracht Web Services


- Student: Lorenz De Bie
- Studentennummer: 702547ld
- E-mailadres: lorenz.debie@student.hogent.be

## Vereisten

Ik verwacht dat volgende software reeds geïnstalleerd is:

- [NodeJS](https://nodejs.org)
- [Yarn](https://yarnpkg.com)
- [MySQL Community Server](https://dev.mysql.com/downloads/mysql/)


## Opstarten

 Eerst, installeer de dependencies met <code>yarn install</code>.
 

  
  Start daarna de applicatie op met <code>yarn start</code>
  
  Om de applicatie in productie te draaien gebruike volgende commando: <code>yarn start:prod</code>.
  Hier wordt de vichogent.be database gebruikt.
 



 Pas daarna ook het bestand config/test.js aan naar uw locale database:

 <code>
 database: {
    client: 'mysql2',
    host: 'localhost',
    port: 3306,
    name: 'fitnessapp_test',
    username: 'root',
    password: 'root-root',
  },
 </code>
 <br>
 <br>
 
Run de testen met <code>yarn test</code>, om te testen met coverage gebruik: <code>yarn test:coverage</code>

