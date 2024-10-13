import swaggerJSDoc from "swagger-jsdoc";


const swaggerDefinition = {
   openapi: "3.0.0",
   info: {
       title: "blog app",
       version: "1.0.0",
       description: "this is the decription of the blog app"
   },
   servers: [
       {
           url: "http://localhost:5000"
       }
   ]
}


const options = {
   definition: swaggerDefinition,
   apis:["./src/routes/*.ts", "./src/app.ts"]
}


export const swaggerSpec = swaggerJSDoc(options);