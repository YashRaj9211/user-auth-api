import { Controller, Post, Body, Get, Query, Param, Delete, UseGuards } from '@nestjs/common';
import { UserRegister, UserLogin } from './user.interface';
import { UserService } from './user.service';
import { stringify } from 'querystring';
import { ThrottlerGuard } from '@nestjs/throttler';

@Controller('user')
@UseGuards(ThrottlerGuard)
export class UserController {

    constructor(private userService: UserService){}
    @Post('register')
    async register(@Body() userRegister: UserRegister): Promise<{}> {
      // console.log(JSON.stringify(userInterface.username))
      return this.userService.register(userRegister);
    }
  

    @Post('login')
    async login(
      // @Body('username') username: string, @Body('password') password: string
      @Body() userLogin: UserLogin,
      ): Promise<{}> {
      return await this.userService.login(userLogin);
    }
  
    // @Get(':userId')
    // async getUserProfile(@Param('userId') userId: string): Promise<{}> {
    //   // return await this.userService.getUserProfile(userId);
    // }
    
    @Delete(':userId')
      async deleteUserProfile(@Param('userId') userId: number): Promise<{}>{
        return await this.userService.delteUser(userId);
      }
    
}
