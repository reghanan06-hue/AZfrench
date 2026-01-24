import path from "path";
import { fileURLToPath } from "url";
import swaggerJsDoc from "swagger-jsdoc";

// Fix __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "AZ french API",
      version: "1.0.0",
      description: "API documentation for AZ french backend",
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
  },
  apis: [path.join(__dirname, "../routers/*.js")],
};

export const swaggerSpec = swaggerJsDoc(options);
