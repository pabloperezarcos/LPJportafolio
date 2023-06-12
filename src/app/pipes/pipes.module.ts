import { NgModule } from "@angular/core";
import { FiltroPipe } from "./filtro.pipe";
import { FiltroNotasPipe } from './filtro-notas.pipe';

@NgModule ({
    declarations: [
        FiltroPipe,
        FiltroNotasPipe
    ],
    exports: [
        FiltroPipe,
        FiltroNotasPipe
    ]
})
export class PipesModule { }