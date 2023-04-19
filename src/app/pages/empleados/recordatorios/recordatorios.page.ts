import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';



@Component({
  selector: 'app-recordatorios',
  templateUrl: './recordatorios.page.html',
  styleUrls: ['./recordatorios.page.scss'],
})
export class RecordatoriosPage implements OnInit {

  form_notas: FormGroup;

  recordatorios: string[] = [];
  nombre: string = '';

  constructor(public fb: FormBuilder) {
    this.form_notas = this.fb.group({
      'nota': new FormControl("", Validators.required)
    })
  }

  ngOnInit() { }

  crearNota() {
    var f = this.form_notas.value;
    this.nombre = f.nota;

    this.recordatorios.push(this.nombre);
  }

  doReorder(event: any) {
    console.log(event);

    const itemMover = this.recordatorios.splice(event.detail.from, 1)[0];
    this.recordatorios.splice(event.detail.to, 0, itemMover);


    event.detail.complete();
  }

}
