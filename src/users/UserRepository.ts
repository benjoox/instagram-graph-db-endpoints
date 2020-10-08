import { Injectable } from '@nestjs/common';
import {
    CypherStatement,
    InjectCypher,
    InjectPersistenceManager,
    PersistenceManager,
    QuerySpecification
} from '@liberation-data/drivine';

@Injectable()
export class UserRepository {
    constructor(
        @InjectPersistenceManager() readonly persistenceManager: PersistenceManager,
        @InjectCypher(__dirname, 'profileByUsername') readonly profileByUsername: CypherStatement,
        @InjectCypher(__dirname, 'profileById') readonly profileById: CypherStatement,
        @InjectCypher(__dirname, 'profiles') readonly profiles: CypherStatement,
        @InjectCypher(__dirname, 'photosLikeByUser') readonly photosLikeByUser: CypherStatement
    ) {}

    async findUsers(): Promise<any> {
        const spec = new QuerySpecification().withStatement(this.profiles);
        return this.persistenceManager.query(spec);
    }

    async findByUsername(username: string): Promise<any> {
        const spec = new QuerySpecification().withStatement(this.profileByUsername).bind({ username });
        return this.persistenceManager.query(spec);
    }

    async findByID(userID: string): Promise<any> {
        const spec = new QuerySpecification().withStatement(this.profileById).bind({ userID: Number(userID) });
        return this.persistenceManager.query(spec);
    }

    async findPhotosLikedByUser(username: string): Promise<any> {
        const spec = new QuerySpecification().withStatement(this.photosLikeByUser).bind({ username });
        return this.persistenceManager.query(spec);
    }
}
