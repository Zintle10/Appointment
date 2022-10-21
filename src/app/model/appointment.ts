import { Time } from "@angular/common";

export class Appointment {
  constructor(
    public appointmentId: number,
    public employeeId: string,
    public patientId: string,
    public appointmentType: string,
    public appointmentDate: number,
    public appointmentTime: string
  ) {}

}
