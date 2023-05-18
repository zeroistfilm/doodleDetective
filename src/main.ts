import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {setupSwagger} from "./util/swagger/swagger.util";
import { json } from 'body-parser';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  setupSwagger(app);
  app.use(json({ limit: '50mb' }));
  app.enableCors({
    origin: [
      'http://127.0.0.1:3000',
      'http://127.0.0.1:5500',
      'http://localhost:3000',
      'http://localhost:3001',
      'https://localhost:3000',
      'https://localhost:3001',
      'https://localhost:80','http://localhost:63342',
    ], // 접근 권한을 부여하는 도메인
    credentials: true, // 응답 헤더에 Access-Control-Allow-Credentials 추가
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS', // 응답 헤더에 Access-Control-Allow-Methods 추가
    //optionsSuccessStatus: 200, // 응답 상태 200으로 설정
  });

  await app.listen(3000);
}
bootstrap();
