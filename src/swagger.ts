import swaggerJSDoc from "swagger-jsdoc";


const swaggerDefinition = {
   openapi: "3.0.0",
   info: {
       title: "classroom app",
       version: "1.0.0",
       description: "this is the decription of the classroom app"
   },
   servers: [
       {
           url: "http://localhost:5001"
       }
   ]
}


const options = {
   definition: swaggerDefinition,
   apis:["./src/routes/*.ts", "./src/server.ts"]
}


export const swaggerSpec = swaggerJSDoc(options);