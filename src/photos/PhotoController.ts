import { Controller, Get, Query, Param } from '@nestjs/common';
import { PhotoRepository } from '@/photos/PhotoRepository';

type Query = {
    id?: string;
    photoname?: string;
};

@Controller('/photos')
export class PhotoController {
    constructor(readonly PhotoRepository: PhotoRepository) {}

    @Get(':photoID/user-liked')
    async findLikedPhotos(@Param('photoID') photoID: string): Promise<any[]> {
        return this.PhotoRepository.findUsersWhoLikedPhotos(photoID);
    }

    @Get()
    async findByFilter(@Query() query: Query): Promise<any[]> {
        const { id = null } = query;
        if (id) {
            return this.PhotoRepository.findByID(id);
        } else {
            return this.PhotoRepository.findPhotos();
        }
    }
}
