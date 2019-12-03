import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { SharedModule } from "./shared/shared.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigService } from "./config/ConfigService";
import { FeatureModule } from "./feature/feature.module";

@Module({
  imports: [
    SharedModule,
    TypeOrmModule.forRoot(ConfigService.getTypeOrmConfig()),
    FeatureModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
