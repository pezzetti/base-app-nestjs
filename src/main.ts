import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder } from '@nestjs/swagger/dist/document-builder';
import { SwaggerModule } from '@nestjs/swagger/dist/swagger-module';
import { AppModule } from './app.module';
import { validateEnvironmentVars } from './config/configuration';

async function bootstrap(): Promise<void> {
    validateEnvironmentVars();
    const app = await NestFactory.create(AppModule);
    const configService = app.get(ConfigService);

    const options = new DocumentBuilder()
        .setTitle("Base App API's")
        .setDescription("List of API's available")
        .setVersion('1.0')
        .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('docs', app, document);

    const port = configService.get('server.port');
    await app.listen(port);
    Logger.log(`Appplication started on port: ${port}`);
}
bootstrap();
