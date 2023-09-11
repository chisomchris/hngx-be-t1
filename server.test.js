const request = require("supertest");
const { connect } = require("./utils/connectDB");
const { default: mongoose } = require("mongoose");
const { app } = require("./server");

const addToDB = async (payload) => {
  return await request(app).post("/api").send(payload);
};

const cleanDB = async (person) => {
  await request(app).delete("/api/" + person.body.result.id);
};

beforeEach(async () => {
  await connect();
});

afterEach(async () => {
  await mongoose.connection.close();
});

describe("/api", () => {
  // check if API is working
  it("should return ok response code", async () => {
    const res = await request(app).get("/api");
    expect(res.statusCode).toBe(200);
  });

  //   check for proper return value on resource not found
  it("should return 404 Not found error", async () => {
    const res = await request(app).get("/api/mark");
    expect(res.statusCode).toBe(404);
  });

  //   Add a person, update the person data and delete
  it("Should Update person data by ID", async () => {
    const person = await addToDB({ name: "chisomchris" });
    const res = await request(app)
      .put(`/api/${person.body.result.id}`)
      .send({ hobbies: "Loves HNG" });

    if (person.statusCode == 201) {
      await cleanDB(person);
    }
    expect(res.statusCode).toBe(200);
    expect(res.body.result.hobbies).toBe("Loves HNG");
  });

  it("Should Update person data by name", async () => {
    const person = await addToDB({ name: "chisomchris" });
    const res = await request(app)
      .put(`/api/${person.body.result.name}`)
      .send({ about: "Loves HNG" });

    if (person.statusCode == 201) {
      await cleanDB(person);
    }
    expect(res.statusCode).toBe(200);
    expect(res.body.result.about).toBe("Loves HNG");
  });

  it("Should add person in database", async () => {
    const person = await addToDB({ name: "chisomchris" });
    if (person.statusCode == 201) {
      await cleanDB(person);
    }
    expect(person.statusCode).toBe(201);
    expect(person.body.result.name).toBe("chisomchris");
  });

  it("Should remove person from database by Name", async () => {
    const person = await addToDB({ name: "chisomchris" });
    expect(person.statusCode).toBe(201);
    await request(app).delete("/api/chisomchris");
    const res = await request(app).get("/api/chisomchris");
    expect(res.statusCode).toBe(404);
  });

  it("Should remove person from database by Id", async () => {
    const person = await addToDB({ name: "chisomchris" });
    expect(person.statusCode).toBe(201);
    await request(app).delete(`/api/${person.body.result.id}`);
    const res = await request(app).get("/api/chisomchris");
    expect(res.statusCode).toBe(404);
  });

  it("Should return 409 error if user already exists", async () => {
    const person = await addToDB({ name: "chisomchris" });
    const res = await addToDB({ name: "chisomchris" });
    if (person.statusCode == 201) {
      await cleanDB(person);
    }
    expect(res.statusCode).toBe(409);
  });

  it("Should get a person", async () => {
    const person = await addToDB({ name: "chisomchris" });
    const res = await request(app).get("/api/chisomchris");
    if (person.statusCode == 201) {
      await cleanDB(person);
    }
    expect(res.body.result.name).toBe("chisomchris");
  });
});
