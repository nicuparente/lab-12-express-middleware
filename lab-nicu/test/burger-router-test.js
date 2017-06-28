'use strict';

require('dotenv').config({ path: `${process.cwd()}/.test.env` });
const superagent = require('superagent');
const expect = require('expect');
const server = require('../lib/server.js');
let tempBurger;

const API_URL = `http://localhost:${process.env.PORT}`;

describe('testing /api/burgers', () => {
  before(server.start);
  after(server.stop);

  describe('testing POST /api/burgers', () => {
    it('should return a 200 and a body', () => {
      return superagent.post(`${API_URL}/api/burgers`)
        .send({ name: 'Dope Burger', location: 'Seattle', stars: 4 })
        .then(res => {
          expect(res.status).toEqual(200);
          expect(res.body._id).toExist();
          expect(res.body.name).toEqual('Dope Burger');
          tempBurger = res.body;
        });
    });

    it('should return a 400', () => {
      return superagent.post(`${API_URL}/api/burgers`)
        .send()
        .catch(res => {
          expect(res.status).toEqual(400);
        });
    });
    it('should return a 409', () => {
      return superagent.post(`${API_URL}/api/burgers`)
        .send({ name: 'Dope Burger', location: 'Tukwila', stars: 2 })
        .catch(res => {
          expect(res.status).toEqual(409);
        });
    });
  });

  describe('testing GET /api/burgers', () => {
    it('should return 200 with a body', () => {
      return superagent.get(`${API_URL}/api/burgers/${tempBurger._id}`)
        .then(res => {
          expect(res.status).toEqual(200);
          expect(res.body.name).toEqual(tempBurger.name);
        });
    });
    it('invalid id being passed, should return 404 ', () => {
      return superagent.get(`${API_URL}/api/burgers/1234`)
        .catch(res => {
          expect(res.status).toEqual(404);
        });
    });
  });

  describe('testing PUT /api/burgers', () => {
    it('should return 200 with a body', () => {
      return superagent.put(`${API_URL}/api/burgers/${tempBurger._id}`)
        .send({ location: 'Tacoma' })
        .then(res => {
          expect(res.status).toEqual(200);
          expect(res.body.name).toEqual(tempBurger.name);
          expect(res.body.location).toEqual('Tacoma');
        });
    });
    it('should return 400 due to invalid body', () => {
      return superagent.put(`${API_URL}/api/burgers/${tempBurger._id}`)
        .send({})
        .catch(res => {
          console.log(res.status);
          expect(res.status).toEqual(404);
        });
    });
    it('should return 404 due to invalid id', () => {
      return superagent.put(`${API_URL}/api/burgers/xoiasjdiasoim2o3iepo12ke`)
        .send({ location: 'Tacoma' })
        .catch(res => {
          console.log(res.status);
          expect(res.status).toEqual(404);
        });
    });
  });

  describe('testing DELETE /api/burgers', () => {
    it('should return 204 with a body', () => {
      return superagent.delete(`${API_URL}/api/burgers/${tempBurger._id}`)
        .then(res => {
          expect(res.status).toEqual(204);
        });
    });
    it('should return 404 due to invalid id', () => {
      return superagent.delete(`${API_URL}/api/burgers/213123ASDA1`)
        .catch(res => {
          expect(res.status).toEqual(404);
        });
    });
  });
  describe('testing invalid path /api/burgerssss', () => {
    it('should return a 404', () => {
      it('invalid id being passed, should return 404 ', () => {
        return superagent.get(`${API_URL}/api/burgerssss`)
          .catch(res => {
            expect(res.status).toEqual(404);
          });
      });
    });
  });
});