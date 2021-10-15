import { Module } from '@nestjs/common';
import { ClientProxyFlights } from './client-proxy';


@Module({
    providers: [ClientProxyFlights],
    exports:[ClientProxyFlights]
})

export class ProxyModule{}