import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { MikroOrmMiddleware, MikroOrmModule } from "@mikro-orm/nestjs";

@Module({
  imports: [MikroOrmModule.forRoot()],
})
export class DatabaseModule implements NestModule {
  constructor() {}

  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(MikroOrmMiddleware).forRoutes("*");
  }
}
