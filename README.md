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
 
 Maak een .env bestand aan met volgende gegevens:
 - NODE_ENV="development"
 - AUTH_JWKS_URI="https://lorenz-debie-hogent.eu.auth0.com/.well-known/jwks.json"
 - AUTH_AUDIENCE="https://fitness-app-lorenz-hogent.be"
 - AUTH_ISSUER="https://lorenz-debie-hogent.eu.auth0.com/"
 - AUTH_USER_INFO="https://lorenz-debie-hogent.eu.auth0.com/userinfo"

 Pas daarna ook het bestand config/development.js aan naar uw locale database:

 <code>
 database: {
    client: 'mysql2',
    host: 'localhost',
    port: 3306,
    name: 'fitnessapp',
    username: 'root',
    password: 'root-root',
  },
 </code>
  
  
  
  Start daarna de applicatie op met <code>yarn start</code>
  
  Om de applicatie in productie te draaien gebruike volgende commando: <code>yarn start:prod</code>.
  Hier wordt de vichogent.be database gebruikt.
 


## Testen

Maak een .env.test bestand aan met volgende gegevens:
 - NODE_ENV=test
 - DATABASE_USERNAME="root"
 - DATABASE_PASSWORD="root-root"
 - AUTH_TEST_USER_USER_ID="auth0|638f08cd7d15baded5cce364"
 - AUTH_TEST_USER_USERNAME="e2e-testing@fitnessapp.be"
 - AUTH_TEST_USER_PASSWORD="e2eTeste2e"
 - AUTH_TOKEN_URL="https://lorenz-debie-hogent.eu.auth0.com/oauth/token"
 - AUTH_CLIENT_ID="butPgWOoPmOjlkIkbdHA2uC7KRBPXpRX"
 - AUTH_CLIENT_SECRET="IgYD3ZQPJW63zDaeLIH3DfQ1_x3a8xx3h3DSm_6gEKQJBAcV1XROrqpfnhDEf3Wl"
 - AUTH_JWKS_URI="https://lorenz-debie-hogent.eu.auth0.com/.well-known/jwks.json"
 - AUTH_AUDIENCE="https://fitness-app-lorenz-hogent.be"
 - AUTH_ISSUER="https://lorenz-debie-hogent.eu.auth0.com/"
 - AUTH_USER_INFO="https://lorenz-debie-hogent.eu.auth0.com/userinfo"

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
 
Run de testen met <code>yarn test</code>, om te testen met coverage gebruik: <code>yarn test:coverage</code>

