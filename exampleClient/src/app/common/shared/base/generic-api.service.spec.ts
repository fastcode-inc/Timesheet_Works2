import { TestBed } from '@angular/core/testing';

import { DummyService, IDummy } from '../base/dummy/index';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from 'src/environments/environment';

describe('Generic API Service', () => {
  const data: IDummy[] = [
    {
      id: 1,
      name: 'name1',
      parentId: 1,
      parentDescriptiveField: 'parent1',
    },
    {
      id: 2,
      name: 'name2',
      parentId: 1,
      parentDescriptiveField: 'parent1',
    },
  ];

  const item: IDummy = data[0];
  const child = { id: 1, dummyId: 1 };

  let service: DummyService;
  let httpMock: HttpTestingController;
  let url: string = environment.apiUrl + '/dummy';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });

    service = TestBed.inject(DummyService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should return single Dummy item against passed id', () => {
    service.getById(item.id).subscribe((response) => {
      expect(response).toEqual(item);
    });

    const req = httpMock.expectOne((req) => req.method === 'GET' && req.url === url + '/' + item.id);
    req.flush(item);
  });

  it('should return list of Dummy items', () => {
    service.getAll().subscribe((response) => {
      expect(response).toEqual(data);
    });

    const req = httpMock.expectOne((req) => req.method === 'GET' && req.url === url);
    req.flush(data);
  });

  it('should create item', () => {
    service.create(item).subscribe((response) => {
      expect(response).toEqual(item);
    });

    const req = httpMock.expectOne((req) => req.method === 'POST' && req.url === url);
    req.flush(item);
  });

  it('should update item', () => {
    service.update(item, item.id).subscribe((response) => {
      expect(response).toEqual(item);
    });

    const req = httpMock.expectOne((req) => req.method === 'PUT' && req.url === url + '/' + item.id);
    req.flush(item);
  });

  it('should delete item', () => {
    service.delete(item.id).subscribe((response) => {
      expect(response).toEqual(null);
    });

    const req = httpMock.expectOne((req) => req.method === 'DELETE' && req.url === url + '/' + item.id);
    req.flush(item);
  });

  it('should call delete api', () => {
    let sampleUrl = 'sampleDelete';
    service.deleteByUrl(sampleUrl).subscribe((response) => {
      expect(response).toEqual(null);
    });

    const req = httpMock.expectOne(
      (req) => req.method === 'DELETE' && req.url === environment.apiUrl + '/' + sampleUrl
    );
    req.flush(null);
  });

  it('should call get api', () => {
    let sampleUrl = 'sampleUrl';
    service.get(sampleUrl).subscribe((response) => {
      expect(response).toEqual(item);
    });

    const req = httpMock.expectOne((req) => req.method === 'GET' && req.url === environment.apiUrl + '/' + sampleUrl);
    req.flush(item);
  });

  it('should call post api', () => {
    let sampleUrl = 'sampleUrl';
    service.post(sampleUrl, item).subscribe((response) => {
      expect(response).toEqual(item);
    });

    const req = httpMock.expectOne((req) => req.method === 'POST' && req.url === environment.apiUrl + '/' + sampleUrl);
    req.flush(item);
  });

  it('should return list of associated items', () => {
    service.getAssociations('child', 1).subscribe((response) => {
      expect(response).toEqual(data);
    });

    const req = httpMock.expectOne((req) => req.method === 'GET' && req.url === url + '/1/child');
    req.flush(data);
  });

  it('should return list of available associated items', () => {
    service.getAvailableAssociations('child', 1).subscribe((response) => {
      expect(response).toEqual(data);
    });

    const req = httpMock.expectOne((req) => req.method === 'GET' && req.url === url + '/1/availableChild');
    req.flush(data);
  });

  it('should return child item', () => {
    service.getChild('child', 1).subscribe((response) => {
      expect(response).toEqual(child);
    });

    const req = httpMock.expectOne((req) => req.method === 'GET' && req.url === url + '/1/child');
    req.flush(child);
  });

  it('should combineDateAndTime for date with am time', async () => {
    spyOn(service, 'getHoursAndMinutes').and.returnValue({ hours: 9, minutes: 23 });
    const amDate = service.combineDateAndTime('10/17/2019', '09:23 AM');

    expect(amDate).toEqual(new Date('2019-10-17T09:23:00'));
  });

  it('should combineDateAndTime for date with pm time', async () => {
    spyOn(service, 'getHoursAndMinutes').and.returnValue({ hours: 21, minutes: 23 });
    const pmDate = service.combineDateAndTime('10/17/2019', '09:23 PM');

    expect(pmDate).toEqual(new Date('2019-10-17T21:23:00'));
  });

  it('should combineDateAndTime for date with 12 am time', async () => {
    spyOn(service, 'getHoursAndMinutes').and.returnValue({ hours: 0, minutes: 0 });
    const amDate = service.combineDateAndTime('10/17/2019', '12:00 AM');

    expect(amDate).toEqual(new Date('2019-10-17T00:00:00'));
  });

  it('should return hours and minutes from 12am time string', () => {
    let timestr = '12:00:am';
    let ham = service.getHoursAndMinutes(timestr);

    expect(ham.hours).toEqual(0);
    expect(ham.minutes).toEqual(0);
  });

  it('should return hours and minutes from am time string', () => {
    let timestr = '09:15:am';
    let ham = service.getHoursAndMinutes(timestr);

    expect(ham.hours).toEqual(9);
    expect(ham.minutes).toEqual(15);
  });

  it('should return hours and minutes from pm time string', () => {
    let timestr = '09:15:pm';
    let ham = service.getHoursAndMinutes(timestr);

    expect(ham.hours).toEqual(21);
    expect(ham.minutes).toEqual(15);
  });

  it('should return null from formatDateStringToAMPM when called with null date', () => {
    let ham = service.formatDateStringToAMPM(null);
    expect(ham).toEqual(null);
  });

  it('should return formatted string for the date with 12 am time', () => {
    let date = new Date();
    date.setHours(0);
    date.setMinutes(15);
    let ham = service.formatDateStringToAMPM(date);

    expect(ham).toEqual('12:15 am');
  });

  it('should return formatted string for the date with am time', () => {
    let date = new Date();
    date.setHours(2);
    date.setMinutes(5);
    let ham = service.formatDateStringToAMPM(date);

    expect(ham).toEqual('2:05 am');
  });

  it('should return formatted string for the date with pm time', () => {
    let date = new Date();
    date.setHours(22);
    date.setMinutes(15);
    let ham = service.formatDateStringToAMPM(date);

    expect(ham).toEqual('10:15 pm');
  });

  it('should return formatted string for the time with single digit hours/minutes', () => {
    spyOn(service, 'getHoursAndMinutes').and.returnValue({ hours: 9, minutes: 5 });
    let formattedStr = service.getFormattedTime('9:05 am', false);
    expect(formattedStr).toEqual('09:05:00');
  });

  it('should return formatted string for the time with double digit hours/minutes', () => {
    spyOn(service, 'getHoursAndMinutes').and.returnValue({ hours: 21, minutes: 15 });
    let formattedStr = service.getFormattedTime('9:15 pm', false);
    expect(formattedStr).toEqual('21:15:00');
  });

  it('should propagate error response in case of server side error', () => {
    service.getAll().subscribe(null, (errorMessage: any) => {
      expect(errorMessage.length).toBeGreaterThan(0);
    });

    const req = httpMock.expectOne((req) => req.method === 'GET' && req.url === url);
    req.flush('Invalid request parameters', {
      status: 404,
      statusText: 'Bad Request',
    });
  });

  it('should propagate error response in case of client side error', () => {
    service.getAll().subscribe(null, (errorMessage: any) => {
      expect(errorMessage.length).toBeGreaterThan(0);
    });

    httpMock.expectOne((req) => req.method === 'GET' && req.url === url).error(new ErrorEvent('network error'));
  });
});
