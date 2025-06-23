import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './controllers/app.controller';
import { AppService } from './app.service';
import { AuthMiddleware } from './middlewares/auth.middleware';
import { ProductController } from './controllers/product.controller';
import { AuthController } from './controllers/auth.controller';

@Module({
  imports: [],
  controllers: [
    AppController,
    ProductController,
    AuthController
  ],
  providers: [
    AppService
  ],
})
export class AppModule 
// implements NestModule 
{
  // configure(consumer: MiddlewareConsumer) {
  //   consumer
  //     .apply(AuthMiddleware)
  //     .forRoutes(ProductController);
  // }
}