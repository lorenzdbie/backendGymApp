# Lorenz De Bie (702547ld)

- [x] Front-end Web Development:
  - [GitHub repository](https://github.com/Web-IV/2223-frontendweb-Lorenzdebie)
  - [Online versie](https://two223-frontendweb-lorenzdebie.onrender.com/)
- [x] Web Services: 
  - [GitHub repository](https://github.com/Web-IV/2223-webservices-Lorenzdebie)
  - [Online versie](https://two223-webservices-lorenzdebie.onrender.com)

**Logingegevens**

- Gebruikersnaam/e-mailadres: test@test.be
- Wachtwoord: Auth0Password

## Projectbeschrijving

Een applicatie om een afspraak te maken bij een Personal trainer waar bepaalde gebruikersgegevens voor nodig zijn, waar de verschillende excercises/trainings kunnen geraadpleegd en gekozen worden. Ook is er een calender waar all gemaakte en niet verlopen afspraken in komen.

- In het tabblad appointments kan je een afspraak maken, bewerken of verwijderen.
- In het tabblad overview kan je alle gemaakte en nog niet verlopen afspraken raadplegen.
- In het tabblad exercises kan je de trainingen bewerken, verwijderen of een nieuwe aanmaken.
- In het tabblad users kan je alle users bekijken die zich hebben geregistreerd hebben op de applicatie.
- In het tabblad register kan je gebruikersinformatie toevoegen of bewerken.
- Bij het registreren bij Auth0 (allereerste nieuwe login) wordt er automatische een script gerund die de nieuwe gebruiker de rol van user toekent. Dit gebeurd achter de schermen bij https://manage.auth0.com.
- Na het boeken van een afspraak wordt er automatisch een bevestigingsemail verstuurd.
- Indien een gebruiker al aangemeld is via auth0 maar nog geen extra gebruikers informatie heeft toegevoegd kan hij geen afspraken boeken en krijgt hij een kader te zien met een melding dat je extra gebruikersinformatie moet toevoegen. Klikken op dit kader stuurt je naar de register-tab.
- Na het toevoegen, aanpassen of verwijderen van een appointment, exercise en het toevoegen of aanpassen van user informatie krijgt de gebruiker een bevestiging te zien aan de hand van een banner(toast) in de linker onderhoek van het scherm.

<img width="1550" alt="Screenshot 2022-12-17 at 17 10 36" src="https://user-images.githubusercontent.com/83095711/208251062-97d5e1ab-99d8-4e33-aed1-a63790f2b579.png">

<img width="1380" alt="Screenshot 2022-12-18 at 10 27 22" src="https://user-images.githubusercontent.com/83095711/208290847-444b923d-4cd2-406f-8cea-5b3bfafc402e.png">

<img width="1020" alt="Screenshot 2022-12-21 at 17 40 14" src="https://user-images.githubusercontent.com/83095711/208958119-69bf862d-08cc-48b3-8661-579e7b27a0f4.png">

## Screenshots

<img width="1309" alt="Screenshot 2022-12-07 at 20 30 42" src="https://user-images.githubusercontent.com/83095711/206277663-05ba3ae1-b558-48e4-ba21-fb2847122231.png">
<img width="1320" alt="Screenshot 2022-12-07 at 20 30 06" src="https://user-images.githubusercontent.com/83095711/206277557-a77ca0ef-4573-442d-9c0e-6a593a33765e.png">
<img width="1311" alt="Screenshot 2022-12-07 at 20 32 03" src="https://user-images.githubusercontent.com/83095711/206277928-faef5047-08ed-4498-8bc5-269d0c245c6c.png">
<img width="1321" alt="Screenshot 2022-12-07 at 20 32 33" src="https://user-images.githubusercontent.com/83095711/206278029-b4a8a2c0-5204-40fa-9405-85ac78e3a1e6.png">
<img width="682" alt="Screenshot 2022-12-07 at 20 33 13" src="https://user-images.githubusercontent.com/83095711/206278144-47f45073-b39d-4b1c-91be-82a44fdcee19.png">
<img width="684" alt="Screenshot 2022-12-07 at 20 34 37" src="https://user-images.githubusercontent.com/83095711/206278391-60da3e1d-1106-455b-969c-945e51172a1b.png">
<img src=https://user-images.githubusercontent.com/83095711/208253194-21213a8e-7ada-48fb-b538-7e694725690d.png>




## Behaalde minimumvereisten

> Duid per vak aan welke minimumvereisten je denkt behaald te hebben

### Front-end Web Development

- **componenten**

  - [x] heeft meerdere componenten - dom & slim (naast login/register)
  - [x] definieert constanten (variabelen, functies en componenten) buiten de component
  - [x] minstens één form met validatie (naast login/register)
  - [x] login systeem (eigen of extern zoals bv. Auth0)
        <br />

- **routing**

  - [x] heeft minstens 2 pagina's (naast login/register)
  - [x] routes worden afgeschermd met authenticatie en autorisatie
        <br />

- **state-management**

  - [x] meerdere API calls (naast login/register)
  - [x] degelijke foutmeldingen indien API call faalt
  - [x] gebruikt useState enkel voor lokale state
  - [x] gebruikt Context, useReducer, Redux… voor globale state
        <br />

- **hooks**

  - [x] kent het verschil tussen de hooks (useCallback, useEffect…)
  - [x] gebruikt de hooks op de juiste manier
        <br />

- **varia**
  - [x] een aantal niet-triviale testen (unit en/of e2e en/of ui)
  - [x] minstens één extra technologie
  - [x] duidelijke en volledige README.md
  - [x] volledig en tijdig ingediend dossier

### Web Services

- **datalaag**

  - [x] voldoende complex (meer dan één tabel)
  - [x] één module beheert de connectie + connectie wordt gesloten bij sluiten server
  - [x] heeft migraties
  - [x] heeft seeds
        <br />

- **repositorylaag**

  - [x] definieert één repository per entiteit (niet voor tussentabellen) - indien van toepassing
  - [x] mapt OO-rijke data naar relationele tabellen en vice versa
        <br />

- **servicelaag met een zekere complexiteit**

  - [x] bevat alle domeinlogica
  - [x] bevat geen SQL-queries of databank-gerelateerde code
        <br />

- **REST-laag**

  - [x] meerdere routes met invoervalidatie
  - [x] degelijke foutboodschappen
  - [x] volgt de conventies van een RESTful API
  - [x] bevat geen domeinlogica
  - [x] degelijke authorisatie/authenticatie op alle routes
        <br />

- **varia**
  - [x] een aantal niet-triviale testen (min. 1 controller >=80% coverage)
  - [x] minstens één extra technologie
  - [x] duidelijke en volledige `README.md`
  - [x] maakt gebruik van de laatste ES6-features (object destructuring, spread operator...)
  - [x] volledig en tijdig ingediend dossier

## Projectstructuur

### Front-end Web Development

De mappen in src staan gestructureerd volgens functie, api voor alle api-Calls voor de verschillende soorten components, in components staan alle verschillende component files, in de map context staan de context gevoellige files. In de map public staan alle images.

### Web Services

Elke laag(repository, service, rest, core, data...) hebben elk hun eigen map binnen de src map met overzichtelijke naamduiding.

## Extra technologie

### Front-end Web Development

Big Calendar React: https://www.npmjs.com/package/react-big-calendar
Dit geeft alle gemaakte afspraken van alle gebruikers terug in calender vorm (Overview-tab)

React toastify https://www.npmjs.com/package/react-toastify
dit laat banners(toasts) verschijnen op het scherm bij het aanmaken, aanpassen of verwijderen van appointments, exercises en users.

### Web Services

Nodemailer: https://www.npmjs.com/package/nodemailer
Na het maken van een appointment stuurt de server automatisch een email met de gegevens van de gemaakte afspraak. Doordat connectie met gmail sinds kort Oauth2 verificatie nodig heeft heb ik ervoor gekozen op alle emails op te vangen met mailtrap.

login gegevens voor mailtrap.io:
- email: lorenz.debie@student.hogent.be
- password: FitnessAppTestMail



## Testresultaten

### Front-end Web Development

Verschillende testen om connectie, appointment, exercise, addAppointment en  addExercise te testen.

### Web Services

Alle routes voor users en trainings werden gestest met bijna perfecte coverage: getAll, getById, add, update en delete.
Voor appointments werden de routes voor getAll, getById en delete getest.
De testen voor users en trainings werden samen uitgevoerd, de testen voor appointments word apart uitgevoerd wegens user insert conflicten.



Users:
- GET 'api/users' : geeft alle users terug.
- GET 'api/users/check' : geeft een user terug met een specifiek Auth0id.
- GET 'api/users/:id' : geeft de user terug met het specifieke id.
- POST 'api/users/register' : registreert een nieuwe user.
- PUT 'api/users/:id' : update de gegevens van een bestaande user.
- DELETE 'api/users/:id' : verwijdert een user met het specifieke id.

Trainings:
- GET 'api/trainings' : geeft alle trainings terug.
- GET 'api/trainings/:id' : geeft de training terug met het specifieke id.
- POST 'api/trainings' : registreert een nieuwe training.
- PUT 'api/trainings/:id' : update de gegevens van een bestaande training.
- DELETE 'api/trainings/:id' : verwijdert een training met het specifieke id.

<img src=https://user-images.githubusercontent.com/83095711/208248021-468e634b-2267-4e83-a5ef-282325d0e3e2.png>

Appointments:
- GET 'api/appointments' : geeft alle afspraken terug.
- GET 'api/appointments/:id' : geeft de afspraak terug met het specifieke id.
- DELETE 'api/appointments/:id' : verwijdert een afspraak met het specifieke id.

<img src=https://user-images.githubusercontent.com/83095711/208247997-7a3bb46a-5fb5-4b0f-b2ef-ca19657b5cc5.png>

Er werden geen testen geschreven om errors/exceptions te triggeren.


## Gekende bugs

### Front-end Web Development

- een Bug in de package Big-Calendar-React. Dit is aan de zijde van npm.
- Tijdens de eerste deployment vond render.com de appointment files niet(src/components/appointments). Ik heb deze allemaal herschreven ondert de map afspraken(src/components/afspraken), maar ik heb de originele bestanden laten staan. 

### Web Services

Testen dienen in comentaar gezet te worden om afzonderlijk te runnen (users & trainings samen, appointments apart). POST en PUT testen van Appointments komen niet uit waardoor deze in commentaar moeten blijven staan.
