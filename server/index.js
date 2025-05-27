import express from 'express'; // yarn add express
import { createHandler } from 'graphql-http/lib/use/express';
import dotenv from 'dotenv'
import { altairExpress } from 'altair-express-middleware';
import schema from './schema/schema.js'
import colors from 'colors'
import { connectDB } from './config/db.js';
import cors from 'cors'
dotenv.config()
// Create an express instance serving all methods on `/graphql`
// where the GraphQL over HTTP express request handler is

const app = express();
// connect to db
connectDB(); 
app.use(cors())
const port = process.env.PORT || 5000

app.use(express.json())

 app.use('/graphql', createHandler({ schema }));

 app.use('/altair', altairExpress({
    endpointURL:"/graphql"
 }))

app.listen(port, () => {
  console.log(`🚀 GraphQL ready at http://localhost:${port}/graphql`);
  console.log(`🌈 Altair GraphQL UI at http://localhost:${port}/altair`);
});
