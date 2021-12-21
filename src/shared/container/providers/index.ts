import { container } from "tsyringe";
import { DayjsDateProvider } from "./dateProvider/DayjsDateProvider";
import { IDateProvider } from "./dateProvider/IDateProvider";
import { EtherealMailProvider } from "./mailProvider/EtherealMailProvider";
import { IMailProvider } from "./mailProvider/IMailProvider";

container.registerSingleton<IDateProvider>("DayjsDateProvider", DayjsDateProvider);

container.registerInstance<IMailProvider>("EtherealMailProvider", new EtherealMailProvider());