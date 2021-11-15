import { DateUtils } from './date-utils';

describe('Generic API DateUtils', () => {
  it('should combineDateAndTime for date with am time', async () => {
    spyOn(DateUtils, 'getHoursAndMinutes').and.returnValue({ hours: 9, minutes: 23 });
    const amDate = DateUtils.combineDateAndTime('10/17/2019', '09:23 AM');

    expect(amDate).toEqual(new Date('2019-10-17T09:23:00'));
  });

  it('should combineDateAndTime for date with pm time', async () => {
    spyOn(DateUtils, 'getHoursAndMinutes').and.returnValue({ hours: 21, minutes: 23 });
    const pmDate = DateUtils.combineDateAndTime('10/17/2019', '09:23 PM');

    expect(pmDate).toEqual(new Date('2019-10-17T21:23:00'));
  });

  it('should combineDateAndTime for date with 12 am time', async () => {
    spyOn(DateUtils, 'getHoursAndMinutes').and.returnValue({ hours: 0, minutes: 0 });
    const amDate = DateUtils.combineDateAndTime('10/17/2019', '12:00 AM');

    expect(amDate).toEqual(new Date('2019-10-17T00:00:00'));
  });

  it('should return hours and minutes from 12am time string', () => {
    let timestr = '12:00:am';
    let ham = DateUtils.getHoursAndMinutes(timestr);

    expect(ham.hours).toEqual(0);
    expect(ham.minutes).toEqual(0);
  });

  it('should return hours and minutes from am time string', () => {
    let timestr = '09:15:am';
    let ham = DateUtils.getHoursAndMinutes(timestr);

    expect(ham.hours).toEqual(9);
    expect(ham.minutes).toEqual(15);
  });

  it('should return hours and minutes from pm time string', () => {
    let timestr = '09:15:pm';
    let ham = DateUtils.getHoursAndMinutes(timestr);

    expect(ham.hours).toEqual(21);
    expect(ham.minutes).toEqual(15);
  });

  it('should return null from formatDateStringToAMPM when called with null date', () => {
    let ham = DateUtils.formatDateStringToAMPM(null);
    expect(ham).toEqual(null);
  });

  it('should return formatted string for the date with 12 am time', () => {
    let date = new Date();
    date.setHours(0);
    date.setMinutes(15);
    let ham = DateUtils.formatDateStringToAMPM(date);

    expect(ham).toEqual('12:15 am');
  });

  it('should return formatted string for the date with am time', () => {
    let date = new Date();
    date.setHours(2);
    date.setMinutes(5);
    let ham = DateUtils.formatDateStringToAMPM(date);

    expect(ham).toEqual('2:05 am');
  });

  it('should return formatted string for the date with pm time', () => {
    let date = new Date();
    date.setHours(22);
    date.setMinutes(15);
    let ham = DateUtils.formatDateStringToAMPM(date);

    expect(ham).toEqual('10:15 pm');
  });

  it('should return formatted string for the time with single digit hours/minutes', () => {
    spyOn(DateUtils, 'getHoursAndMinutes').and.returnValue({ hours: 9, minutes: 5 });
    let formattedStr = DateUtils.getFormattedTime('9:05 am');
    expect(formattedStr).toEqual('09:05:00');
  });

  it('should return formatted string for the time with double digit hours/minutes', () => {
    spyOn(DateUtils, 'getHoursAndMinutes').and.returnValue({ hours: 21, minutes: 15 });
    let formattedStr = DateUtils.getFormattedTime('9:15 pm');
    expect(formattedStr).toEqual('21:15:00');
  });
});
