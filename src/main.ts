import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {setupSwagger} from "./util/swagger/swagger.util";
import { json } from 'body-parser';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  setupSwagger(app);
  app.use(json({ limit: '50mb' }));
  await app.listen(3000);
}
bootstrap();
