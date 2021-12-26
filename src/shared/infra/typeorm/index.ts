import { createConnection, getConnectionOptions } from "typeorm";

interface IOptions {
  host: string;
}

export default async () => {
  const defaultOptions = await getConnectionOptions();

  return createConnection(
    Object.assign(defaultOptions, {
      database:
        process.env.NODE_ENV === "test"
          ? "rentex_test"
          : defaultOptions.database,
    })
  );
};
