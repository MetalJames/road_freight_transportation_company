const { MongoMemoryServer } = require('mongodb-memory-server');

let mongoServer;

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    global.__MONGO_URI__ = mongoServer.getUri();
    global.__MONGO_DB_NAME__ = mongoServer.instanceInfo.dbName;
});

afterAll(async () => {
    await mongoServer.stop();
});