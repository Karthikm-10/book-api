const request = require('supertest');
const app = require('../server');
const mongoose = require('mongoose');
const Book = require('../models/bookModel');

describe('Books API', () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  test('GET /books should return all books', async () => {
    const response = await request(app).get('/books');
    expect(response.statusCode).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });

  test('POST /books should create a new book', async () => {
    const newBook = {
      title: 'Test Book',
      author: 'Test Author',
      publishedDate: '2023-01-01',
      genre: 'Test Genre'
    }
    const response = await request(app).post('/books').send(newBook);
    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('_id');
  });

  test('GET /books/:id should return a book', async () => {
    const book = await Book.create({ title: 'Sample', author: 'Author', publishedDate: '2023-01-01', genre: 'Fiction' });
    const response = await request(app).get(`/books/${book._id}`);
    expect(response.statusCode).toBe(200);
    expect(response.body.title).toBe('Sample');
  });
});
