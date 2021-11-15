export interface ITimesheet {
  id: number;
  notes?: string;
  periodendingdate: Date;
  periodstartingdate: Date;

  timesheetstatusDescriptiveField?: number;
  timesheetstatusid: number;
  usersDescriptiveField?: number;
  userid: number;
}
