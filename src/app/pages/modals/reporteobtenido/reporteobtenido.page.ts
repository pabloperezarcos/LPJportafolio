import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import * as XLSX from 'xlsx';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { EmpleadosService } from 'src/app/services/empleados.service';

@Component({
  selector: 'app-reporteobtenido',
  templateUrl: './reporteobtenido.page.html',
  styleUrls: ['./reporteobtenido.page.scss'],
})
export class ReporteobtenidoPage implements OnInit {

  report: any;

  constructor(
    private modalCtrl: ModalController,
    private socialSharing: SocialSharing,
    private empleadosService: EmpleadosService
  ) {
    pdfMake.vfs = pdfFonts.pdfMake.vfs;
  }

  ngOnInit() {
  }

/*   generarPDF() {
    const documentDefinition = {
      content: [
        { text: 'Reporte de Asistencias', style: 'header' },
        { text: 'Empleado: ' + this.obtenerNombreEmpleado(this.selectedEmployee), style: 'subheader' },
        { text: 'Fecha: ' + this.selectedDate.toDateString(), style: 'subheader' },
        { text: '\n' },
         this.generateTable() 
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          alignment: 'center'
        },
        subheader: {
          fontSize: 14,
          bold: true,
          alignment: 'center'
        },
        tableHeader: {
          bold: true,
          alignment: 'center'
        }
      }
    }; */

/*     const pdf = pdfMake.createPdf(documentDefinition);
    pdf.download('reporte_asistencias.pdf');
  } */

  generarExcel() {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.report.entries);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, 'reporte_asistencias.xlsx');
  }

  saveAsExcelFile(buffer: any, fileName: string) {
    const data: Blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    const url: string = window.URL.createObjectURL(data);
    const link: HTMLAnchorElement = document.createElement('a');
    link.href = url;
    link.download = fileName;
    link.click();
  }

/*   async compartirReporte() {
    const actionSheet = await this.actionSheetCtrl.create({
      buttons: [
        {
          text: 'Compartir por WhatsApp',
          icon: 'logo-whatsapp',
          handler: () => {
            this.socialSharing.shareViaWhatsApp(null, null, null);
          }
        },
        {
          text: 'Compartir por Gmail',
          icon: 'logo-google',
          handler: () => {
            this.socialSharing.shareViaEmail(null, 'Reporte de Asistencias', null, null, null, null);
          }
        },
        {
          text: 'Cancelar',
          icon: 'close',
          role: 'cancel'
        }
      ]
    });

    await actionSheet.present();
  } */

/*   async obtenerNombreEmpleado(rutempleado: string) {
    try {
      const empleados = await this.empleadosService.getEmpleados().toPromise();
      const empleado = empleados.find((e: any) => e.rut === rutempleado);
      if (empleado) {
        return empleado.nombre;
      } else {
        return '';
      }
    } catch (error) {
      console.error('Error al obtener el nombre del empleado', error);
      return '';
    }
  } */



  cerrar() {
    this.modalCtrl.dismiss();
  }


}
