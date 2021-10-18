import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { PassengerMSG } from 'src/common/constants';
import { ClientProxyFlights } from 'src/common/proxy/client-proxy';
import { IPassenger } from '../common/interface/passenger.interface';
import { PassengerDTO } from './dto/passenger.dto';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';

@ApiTags('Passengers')
@UseGuards(JwtAuthGuard)
@Controller('api/v2/passenger')
export class PassengerController {
    constructor(private readonly clientProxy: ClientProxyFlights){}

    private _clientProxyPassenger = this.clientProxy.clientProxyPassengers();

    @Post()
    create(@Body() passengerDTO : PassengerDTO ): Observable<IPassenger>{
        return this._clientProxyPassenger.send(PassengerMSG.CREATE, passengerDTO)
    }

    @Get()
    findAll(): Observable<IPassenger[]>{
        return this._clientProxyPassenger.send(PassengerMSG.FIND_ALL, '');
    }

    @Get(':id')
    findOne(@Param('id') id : string): Observable<IPassenger>{
        return this._clientProxyPassenger.send(PassengerMSG.FIND_ONE, id);
    }

    @Put(':id')
    update(@Param('id') id : string, @Body() passengerDTO : PassengerDTO) : Observable<IPassenger>{
        return this._clientProxyPassenger.send(PassengerMSG.UPDATE, {id, passengerDTO});
    }

    @Delete(':id')
    delete(@Param('id') id : string):Observable<any>{
        return this._clientProxyPassenger.send(PassengerMSG.DELETE, id);
    }
    
}
