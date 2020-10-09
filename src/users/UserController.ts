import { Controller, Query, Body, Param, Put,  Get, Delete } from '@nestjs/common';
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
            return this.UserRepository.findUsers();
        }
    }

    @Put(':username')
    async update(@Param('username') username: string, @Body() user: IUser): Promise<any[]> {
        return this.UserRepository.update(username, user);
    }

    @Delete(':username')
    async remove(@Param('username') username: string): Promise<any[]> {
        return this.UserRepository.remove(username);
    }
}
