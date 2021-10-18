import { Body, Controller, Delete, Get, Param, Post, Put, HttpStatus, HttpException, UseGuards } from '@nestjs/common';
import { IFlight } from 'src/common/interface/flight.interface';
import { ClientProxyFlights } from '../common/proxy/client-proxy';
import { FlightDTO } from './dto/flight.dto';
import { FlightMSG, PassengerMSG } from '../common/constants';
import { Observable } from 'rxjs';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';

@ApiTags('Flights')
@UseGuards(JwtAuthGuard)
@Controller('api/v2/flight')
export class FlightController {
    constructor(private readonly clientProxy: ClientProxyFlights){}

    private _clientProxyFlight = this.clientProxy.clientProxySuperFlight();
    private _clientProxyPassenger = this.clientProxy.clientProxyPassengers();

    @Post()
    create(@Body() flightDTO : FlightDTO):Observable<IFlight>{
        return this._clientProxyFlight.send(FlightMSG.CREATE, flightDTO);
    }

    @Post(':flightId/passenger/:passengerId')
    async addPassenger(
        @Param('flightId') flightId: string,
        @Param('passengerId') passengerId: string
    ){
        console.log(flightId, passengerId)
        const passenger = await this._clientProxyPassenger.send(PassengerMSG.FIND_ONE, passengerId).toPromise();
        console.log(passenger)    
        if(!passenger) throw new HttpException('Passenger not found', HttpStatus.NOT_FOUND);

        return this._clientProxyFlight.send(FlightMSG.ADD_PASSENGER, {flightId, passengerId});

    }

    

    @Get()
    findAll():Observable<IFlight[]>{
        return this._clientProxyFlight.send(FlightMSG.FIND_ALL, '');
    }

    @Get(':id')
    findOne(id:string):Observable<IFlight>{
        return this._clientProxyFlight.send(FlightMSG.FIND_ONE, id);
    }

    @Put(':id')
    update(@Param('id') id : string, @Body() flightDTO : FlightDTO):Observable<IFlight>{
        return this._clientProxyFlight.send(FlightMSG.UPDATE, {id, flightDTO});
    }

    @Delete(':id')
    delete(@Param('id') id : string):Observable<any>{
        return this._clientProxyFlight.send(FlightMSG.DELETE, id);
    }

    

}
