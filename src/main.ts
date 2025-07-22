import 'module-alias/register';
import { NestFactory } from '@nestjs/core';
import { AppModule } from '@/app.module';
import {
  ClassSerializerInterceptor,
  ValidationPipe,
  VersioningType,
} from '@nestjs/common';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import * as compression from 'compression';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
const corsOptions: CorsOptions = {
  origin: true,
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  allowedHeaders: ['*'], 
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(compression()); 
  app.enableCors(corsOptions);
  app.setGlobalPrefix('api');
  // or "app.enableVersioning()";
  app.enableVersioning({
    type: VersioningType.URI,
  });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );
  app.useGlobalInterceptors(
    new ClassSerializerInterceptor(app.get('Reflector')),
  );

  const options = new DocumentBuilder()
    .setTitle('Bolle Consulting Backend API')
    .setDescription('')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('docs', app, document);

  await app.listen(parseInt(process.env.PORT, 10) || 3000);
}

bootstrap();
