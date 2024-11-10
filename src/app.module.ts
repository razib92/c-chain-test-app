import { MiddlewareConsumer, Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { MikroOrmModule } from "@mikro-orm/nestjs";

import { environmentConfig } from "./config/environment.config";
import mikroOrmConfig from "./config/mikroorm.config";
import { ClientModule } from "./modules/client/client.module";
import { TransactionModule } from "./modules/transaction/transaction.module";

@Module({
  imports: [
    ConfigModule.forRoot(environmentConfig),
    MikroOrmModule.forRoot(mikroOrmConfig),
    ClientModule,
    TransactionModule,
  ],
  providers: [],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {}
}
