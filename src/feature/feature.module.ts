import { Module } from "@nestjs/common";
import { EbbinghausModule } from "./ebbinghaus/ebbinghaus.module";

@Module({
  imports: [EbbinghausModule,],
  exports: [EbbinghausModule]
})
export class FeatureModule {}
