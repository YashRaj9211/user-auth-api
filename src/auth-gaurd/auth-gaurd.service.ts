import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthGaurdService {
    async hashPassword(password: string):Promise<string> {
        const hashedPassword = await bcrypt.hash(password, 10);
        return hashedPassword;
    }

    async decrypt(password: string, hashedPass: string): Promise<Boolean> {
        const comarePassword = await bcrypt.compare(password, hashedPass);
        if(comarePassword){
            return true;
        }
    }

    // async dehashPassword(password: string):Promise<string> {
    //     const 
    // }
    
}
