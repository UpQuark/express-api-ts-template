import request from 'supertest';
import express from 'express';
import router from './risk';

const app = express();
app.use(express.json());
app.use('/risk', router);

/**
 * Integration tests for the POST /risk endpoint
 *
 * These test cases codify the validation requirements for the POST /risk endpoint per the assignment,
 * plus a couple of additional cases we can imagine cropping up in a real life version of this project.
 * Per being integration tests, they simulate actual API requests, and the API would hit an actual datastore.
 */
describe('POST /risk', () => {
  it('responds positively when request body is valid', async () => {
    const requestBody = {
      commuterId: 'COM-111',
      actions: [
        {
          timestamp: '2022-01-01 10:05:11',
          action: 'took an elevator',
          unit: 'floor',
          quantity: 30,
        },
        {
          timestamp: '2022-01-01 10:05:11',
          action: 'suction-cup climbed a skyscraper',
          unit: 'floor',
          quantity: 10,
        },
      ],
    };

    const response = await request(app).post('/risk').send(requestBody);

    expect(response.status).toBe(200);
    expect(response.body).not.toBeNull();
  });

  it('"bad requests" when the request has invalid units', async () => {
    const requestBody = {
      commuterId: 'COM-111',
      actions: [
        {
          timestamp: '2022-01-01 10:05:11',
          action: 'took an elevator',
          unit: 'loaves',
          quantity: 30,
        },
      ],
    };

    const response = await request(app).post('/risk').send(requestBody);

    expect(response.status).toBe(400);
  });

  it('"bad requests" when request body is missing fields', async () => {
    const requestBody = {
      commuterId: 'COM-111',
      actions: [
        {
          timestamp: '2022-01-01 10:05:11',
          action: 'took an elevator',
        },
        {
          timestamp: '2022-01-01 10:05:11',
          action: 'took an elevator',
          unit: 'floors',
          quantity: 30,
        },
      ],
    };

    const response = await request(app).post('/risk').send(requestBody);

    expect(response.status).toBe(400);
  });

  it('"bad requests" when request includes timestamps from multiple days', async () => {
    const requestBody = {
      commuterId: 'COM-111',
      actions: [
        {
          timestamp: '2022-01-01 10:05:11',
          action: 'took an elevator',
          unit: 'floor',
          quantity: 30,
        },
        {
          timestamp: '2022-01-02 10:05:11',
          action: 'suction-cup climbed a skyscraper',
          unit: 'floor',
          quantity: 10,
        },
      ],
    };

    const response = await request(app).post('/risk').send(requestBody);

    expect(response.status).toBe(400);
  });

  // We assume here that micromorts per action-quantity may change with time with new micromort data,
  // so we assume we'd implement a static "health-check" (lol) micromort action to test against for integration tests.
  it('"accurately returns the micromorts for our test activity for the commuter queried', async () => {
    const requestBody = {
      commuterId: 'COM-111',
      actions: [
        {
          timestamp: '2022-01-01 10:05:11',
          action: 'testing an interview takehome',
          unit: 'floor',
          quantity: 10,
        },
        {
          timestamp: '2022-01-01 10:05:11',
          action: 'testing an interview takehome',
          unit: 'floor',
          quantity: 20,
        },
      ],
    };

    const response = await request(app).post('/risk').send(requestBody);

    expect(response.status).toBe(200)
    expect(response.body.micromorts).toBe(30);
    expect(response.body.commuterId).toBe('COM-111');
  });
});