import * as he from "he";

const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;

export class Util {
  
  static subDays(reviewDate: number, createDate: number) {
    const review = Util.getDateFromNumber(reviewDate);
    const create = Util.getDateFromNumber(createDate);

    const timeDiff = Math.abs(review.getTime() - create.getTime());
    const diffDays = Math.ceil(timeDiff / MILLISECONDS_PER_DAY);
    return diffDays;
  }

  static formatDate(date: Date): number {
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const year = date.getFullYear();

    return year * 10000 + month * 100 + day;
  }

  static getReviewDays(today: number) {
    const date = Util.getDateFromNumber(today);

    return {
      b1: Util.addDays(date, -1),
      b2: Util.addDays(date, -2),
      b4: Util.addDays(date, -4),
      b7: Util.addDays(date, -7),
      b15: Util.addDays(date, -15),
      m1: Util.addDays(date, -30),
      m2: Util.addDays(date, -60),
      m3: Util.addDays(date, -90)
    };
  }

  private static getDateFromNumber(today: number) {
    const yyyy = today / 10000;
    const month = ((today / 100) % 100) - 1;
    const day = today % 100;
    const date = new Date(yyyy, month, day, 0, 0, 0, 0);
    return date;
  }

  static addDays(date: Date, days: number): number {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return Util.formatDate(result);
  }

  static getTitle(content: string): string {
    if (!content) {
      return "";
    }
    const stripedHtml = content.replace(/<[^>]+>/g, "");
    let title = he.decode(stripedHtml);
    title = title.replace(/\s\s+/g, " ");
    if (title.length > 100) {
      title = title.substr(0, 100);
    }
    return title;
  }

  static getNeedReviewDays(kpCreateDate: number): number {
    const yyyy = kpCreateDate / 10000;
    const month = ((kpCreateDate / 100) % 100) - 1;
    const day = kpCreateDate % 100;
    const date = new Date(yyyy, month, day, 0, 0, 0, 0);

    const today = this.formatDate(new Date());
    if (today >= Util.addDays(date, 90)) {
      return 8;
    } else if (today >= Util.addDays(date, 60)) {
      return 7;
    } else if (today >= Util.addDays(date, 30)) {
      return 6;
    } else if (today >= Util.addDays(date, 15)) {
      return 5;
    } else if (today >= Util.addDays(date, 7)) {
      return 4;
    } else if (today >= Util.addDays(date, 4)) {
      return 3;
    } else if (today >= Util.addDays(date, 2)) {
      return 2;
    }

    return 1;
  }
}
