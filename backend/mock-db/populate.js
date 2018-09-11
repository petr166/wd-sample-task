/**
 * Database population with mock data
 * Takes values from .json and inserts into the db
 */

const Promise = require('bluebird');
const config = require('../config');
const connectMongo = require('../config/mongo').start;
const User = require('../models/user');
const Company = require('../models/company');
const BoatSubtype = require('../models/boat_subtype');
const Boat = require('../models/boat');
const Service = require('../models/service');
const Job = require('../models/job');
const Proposal = require('../models/proposal');
const mockData = require('./mockData.json');

// save these values to be used down the promise chain
let jobPosterUserId;
let companyId;
let boatTypeIds;
let serviceIds;

connectMongo(config.mongo)
  .then((connection) => {
    console.log('dropping the database..');
    return connection.db.dropDatabase();
  })
  .then(() => {
    console.log('creating boat subtypes..');
    return Promise.map(mockData.boat_subtypes, (boatSubtypeObj) => {
      const newBoatSubtype = new BoatSubtype(boatSubtypeObj);
      return newBoatSubtype.save();
    }).then((boatSubtypes) => {
      boatTypeIds = boatSubtypes.map(subtype => subtype.get('id'));
    });
  })
  .then(() => {
    console.log('creating services..');
    return Promise.map(mockData.services, (serviceObj) => {
      const newService = new Service(serviceObj);
      return newService.save();
    }).then((services) => {
      serviceIds = services.map(service => service.get('id'));
    });
  })
  .then(() => {
    console.log('creating users..');
    return Promise.map(mockData.users, (userObj) => {
      const newUser = new User(userObj);
      return newUser.save();
    }).then((users) => {
      jobPosterUserId = users[1].get('id');
      return users;
    });
  })
  .then((users) => {
    console.log('creating companies..');
    return Promise.map(mockData.companies, (companyObj, i) => {
      companyObj.user_id = users[i].get('id');
      const newCompany = new Company(companyObj);
      return newCompany.save();
    }).then((companies) => {
      companyId = companies[0].get('id');
      return companies;
    });
  })
  .then(() => {
    console.log('creating boats..');
    return Promise.map(mockData.boats, (boatObj, i) => {
      boatObj.user_id = jobPosterUserId;
      boatObj.boat_subtype_id = boatTypeIds[i];
      const newBoat = new Boat(boatObj);
      return newBoat.save();
    });
  })
  .then((boats) => {
    console.log('creating jobs..');
    return Promise.map(mockData.jobs, (jobObj, i) => {
      jobObj.user_id = jobPosterUserId;
      jobObj.boat_id = boats[i].get('id');
      jobObj.service_id = serviceIds[i];
      const newJob = new Job(jobObj);
      return newJob.save();
    });
  })
  .then((jobs) => {
    console.log('creating proposals..');
    return Promise.map(mockData.proposals, (proposalObj, i) => {
      proposalObj.company_id = companyId;
      proposalObj.job_id = jobs[i].get('id');
      const newProposal = new Proposal(proposalObj);
      return newProposal.save();
    });
  })
  .then(() => {
    console.log('db populate success!');
    process.exit();
  });
