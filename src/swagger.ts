import swaggerJsdoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Deliveroo Clone API",
      version: "1.0.0",
      description: "A food delivery REST API built with Express & MongoDB",
    },
    servers: [
      {
        url: "http://localhost:4000",
        description: "Development server",
      },
    ],
    tags: [
      { name: "Health", description: "API health check" },
      { name: "Auth", description: "Authentication endpoints" },
      { name: "Restaurants", description: "Restaurant management" },
      { name: "Categories", description: "Menu categories" },
      { name: "Dishes", description: "Dish management" },
      { name: "Cart", description: "Shopping cart" },
      { name: "Users", description: "User management" },
    ],
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
  apis: ["./src/routes/*.ts"],
};

export const swaggerSpec = swaggerJsdoc(options);
export { default as swaggerUi } from "swagger-ui-express";
