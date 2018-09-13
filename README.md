# Sample task

## Project overview

- node backend
- mongo database
- angular5 frontend app

## What you need

- node v10.10.0
- npm v6.4.1
- mongoDb v3.4.9

> these are the versions used in development, i guess it would work with others

## Run

> you need 2-3 terminal windows

### database

- if you have it installed on the machine

```bash
mongod
```

- else (Docker etc.), well you know what to do

### backend

```bash
cd backend && npm install
npm run populate-db # inserts mock data to db
npm start # runs the server on $PORT || 8080
```

### frontend app

```bash
cd frontend && npm install
ng serve -o  # runs angular dev server,
# opens browser on http://localhost:4200
```

## You can

- login using john@company.com:1234 credentials
- view pending proposals table
- cancel a proposal (each entry has a 'Cancel Proposal' button)
- view canceled proposals (navigate through tabs)

> - because of the mentioned issue in the [task](https://app.asana.com/0/343895016529577/811554008411466/f) thread, I used the 'Functional brief', db and interface designs as functionality guide
> - some fonts are not matching, because I don't own them :)
