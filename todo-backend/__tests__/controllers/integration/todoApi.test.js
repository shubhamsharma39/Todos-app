const request = require("supertest");
const { MongoMemoryServer } = require("mongodb-memory-server");
const mongoose = require("mongoose");

const app = require("../../../server");
const Todo = require("../../../models/todoModels");

jest.setTimeout(10000); 

describe("Todo API Integration Test", () => {
    let mongoServer;

    beforeAll(async () => {
        if (mongoose.connection.readyState !== 0) {
            await mongoose.disconnect();
        }

        mongoServer = await MongoMemoryServer.create();
        const mongoUri = mongoServer.getUri();

        console.log("Connecting to test MongoDB...");
        await mongoose.connect(mongoUri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 5000, 
        });
        await mongoose.connection.db.admin().ping(); 
        console.log("MongoDB connection established!");
    });

    afterAll(async () => {
        if (mongoose.connection.readyState !== 0) {
            await mongoose.connection.dropDatabase();
            await mongoose.connection.close();
        }
        if (mongoServer) {
            await mongoServer.stop();
        }
    });

    describe("GET /api/get-todo", () => {
        it("should return all the todos", async () => {
            await Todo.create({ title: "Todo 1" });
            await Todo.create({ title: "Todo 2" });

            const response = await request(app).get("/api/get-todo");
            expect(response.status).toBe(200);
            expect(response.body.length).toBe(2);
            expect(response.body[0].title).toBe("Todo 1");
            expect(response.body[1].title).toBe("Todo 2");
        });
    });

    describe("POST /api/add-todo", () => {
        it("should return a new todo", async () => {
            const response = await request(app).post("/api/add-todo").send({title: "New Todo"});
 
            expect(response.status).toBe(200);
            expect(response.body.title).toBe("New Todo");
            expect(response.body.completed).toBe(false);

            const todo = await Todo.findById(response.body._id)
            console.log("Response is ", todo);
            expect(todo).toBeTruthy();
            expect(todo.title).toBe("New Todo")
           
        });
    });
});
