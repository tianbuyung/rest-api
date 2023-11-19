import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // GET /users
  // GET /users?role=value
  @Get()
  findAll(@Query('role') role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
    console.log('queryParams: ', role);
    return this.usersService.findAll(role);
  }

  // GET /users/interns
  @Get('interns')
  findAllInterns() {
    return this.usersService.findAllInterns();
  }

  // GET /users/:id
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findOne(id);
  }

  // POST /users
  @Post()
  create(
    @Body()
    user: {
      name: string;
      email: string;
      role: 'INTERN' | 'ENGINEER' | 'ADMIN';
    },
  ) {
    return this.usersService.create(user);
  }

  // PATCH /users/:id
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body()
    userUpdate: {
      name: string;
      email: string;
      role: 'INTERN' | 'ENGINEER' | 'ADMIN';
    },
  ) {
    return this.usersService.update(id, userUpdate);
  }

  // DELETE /users/:id
  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.delete(id);
  }
}
