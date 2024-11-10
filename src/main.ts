import { NestFactory } from "@nestjs/core";
import { ConfigService } from "@nestjs/config";
import {
  DocumentBuilder,
  SwaggerDocumentOptions,
  SwaggerModule,
} from "@nestjs/swagger";

import { EnvironmentVars } from "./config/environment.config";
import { AppModule } from "./app.module";

const bootstrap = async (): Promise<void> => {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  const configService =
    app.get<ConfigService<EnvironmentVars, true>>(ConfigService);

  if (configService.get("NODE_ENV") !== "production") {
    const config = new DocumentBuilder()
      .setTitle("API Documentation")
      .setDescription("")
      .setVersion("1.0")
      .addServer("/api/", "HTTP")
      .addTag("C-CHAIN Test App API")
      .build();

    const options: SwaggerDocumentOptions = {
      operationIdFactory: (_controllerKey: string, methodKey: string) =>
        methodKey,
    };

    const document = SwaggerModule.createDocument(app, config, options);
    SwaggerModule.setup("docs", app, document, {
      swaggerOptions: {
        persistAuthorization: true,
        tagsSorter: "alpha",
        operationsSorter: "alpha",
      },
    });
  }

  app.setGlobalPrefix("api", { exclude: ["docs", "docs-json"] });
  app.enableShutdownHooks();

  await app.listen(configService.get("PORT"));
};

bootstrap();
