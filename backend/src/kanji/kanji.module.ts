import { Module } from "@nestjs/common";
import { KanjiController } from "./kanji.controller";
import { KanjiService } from "./kanji.service";

@Module({
  controllers: [KanjiController],
  providers: [KanjiService],
})
export class KanjiModule {}
