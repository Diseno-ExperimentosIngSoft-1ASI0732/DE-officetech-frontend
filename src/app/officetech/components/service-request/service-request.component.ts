import {Component} from '@angular/core';
import {FormControl, Validators, FormsModule, ReactiveFormsModule, FormGroup} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import './service-request.component.css';
import {MatCard} from "@angular/material/card";
import { Directive, ElementRef, HostListener, OnInit } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {CommonModule} from "@angular/common";
import {RequestServiceService} from "../../services/request-service/request-service.service";
import {ActivatedRoute, Router} from "@angular/router";
import {MatOption, MatSelect} from "@angular/material/select";
import {PanelItemsService} from "../../services/panel/panel-items.service";

Directive({
  selector: '[appAutoResize]'
})

@Component({
  selector: 'app-service-request',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatCard,
    MatButtonModule,
    CommonModule,
    MatSelect,
    MatOption
  ],
  templateUrl: './service-request.component.html',
  styleUrl: './service-request.component.css'
})
export class ServiceRequestComponent implements OnInit{
  technician_selected: string = "";
  technicians_available: any[] = [];
  myForm: FormGroup;
  subject: string = '';
  description: string = '';
  date: string = '';
  user_id:string = '';
  type_user:string="";

  private maxHeight = '300px';
  constructor(private elementRef: ElementRef, private requestServiceService : RequestServiceService, private router: Router, private route: ActivatedRoute) {
    this.myForm = new FormGroup({
      subject: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      technician: new FormControl('', Validators.required),
      date: new FormControl('', Validators.required)
    });
  }

  ngOnInit() {
    this.route.params.subscribe(p => {
      this.type_user = p['type_user'];
    })
    this.resize();
    this.user_id = this.router.url.split('/')[3];
    //console.log(this.requestServiceService.getItems(), this.user_id)
    let response = this.requestServiceService.getTechnicians();
    if(response) {
      response.subscribe(technicians => {
        if(technicians)
          this.technicians_available = technicians;
      });
    }
    /*
    this.requestServiceService.getItemCount().subscribe(count => {
      this.cantidadItems = count; // Guarda la cantidad de ítems en la variable cantidadItems
    });*/
  }

  @HostListener('input', ['$event.target'])
  onInput(textArea: HTMLTextAreaElement) {
    this.resize(textArea);
  }

  resize(textArea?: HTMLTextAreaElement) {
    const textarea = textArea || this.elementRef.nativeElement;
    textarea.style.height = 'auto';
    textarea.style.height = `${Math.min(textarea.scrollHeight, parseInt(this.maxHeight, 10))}px`;
  }

  onInputChange(event: any) {
    const inputValue = event.target.value;
    if(inputValue.length == 2 || inputValue.length == 5){
      event.target.value = inputValue + '/';
    }
    /*
    const inputValue = event.target.value;
    const regex = /^[0-9]*$/; // Expresión regular que valida solo números
    if (!regex.test(inputValue)) {
      event.target.value = inputValue.slice(0, -1); // Eliminar el último carácter si no es un número
    }*/
  }


  onPublish() {
    this.subject = this.myForm.get('subject')?.value ?? '';
    this.description = this.myForm.get('description')?.value ?? '';
    this.technician_selected = this.myForm.get('technician')?.value ?? '';
    this.date = this.myForm.get('date')?.value ?? null;
    //this.date= this.formatDate();
    /*
    console.log(this.cantidadItems)
    console.log(this.subject)
    console.log(this.description)
    console.log(this.date)
    */
    this.addNewService()
    this.router.navigate(['/home', this.type_user, this.user_id])
  }

  formatDate(){
    const day = this.date.substring(0, 2);
    const month = this.date.substring(2, 4);
    const year = this.date.substring(4, 8);

    return `${day}/${month}/${year}`;
  }

  addNewService() {
    console.log(this.technician_selected, this.subject, this.description, this.date, this.user_id, this.date)
    const newService = {
      title: this.subject,
      description: this.description,
      estimatePricing: 0,
      date: this.date,
      comment: "",
      companyId: parseInt(this.user_id),
      technicianId: parseInt(this.technician_selected),
      rating: 0
    }

    this.requestServiceService.addService(newService).subscribe(
      r=>console.log(r),
      e=>console.log(e)
    )
    /*
    const newService = {
      id: this.cantidadItems++,
      first: this.subject,
      second: this.description,
      third: 'Active',
      fourth: this.date,
      publisher_id: this.user_id
    };

    this.requestServiceService.addService(newService)
      .subscribe(
        response => console.log('Nuevo servicio agregado:', response),
        error => console.error('Error al agregar el servicio:', error)
      );*/
  }
}
