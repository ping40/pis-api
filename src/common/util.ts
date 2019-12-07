export class Util {

  static formatDate(date: Date): number {
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const year = date.getFullYear();

    return year * 10000 + month * 100 + day;
  }

  static getReviewDays(today: number) {
    const yyyy = today / 10000;
    const month = (today / 100) % 100 - 1;
    const day = today  % 100;
    const date = new Date(yyyy, month, day , 0, 0, 0, 0);

    return {
      b1: Util.addDays(date, -1),
      b2: Util.addDays(date, -2),
      b4: Util.addDays(date, -4),
      b7: Util.addDays(date, -7),
      b15: Util.addDays(date, -15),
      m1: Util.addDays(date, -30),
      m2: Util.addDays(date, -60),
      m3: Util.addDays(date, -90),
    };
  }

  static addDays(date: Date, days: number): number {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return Util.formatDate(result);
  }
}
