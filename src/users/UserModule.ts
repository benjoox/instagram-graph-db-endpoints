import { Module } from '@nestjs/common';
import { UserRepository } from './UserRepository';
import { UserController } from './UserController';

@Module({
    imports: [],
    providers: [UserRepository],
    controllers: [UserController],
    exports: []
})
export class UserModule {}
