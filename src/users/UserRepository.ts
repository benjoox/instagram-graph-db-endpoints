import { Injectable } from '@nestjs/common';
import {
    CypherStatement,
    InjectCypher,
    InjectPersistenceManager,
    PersistenceManager,
    QuerySpecification
} from '@liberation-data/drivine';

export interface IUser {
    blocked_by_viewer?: boolean;
    business_email?: string;
    followed_by_count?: number;
    follow_count?: number;
    is_business_account?: boolean;
    id: string;
    is_private?: boolean;
    connected_fb_page: null;
    is_verified: false;
}

@Injectable()
export class UserRepository {
    constructor(
        @InjectPersistenceManager() readonly persistenceManager: PersistenceManager,
        @InjectCypher(__dirname, 'profileByUsername') readonly profileByUsername: CypherStatement,
        @InjectCypher(__dirname, 'profileById') readonly profileById: CypherStatement,
        @InjectCypher(__dirname, 'profiles') readonly profiles: CypherStatement,
        @InjectCypher(__dirname, 'photosLikeByUser') readonly photosLikeByUser: CypherStatement,
        @InjectCypher(__dirname, 'updateProfile') readonly updateProfile: CypherStatement,
        @InjectCypher(__dirname, 'deleteProfile') readonly deleteProfile: CypherStatement
    ) {}

    async findUsers(): Promise<any> {
        const spec = new QuerySpecification().withStatement(this.profiles);
        return this.persistenceManager.query(spec);
    }

    async findByUsername(username: string): Promise<any> {
        const spec = new QuerySpecification().withStatement(this.profileByUsername).bind({ username });
        return this.persistenceManager.maybeGetOne(spec);
    }

    async findByID(userID: string): Promise<any> {
        const spec = new QuerySpecification().withStatement(this.profileById).bind({ userID: Number(userID) });
        return this.persistenceManager.query(spec);
    }

    async findPhotosLikedByUser(username: string): Promise<any> {
        const spec = new QuerySpecification().withStatement(this.photosLikeByUser).bind({ username });
        return this.persistenceManager.query(spec);
    }

    async update(username: string, user: IUser): Promise<any> {
        const originalUser = await this.findByUsername(username);
        if (!originalUser) throw Error(`The user '${username}' does not exists`);
        const updatedUser = { ...originalUser, ...user };
        const spec = new QuerySpecification().withStatement(this.updateProfile).bind(updatedUser);
        return this.persistenceManager.query(spec);
    }

    async remove(username: string): Promise<any> {
        const spec = new QuerySpecification().withStatement(this.deleteProfile).bind({ username });
        return this.persistenceManager.query(spec);
    }
}
