import { createConnection } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { hash } from 'bcryptjs';

async function create() {
  const connection = await createConnection();

  const id = uuid();
  const password = await hash('admin', 8);

  connection.query(`
  INSERT INTO USERS(id, name, email, password, "isAdmin", created_at, driver_license)
  values('${id}', 'admin', 'admin@admin.com', '${password}', true, now(), 'special license')
  `)

  await connection.close()
}

create().then(() => console.log('Admin created'))