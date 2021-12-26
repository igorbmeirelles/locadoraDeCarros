import request from "supertest"
import { app } from "../../../../app";
import createConnection from "../../../../shared/infra/typeorm";
import { Connection } from "typeorm";
import { v4 as uuid } from "uuid";
import { hash } from "bcryptjs";

let connection: Connection
describe('List categories controller', () => {
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

  it('Should be able to list all categories', async () => {
    const tokenResponse = await request(app).post("/sessions").send({
      email: "admin@admin.com",
      password: "admin"
    })

    const { refresh_token: token } = tokenResponse.body

    const responsePostCategories = await request(app).post("/categories").send({
      name: "Test",
      description: "Test"
    }).set({
      Authorization: `Bearer ${token}`
    });

    const responseListCategories = await request(app).get("/categories").set({Authorization: `Bearer ${token}`});
    
    expect(responseListCategories.status).toBe(200);
    expect(responseListCategories.body.length).toBe(1);
    expect(responseListCategories.body[0]).toHaveProperty('id');
  });

})
