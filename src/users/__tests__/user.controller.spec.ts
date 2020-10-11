import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { HttpStatus, INestApplication } from '@nestjs/common';
import { AppModule } from '@/AppModule';
import { configureApp } from '@/main';

describe('UserController (e2e)', () => {
    let app: INestApplication;
    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule]
        }).compile();

        app = moduleFixture.createNestApplication();
        await configureApp(app);
        await app.init();
    });

    afterAll(async () => {
        await app.close();
    });

    describe('GET /users', () => {
        it('should list all the users ', async () => {
            const response = await request(app.getHttpServer())
                .get('/users')
                .expect(HttpStatus.OK);

            expect(response.body).toHaveLength(15);
        });

        it('?username=<username> should return an empty array for non existing users', async () => {
            const response = await request(app.getHttpServer())
                .get('/users?username=sdfsdfdf')
                .expect(HttpStatus.OK);
            expect(response.body).toHaveLength(0);
        });

        it('?id=<userID> should return the user profile for an existing user', async () => {
            const res = await request(app.getHttpServer())
                .get('/users?id=7363569393')
                .expect(HttpStatus.OK);

            expect(res.body).toHaveLength(1);
            expect(res.body[0]).toStrictEqual({
                is_private: false,
                is_business_account: false,
                follow_count: 117,
                connected_fb_page: '',
                business_email: '',
                followed_by_count: 1256,
                blocked_by_viewer: false,
                id: 7363569393,
                is_verified: false,
                username: 'matinjanzeyni'
            });
        });

        it('should return a 400 error', async done => {
            await request(app.getHttpServer())
                .get('/usersdd')
                .expect(HttpStatus.BAD_REQUEST);

            done();
        });
    });
});
