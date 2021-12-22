import { container } from "tsyringe";
import { DayjsDateProvider } from "./dateProvider/DayjsDateProvider";
import { IDateProvider } from "./dateProvider/IDateProvider";
import { EtherealMailProvider } from "./mailProvider/EtherealMailProvider";
import { IMailProvider } from "./mailProvider/IMailProvider";
import { SESMailProvider } from "./mailProvider/SESMailProvider";
import { IStorageProvider } from "./storageProvider/IStorageProvider";
import { LocalStorageProvider } from "./storageProvider/LocalStorageProvider";
import { S3StorageProvider } from "./storageProvider/S3StorageProvider";

container.registerSingleton<IDateProvider>(
  "DayjsDateProvider",
  DayjsDateProvider
);

const mailProvider = {
  ethereal: container.resolve(EtherealMailProvider),
  ses: container.resolve(SESMailProvider),
};

container.registerInstance<IMailProvider>(
  "MailProvider",
  mailProvider[process.env.MAIL_PROVIDER]
);

const diskStorage = {
  local: LocalStorageProvider,
  S3: S3StorageProvider,
};

container.registerSingleton<IStorageProvider>(
  "StorageProvider",
  diskStorage[process.env.disk]
);
