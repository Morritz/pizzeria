import 'svelte/register';

import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { PrismaService } from './prisma.service';
import { svelteViewEngine } from './svelte-view-engine';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.engine('svelte', svelteViewEngine);
  app.setViewEngine('svelte');
  const prismaService = app.get(PrismaService);
  await prismaService.enableShutdownHooks(app);
  await app.listen(3000);
}
bootstrap();
