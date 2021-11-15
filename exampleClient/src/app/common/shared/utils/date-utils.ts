export class DateUtils {
  public static combineDateAndTime(date: string, time: string): Date {
    let tmpDate = new Date(date);
    let ham = this.getHoursAndMinutes(time);
    tmpDate.setHours(ham.hours ? ham.hours : 0);
    tmpDate.setMinutes(ham.minutes ? ham.minutes : 0);
    return tmpDate;
  }

  public static getHoursAndMinutes(time: string) {
    let hours: number = parseInt(time.substring(0, 2));
    let minutes = parseInt(time.substring(3, 5));
    let ampm = time.substring(6, 8) ? time.substring(6, 8) : 'am';
    if (ampm.toLocaleLowerCase() == 'pm') {
      hours = hours + 12;
    } else if (ampm.toLocaleLowerCase() == 'am' && hours === 12) {
      hours = 0;
    }
    return { hours: hours, minutes: minutes };
  }

  public static formatDateStringToAMPM(d: any) {
    if (d) {
      let date = new Date(d);
      let hours = date.getHours();
      let minutes = date.getMinutes();
      let ampm = hours >= 12 ? 'pm' : 'am';
      hours = hours % 12;
      hours = hours ? hours : 12; // the hour '0' should be '12'
      let minutes_str = minutes < 10 ? '0' + minutes : minutes;
      let strTime = hours + ':' + minutes_str + ' ' + ampm;
      return strTime;
    }
    return null;
  }

  public static getFormattedTime(time: string) {
    let ham = this.getHoursAndMinutes(time);
    let hours = ham.hours > 9 ? ham.hours.toString() : '0' + ham.hours.toString();
    let minutes = ham.hours > 9 ? ham.minutes.toString() : '0' + ham.minutes.toString();
    return `${hours}:${minutes}:00`;
  }
}
