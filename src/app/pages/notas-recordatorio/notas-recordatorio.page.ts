import { Component, OnInit } from '@angular/core';
import { AlertController, NavController, Platform } from '@ionic/angular';
import { NotasService } from 'src/app/services/notas.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-notas-recordatorio',
  templateUrl: './notas-recordatorio.page.html',
  styleUrls: ['./notas-recordatorio.page.scss'],
})
export class NotasRecordatorioPage implements OnInit {

  notas: any[];
  textoBuscar: string = '';

  constructor(
    public navCtrl: NavController,
    public notasService: NotasService,
    public platform: Platform,
    public alertController: AlertController,
    private httpClient: HttpClient
  ) {

  };

  ngOnInit() {
    this.getNotas();
  }

  ionViewWillEnter() {
    this.getNotas();
  }

  busquedaChange(event) {
    this.textoBuscar = event.detail.value;
  }

  crearNota() {
    this.navCtrl.navigateForward(['/crear-nota']);
  }

  //----------------------------------------------------------------
  // GET: Obtener usuario de la base de datos
  //----------------------------------------------------------------

  getNotas() {
    this.notasService.getNotas().subscribe(
      (data: any) => {
        this.notas = data;
      },
      (error) => {
        console.error(error);
      }
    )
  }








}
