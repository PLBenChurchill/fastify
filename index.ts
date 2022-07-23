import { randomBytes } from "crypto";
import fastify, { FastifyRequest } from "fastify";
import { MongoClient, ObjectId } from "mongodb";

const server = fastify();
// Replace the uri string with your connection string.
const uri =
  "mongodb://mongo:ZdabZuYZ14fIKyxcL1F8@containers-us-west-72.railway.app:7612";
const client = new MongoClient(uri);

server.get("/", async (request: FastifyRequest<any>, reply) => {
  reply.code(200).send({ hello: "world" });
});

server.put("/user", async (request: FastifyRequest<any>, reply) => {
  if (!request?.body?.email) {
    reply.code(400).send({ error: "missing email from body" });
  }

  await client.db('test').collection('users').insertOne({
    email: request.body.email,
  })
  reply.code(201).send({ message: "user created" });
});

server.get('/user/:userId', async (request: FastifyRequest<any>, reply) => {
  const userId = request.params.userId;
  const user = await client.db('test').collection('users').findOne({
    _id: new ObjectId(userId)
  });
  reply.code(200).send({
    found: user,
    requested: userId
  });
});

server.listen(process.env.PORT || 8080, "0.0.0.0", (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
