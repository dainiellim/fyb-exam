import { Module } from '@nestjs/common';
import { AppController } from './controllers/app.controller';
import { AppService } from './services/app.service';
import { ProductController } from './controllers/product.controller';
import { AuthController } from './controllers/auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthService } from './services/auth.service';
import { UserController } from './controllers/user.controller';
import { UserService } from './services/user.service';
import { Product } from './entities/product.entity';
import { ProductService } from './services/product.service';

declare var process : {
  env: {
    DATABASE_TYPE: 'mysql' | 'mariadb' | 'mongodb' | 'postgres',
    DATABASE_HOST: string,
    DATABASE_PORT: number,
    DATABASE_USERNAME: string,
    DATABASE_PASSWORD: string,
    DATABASE_NAME: string
    DATABASE_SYNCHRONIZE: boolean,
    JWT_SECRET: string,
    JWT_EXPIRATION_TIME: string
  }
}

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: process.env.DATABASE_TYPE,
      host: process.env.DATABASE_HOST,
      port: process.env.DATABASE_PORT,
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [User, Product],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([User, Product]),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: process.env.JWT_EXPIRATION_TIME },
    }),
  ],
  controllers: [
    AppController,
    ProductController,
    AuthController,
    UserController
  ],
  providers: [
    AppService,
    AuthService,
    UserService,
    ProductService
  ],
})
export class AppModule 
{
}