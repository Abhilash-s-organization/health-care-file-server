const request = require('supertest');
const fs = require('fs');
const path = require('path');
const app = require('./files_server'); 

const testFilePath = path.join(__dirname, 'testfile.txt');

// Make sure a dummy file exists for testing
beforeAll(() => {
  if (!fs.existsSync(testFilePath)) {
    fs.writeFileSync(testFilePath, 'Hello Test');
  }
});

describe('POST /api/upload', () => {
  it('should upload a single file successfully', async () => {
    const res = await request(app)
      .post('/api/upload')
      .attach('file', testFilePath);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body[0]).toHaveProperty('originalname', 'testfile.txt');
  });

  it('should upload multiple files successfully', async () => {
    const res = await request(app)
      .post('/api/upload')
      .attach('file', testFilePath)
      .attach('file', testFilePath);

    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBeGreaterThanOrEqual(2);
  });

  it('should return 400 if no file is uploaded', async () => {
    const res = await request(app)
      .post('/api/upload');

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('error', 'No files were uploaded');
  });

  it('should not accept more than 12 files', async () => {
    const req = request(app).post('/api/upload');
    for (let i = 0; i < 13; i++) {
      req.attach('file', testFilePath);
    }

    const res = await req;
    expect(res.statusCode).toBe(500);
  });
});
