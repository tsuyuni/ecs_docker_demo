import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import * as fs from "fs";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const options = new DocumentBuilder().setTitle("API Definition").build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup("_doc", app, document);
  fs.writeFileSync("./schema.json", JSON.stringify(document, undefined, 2));

  await app.listen(8080);
}
bootstrap();
