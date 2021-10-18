import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserDTO } from '../user/dto/user.dto';
import { ClientProxyFlights } from '../common/proxy/client-proxy';
import { UserMSG } from 'src/common/constants';

@Injectable()
export class AuthService {
    constructor(
        private readonly clientProxy: ClientProxyFlights,
        private readonly jwtService : JwtService
    ){}

    private _clientProxyUser = this.clientProxy.clientProxyUsers();

    async validateUser(username, password):Promise<any>{
        const user = await this._clientProxyUser.send(UserMSG.VALIDATE, {
            username,
            password
        })
        .toPromise();

        if(user) return user;

        return null;


    }

    async signIn(user:any){
        const payload = {
            username : user.username,
            sub: user._id,
        }

        return { access_token: this.jwtService.sign(payload) };
    }

    async signUp(userDTO:UserDTO){
        return await this._clientProxyUser.send( UserMSG.CREATE, userDTO ).toPromise();
    }

}
