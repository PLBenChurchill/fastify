import { randomBytes } from "crypto";
import fastify, { FastifyRequest } from "fastify";
import { MongoClient } from "mongodb";

const server = fastify();
// Replace the uri string with your connection string.
const uri =
  "mongodb://mongo:ZdabZuYZ14fIKyxcL1F8@containers-us-west-72.railway.app:7612";
const client = new MongoClient(uri);



server.get("/", async (request: FastifyRequest, reply) => {
  const response = await client.db('test').collection('users').insertOne({
    name: 'test'
  })

  reply.code(200).send({ message: "Hello world!", response, });
});

server.listen(process.env.PORT || 8080, "0.0.0.0", (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
