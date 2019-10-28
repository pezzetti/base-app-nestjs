import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('UserController (e2e)', () => {
  let app;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });
  afterEach(() => app.close());

  describe('GetById', () => {
    const id = '6c946852-d655-475e-8a7a-608a0077255a';
    it('/ (GET)', () => {
        return request(app.getHttpServer())
        .get(`/users/${id}`)
        .expect(404);
      });

  });

});
