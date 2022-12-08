import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice({
    transport: Transport.TCP,
    options: {
      port: 3001
    }
  })


  app.enableCors();

  // app.setGlobalPrefix("/api/v1")
  
  app.use((req: Request, res: Response, next) => {
    console.log(req);
    next();
  });
  
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true
  }));

  await app.startAllMicroservices();
  await app.listen(3001, () => { console.log('User Service is running!') });
}
bootstrap();
