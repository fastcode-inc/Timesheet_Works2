export interface ITimesheetdetails {
  hours?: number;
  id: number;
  notes?: string;
  workdate: Date;

  taskDescriptiveField?: number;
  taskid?: number;
  timeofftypeDescriptiveField?: number;
  timeofftypeid?: number;
  timesheetDescriptiveField?: number;
  timesheetid: number;
}
