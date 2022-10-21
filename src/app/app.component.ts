import {Component, OnInit} from '@angular/core';
import {Appointment} from "./model/appointment";
import {AppointmentService} from "./service/appointmentService";
import {HttpErrorResponse} from "@angular/common/http";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Appointment';
  public appointments: Appointment[] | undefined;
  public view: number | undefined;

  appointmentModelDefault = new Appointment(0, "", "", "", Date.now(), "");
  appointmentModel = this.appointmentModelDefault;

  constructor(private service: AppointmentService) { }

  ngOnInit() {
    this.getAllAppointments();
    this.changeView(0);
  }

  public getAllAppointments(): void {
    this.service.getAll().subscribe(
      (response: Appointment[]) => {
          this.appointments = response;
          console.log(response);
          },
      (error: HttpErrorResponse) => {
        alert("Error while retrieving appointments.\n" + error)
      }
    );
  }

  public changeView(x: number){
    this.view = x;
  }

  public deleteEntry(id: number){
    this.service.deleteAppointment(id).subscribe(
      (response: boolean) => {
        alert("Appointment deleted.");
        this.getAllAppointments();
      },
      (error: HttpErrorResponse) => {
        alert("Error while trying to delete Appointment. \n" + error);
      }
    );
  }

  public onSubmit(form: NgForm){
    console.log(this.appointmentModel);
    this.service.addAppointment(this.appointmentModel).subscribe(
      (response: Appointment) => {
        alert("Appointment Saved.");
        this.getAllAppointments();
        form.resetForm();
      },
      (error: HttpErrorResponse) => {
        alert("Error while trying to Save Appointment. \n" + error);
      }
    );
  }

  public edit(appointment: Appointment){
    this.appointmentModel = appointment;
  }
}
