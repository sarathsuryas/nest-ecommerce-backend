import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { AdminController } from './admin/controllers/admin/admin.controller';
import 'dotenv/config'

@Module({
  imports: [MongooseModule.forRoot(process.env.MONGODB_URI), UsersModule],
  controllers: [AppController, AdminController],
  providers: [AppService],
})
export class AppModule {}
