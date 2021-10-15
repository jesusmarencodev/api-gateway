import { Injectable } from "@nestjs/common";
import { ConfigService } from '@nestjs/config';
import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';
import { RabbitMQ } from "../constants";


@Injectable()
export class ClientProxyFlights {
    constructor(private readonly config: ConfigService) { }

    //conexion para usuarios
    clientProxyUsers(): ClientProxy {
        return ClientProxyFactory.create({
            transport: Transport.RMQ,
            options: {
                urls: this.config.get('AMQP_URL'),
                queue: RabbitMQ.UserQueue
            }
        })
    }
    //conexion pasajeros
    clientProxyPassengers(): ClientProxy {
        return ClientProxyFactory.create({
            transport: Transport.RMQ,
            options: {
                urls: this.config.get('AMQP_URL'),
                queue: RabbitMQ.PassengerQueue
            }
        })
    }
    //conexion super flight
    clientProxySuperFlight(): ClientProxy {
        return ClientProxyFactory.create({
            transport: Transport.RMQ,
            options: {
                urls: this.config.get('AMQP_URL'),
                queue: RabbitMQ.FlightQueue
            }
        })
    }
}