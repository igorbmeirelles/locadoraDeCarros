import { IDateProvider } from "./IDateProvider";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc)

class DayjsDateProvider implements IDateProvider {

  compareInHours(start_date: Date, end_date: Date): number {
    const stat_date_utc = this.convertToUtc(start_date);
    const end_date_utc = this.convertToUtc(end_date);

    return dayjs(end_date_utc).diff(stat_date_utc, 'hours');
  }

  compareInDays(start_date: Date, end_date: Date): number {
    const stat_date_utc = this.convertToUtc(start_date);
    const end_date_utc = this.convertToUtc(end_date);
    
    return dayjs(end_date_utc).diff(stat_date_utc, 'days');
  }

  convertToUtc(date: Date): string {
      return dayjs(date).utc().local().format();
  }

  dateNow(): Date {
    return dayjs().toDate();
  }
}

export { DayjsDateProvider };