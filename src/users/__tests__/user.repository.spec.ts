import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '@/AppModule';
import { RunWithDrivine } from '@liberation-data/drivine/utils/TestUtils';
import { UserRepository } from '@/users/UserRepository';

RunWithDrivine({ rollback: true });
describe('UserRepository', () => {
    let repo: UserRepository;
    beforeAll(async () => {
        const app: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
            providers: [UserRepository],
            controllers: []
        }).compile();
        repo = app.get(UserRepository);
    });

    it('should list all of the users', async () => {
        expect.assertions(1);
        const results = await repo.find();
        expect(results.length).toBe(15);
    });

    it('should return the user for a given userID', async () => {
        expect.assertions(2);
        const results = await repo.findByID('822819803');
        expect(results).toHaveLength(1);
        expect(results[0]).toStrictEqual({
            is_private: true,
            is_business_account: false,
            follow_count: 207,
            connected_fb_page: '',
            business_email: '',
            followed_by_count: 972,
            blocked_by_viewer: false,
            id: 822819803,
            is_verified: false,
            username: 'amineayat'
        });
    });

    it('should return empty for a non exisiting given userID', async () => {
        expect.assertions(1);
        const results = await repo.findByID('73635693938');
        expect(results).toHaveLength(0);
    });

    it('should return the user for a given username', async () => {
        expect.assertions(2);
        const results = await repo.findByUsername('amineayat');
        expect(results).toHaveLength(1);
        expect(results[0]).toStrictEqual({
            is_private: true,
            is_business_account: false,
            follow_count: 207,
            connected_fb_page: '',
            business_email: '',
            followed_by_count: 972,
            blocked_by_viewer: false,
            id: 822819803,
            is_verified: false,
            username: 'amineayat'
        });
    });

    it('should return empty for non exisiting given username', async () => {
        expect.assertions(1);
        const results = await repo.findPhotosLikedByUser('nonexistingusername');
        expect(results).toHaveLength(0);
    });
});
