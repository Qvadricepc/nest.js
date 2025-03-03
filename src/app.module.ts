import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ListModule } from './task-list/list.module';
import { ItemModule } from './task-item/item.module';
import { DatabaseModule } from './database.module';
import { ConfigModule } from '@nestjs/config';
import { validate } from './env.validate';

@Module({
  imports: [
    DatabaseModule,
    ListModule,
    ItemModule,
    ConfigModule.forRoot({
      isGlobal: true,
      validate: validate,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
