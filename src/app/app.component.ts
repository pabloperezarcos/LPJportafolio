import { Component } from '@angular/core';
import { Componente } from 'src/app/interfaces/interfaces';
import { DataService } from 'src/app/services/data.service';
import { Observable } from 'rxjs';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  components: Observable<Componente[]>;

  constructor( private menuCtrl : MenuController,
              private dataService: DataService) { }

  ngOnInit() {
    this.components = this.dataService.getMenuOpts();
  }

}

