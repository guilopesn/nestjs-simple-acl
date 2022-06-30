import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { TestModule } from './test.module';

describe('TestController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [TestModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('Should authorize access with valid authorization', () => {
    return request(app.getHttpServer())
      .get('/test')
      .set('Authorization', 'TEST_GET')
      .expect(200)
      .expect('Ok');
  });

  it('Should not authorize access with invalid authorization', () => {
    return request(app.getHttpServer())
      .get('/test')
      .set('Authorization', 'TEST_POST')
      .expect(403);
  });

  it('Should not authorize access without authorization', () => {
    return request(app.getHttpServer()).get('/test').expect(403);
  });
});
