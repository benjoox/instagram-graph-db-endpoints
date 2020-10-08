import { Controller, Get, Query } from '@nestjs/common';
import { PhotoRepository } from '@/photos/PhotoRepository';

type Query = {
    id?: string;
    photoname?: string;
};

@Controller('/photos')
export class PhotoController {
    constructor(readonly PhotoRepository: PhotoRepository) {}

    @Get()
    async findByFilter(@Query() query: Query): Promise<any[]> {
        const { id = null, photoname = null } = query;
        if (id) {
            return this.PhotoRepository.findByID(id);
        } else {
            return this.PhotoRepository.findPhotos();
        }
    }
}
