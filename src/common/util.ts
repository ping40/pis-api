export class Util {
  
  static formatDate(date: Date): number {
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const year = date.getFullYear();

    return year * 10000 + month * 100 + day;
  }
}
