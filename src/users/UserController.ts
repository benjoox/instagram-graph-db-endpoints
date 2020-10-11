import { Controller, Query, Body, Param, Put, Get, Delete, HttpException, HttpStatus } from '@nestjs/common';
import { UserRepository, IUser } from '@/users/UserRepository';

type Query = {
    id?: string;
    username?: string;
};

@Controller('/users')
export class UserController {
    constructor(readonly UserRepository: UserRepository) {}

    @Get(':username/liked-photos')
    async findLikedPhotos(@Param('username') username: string): Promise<any[]> {
        return this.UserRepository.findPhotosLikedByUser(username);
    }

    @Get()
    async findByFilter(@Query() query: Query): Promise<any[]> {
        const { id = null, username = null } = query;
        if (id) {
            return this.UserRepository.findByID(id);
        }
        if (username) {
            return this.UserRepository.findByUsername(username);
        } else {
            // Default behaviour of this endpoint
            // TODO: throw if query does not strictly match
            return this.UserRepository.find();
        }
    }

    @Put(':username')
    async update(@Param('username') username: string, @Body() user: IUser): Promise<any[]> {
        // TODO: Move to seperate validation module
        const originalUser = await this.UserRepository.findByUsername(username);
        if (originalUser.length < 1) return [{ message: `The user '${username}' does not exists` }];
        return this.UserRepository.update({ ...originalUser[0], ...user });
    }

    @Delete(':username')
    async remove(@Param('username') username: string): Promise<any[]> {
        return this.UserRepository.remove(username);
    }
}
