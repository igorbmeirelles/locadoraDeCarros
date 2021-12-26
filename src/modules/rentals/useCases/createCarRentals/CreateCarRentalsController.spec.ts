import request from "supertest"
import { app } from "../../../../app";
import createConnection from "../../../../shared/infra/typeorm";
import { Connection } from "typeorm";
import { v4 as uuid } from "uuid";
import { hash } from "bcryptjs";
import dayjs from "dayjs";
import { ICarsRepository } from "./../../../cars/repositories/cars/ICarsRepository";
import { CarsRepository } from "../../../cars/infra/repositories/cars/CarsRepository";

let connection: Connection
let carsRepository: ICarsRepository

describe('List categories controller', () => {
  const day24HoursLater = dayjs().add(25, 'hour').toDate()
  beforeAll(async () => {
    connection = await createConnection()
    await connection.runMigrations()

    carsRepository = new CarsRepository()

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

    const responseCreateCategory = await request(app).post("/categories").send({
      name: "sport",
      description: "categoria de sport"
    }).set({
      Authorization: `Bearer ${token}`
    })

    const responseCreateCar = await request(app).post("/cars").send({
      name: "Carro novo",
      description: "Carro muito novo",
      daily_rate: 200,
      license_plate: "ade234",
      fine_amount: 40,
      brand: "VeryGood",
      category_id: responseCreateCategory.body.id
    }).set({
      Authorization: `Bearer ${token}`
    })

    const responseCreateRental = await request(app).post("/rentals").send({
      car_id: responseCreateCar.body.id,
      expected_return_date: day24HoursLater
    }).set({
      Authorization: `Bearer ${token}`
    })

    const car = await carsRepository.findById(responseCreateCar.body.id)
    
    expect(responseCreateRental.body).toHaveProperty('id')
    expect(car.available).toBe(false)
  });

})
