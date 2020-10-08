import { Module } from '@nestjs/common';
import { DrivineModule, DrivineModuleOptions } from '@liberation-data/drivine/DrivineModule';
import { DatabaseRegistry } from '@liberation-data/drivine/connection/DatabaseRegistry';
import { UserModule } from './users/UserModule';
import { PhotoModule } from './photos/PhotoModule';

@Module({
    imports: [
        DrivineModule.withOptions(<DrivineModuleOptions>{
            connectionProviders: [DatabaseRegistry.buildOrResolveFromEnv()]
        }),
        UserModule,
        PhotoModule
    ],
    controllers: [],
    providers: []
})
export class AppModule {}
