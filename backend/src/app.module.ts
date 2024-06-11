import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { UserModule } from "./user/user.module";
import { WordModule } from "./word/word.module";
import { AuthModule } from "./auth/auth.module";
import { KanjiModule } from "./kanji/kanji.module";
import { PrismaModule } from "./prisma/prisma.module";

@Module({
  imports: [
    AuthModule,
    UserModule,
    WordModule,
    KanjiModule,
    PrismaModule,
    ConfigModule.forRoot({ isGlobal: true }),
  ],
})
export class AppModule {}
