import { Controller, Get, Param, Query } from '@nestjs/common';
import { UserRepository } from '@/users/UserRepository';

type Query = {
    id?: string;
    username?: string;
};

@Controller('/users')
export class UserController {
    constructor(readonly UserRepository: UserRepository) {}

    @Get()
    async findByFilter(@Query() query: Query): Promise<any[]> {
        const { id = null, username = null } = query;
        if (id) {
            return this.UserRepository.findByID(id);
        }
        if (username) {
            return this.UserRepository.findByUsername(username);
        } else {
            return this.UserRepository.findUsers();
        }
    }
}
