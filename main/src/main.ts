import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  // const app = await NestFactory.create(AppModule);
  // app.setGlobalPrefix('api')
  // app.enableCors({
  //   origin:'http://localhost:4200'
  // })
  // await app.listen(8001);

  const app = await NestFactory.createMicroservice(
    AppModule, {
    transport: Transport.RMQ,
    options: {
      urls: ['amqps://obhlbcvp:vuMB_HPYPo769PiIYXfx-FqjXvgjq9QB@armadillo.rmq.cloudamqp.com/obhlbcvp'],
      queue: 'main_queue',
      queueOptions: {
        durable: false
      },
    },
  });
  await app.listen(); 
  console.log('Microservice Started');
}
bootstrap();
