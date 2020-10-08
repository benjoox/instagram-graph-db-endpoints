import { Injectable } from '@nestjs/common';
import {
    CypherStatement,
    InjectCypher,
    InjectPersistenceManager,
    PersistenceManager,
    QuerySpecification
} from '@liberation-data/drivine';

@Injectable()
export class PhotoRepository {
    constructor(
        @InjectPersistenceManager() readonly persistenceManager: PersistenceManager,
        @InjectCypher(__dirname, 'photoById') readonly photoById: CypherStatement,
        @InjectCypher(__dirname, 'photos') readonly photos: CypherStatement,
        @InjectCypher(__dirname, 'usersLikedPhotos') readonly usersLikedPhotos: CypherStatement
    ) {}

    async findPhotos(): Promise<any> {
        const spec = new QuerySpecification().withStatement(this.photos);
        return this.persistenceManager.query(spec);
    }

    async findByID(photoID: string): Promise<any> {
        const spec = new QuerySpecification().withStatement(this.photoById).bind({ photoID });
        return this.persistenceManager.query(spec);
    }

    async findUsersWhoLikedPhotos(photoID: string): Promise<any> {
        const spec = new QuerySpecification().withStatement(this.usersLikedPhotos).bind({ photoID });
        return this.persistenceManager.query(spec);
    }
}
