import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Appointment} from "../model/appointment";

@Injectable({
  providedIn: "root"
})
export class AppointmentService{
  private apiServiceUrl = "http://localhost:8080/appointment";

  constructor(private  http: HttpClient) { }

  public addAppointment(appointment: Appointment): Observable<Appointment> {
    return this.http.post<Appointment>(`${this.apiServiceUrl}/save`, appointment);
  }

  public updateAppointment(appointment: Appointment): Observable<Appointment> {
    return this.http.post<Appointment>(`${this.apiServiceUrl}/update`, appointment);
  }

  public deleteAppointment(appointmentId: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.apiServiceUrl}/delete/${appointmentId}`);
  }

  public getAll(): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(`${this.apiServiceUrl}/get-all`);
  }

  public findAppointment(appointmentId: number): Observable<Appointment> {
    return this.http.get<Appointment>(`${this.apiServiceUrl}/find/${appointmentId}`);
  }
}
