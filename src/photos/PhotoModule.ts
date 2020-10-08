import { Module } from '@nestjs/common';
import { PhotoRepository } from './PhotoRepository';
import { PhotoController } from './PhotoController';

@Module({
    imports: [],
    providers: [PhotoRepository],
    controllers: [PhotoController],
    exports: []
})
export class PhotoModule {}
