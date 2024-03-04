import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthGaurdService } from 'src/auth-gaurd/auth-gaurd.service';
import { UserLogin, UserRegister } from './user.interface';
import { JwtService } from '@nestjs/jwt';
// import { User, Prisma } from '@prisma/client';


@Injectable()
export class UserService {

  constructor(
    private readonly prisma: PrismaService,
    private authGaurdService: AuthGaurdService,
    private jwtService: JwtService,
  ) { };

  async register(data: UserRegister): Promise<object> {
    try {
      const hashPassword = await this.authGaurdService.hashPassword(data.password);
      data.password = hashPassword;
      const newUser = await this.prisma.user.create({ data });
      return {
        message: 'User registered successfully',
        user: { uid: newUser.id, username: newUser.username },
        statusCode: HttpStatus.CREATED,
      };
    } catch (error) {
      return ({
        message: 'Failed to register user',
        error: error,
        statusCode: HttpStatus.BAD_REQUEST,
      })
    }
  }

  async login(data: UserLogin): Promise<Object> {
    try {
      const findExistingUser = await this.prisma.user.findUnique({
        where: {
          username: data.username,
        },
      });

      if (!findExistingUser) {
        // const mathchedPassword = await this.authGaurdService.decrypt(data.password, findExistingUser.password);
        return new HttpException('User not found', HttpStatus.NOT_FOUND);
      }

      const matchedPassword = await this.authGaurdService.decrypt(data.password, findExistingUser.password);

      if (!matchedPassword) {
        return new HttpException('Wrong password', HttpStatus.BAD_REQUEST);
      }

      const tokenPayload = { uid: findExistingUser.id, username: findExistingUser.username, password: data.password };

      const token = this.jwtService.sign(tokenPayload);
      
      // const token_content = await this.jwtService.decode(token);
      // console.log(token_content);
      return `{ "message": "Yay! ${findExistingUser.username} you are logged in!", "token": ${token} "status": ${HttpStatus.ACCEPTED} }`;

    } catch (error) {
      return{"message": "Internal Server Error", "error": error.message, "status": HttpStatus.BAD_GATEWAY};
    }
  }

  async delteUser(userId: number): Promise<{}>{
    const delteUser = await this.prisma.user.delete({
      where: {
        id: +userId
      }
    })

    if(delteUser){
      return {"Message": "User deleted", "status": HttpStatus.ACCEPTED};
    }
  }
}
