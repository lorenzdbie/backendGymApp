# Examenopdracht Web Services


- Student: Lorenz De Bie
- Studentennummer: 702547ld
- E-mailadres: lorenz.debie@student.hogent.be

## Vereisten

Ik verwacht dat volgende software reeds geïnstalleerd is:

- [NodeJS](https://nodejs.org)
- [Yarn](https://yarnpkg.com)
- [MySQL Community Server](https://dev.mysql.com/downloads/mysql/)

> Vul eventueel aan

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
 

> Schrijf hier hoe we de applicatie starten (.env bestanden aanmaken, commando's om uit te voeren...)


## Testen

> Schrijf hier hoe we de testen uitvoeren (.env bestanden aanmaken, commando's om uit te voeren...)
