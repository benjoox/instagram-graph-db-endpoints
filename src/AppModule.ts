import { Module } from '@nestjs/common';
import { HealthModule } from './health/HealthModule';
import { TrafficModule } from './traffic/TrafficModule';
import { DrivineModule, DrivineModuleOptions } from '@liberation-data/drivine/DrivineModule';
import { DatabaseRegistry } from '@liberation-data/drivine/connection/DatabaseRegistry';
import { MovieModule } from '@/movies/MovieModule';
import { UserModule } from './users/UserModule';

@Module({
    imports: [
        DrivineModule.withOptions(<DrivineModuleOptions>{
            connectionProviders: [DatabaseRegistry.buildOrResolveFromEnv()]
        }),
        HealthModule,
        MovieModule,
        TrafficModule,
        UserModule
    ],
    controllers: [],
    providers: []
})
export class AppModule {


}


