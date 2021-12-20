import request from "supertest"
import { app } from "../../../../app";
import createConnection from "../../../../shared/infra/typeorm";
import { Connection } from "typeorm";
import { v4 as uuid } from "uuid";
import { hash } from "bcryptjs";

let connection: Connection
describe('Create categories controller', () => {
  beforeAll(async () => {
    connection = await createConnection()
    await connection.runMigrations()

    const id = uuid();
    const password = await hash('admin', 8);

    await connection.query(`
    INSERT INTO USERS(id, name, email, password, "isAdmin", created_at, driver_license)
    values('${id}', 'admin', 'admin@admin.com', '${password}', true, now(), 'special license')
    `)
  })

  afterAll(async () => {
    await connection.dropDatabase()
    await connection.close()
  })

  it('Should be able to create a specification', async () => {
    const tokenResponse = await request(app).post("/sessions").send({
      email: "admin@admin.com",
      password: "admin"
    })

    const { token } = tokenResponse.body

    const responsePostCategories = await request(app).post("/specifications").send({
      name: "Test",
      description: "Test"
    }).set({
      Authorization: `Bearer ${token}`
    });

    expect(responsePostCategories.status).toBe(201);
  });

  it('Should not be able to create a duplicate category', async () => {
    const tokenResponse = await request(app).post("/sessions").send({
      email: "admin@admin.com",
      password: "admin"
    })

    const { token } = tokenResponse.body

    const responsePostCategories = await request(app).post("/specifications").send({
      name: "Test",
      description: "Test"
    }).set({
      Authorization: `Bearer ${token}`
    });

    expect(responsePostCategories.status).toBe(400);
    expect(responsePostCategories.body.status).toBe("error");
    expect(responsePostCategories.body.message).toBe("Specification already exists");
  });
})
