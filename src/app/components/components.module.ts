import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LancamentosComponent } from './lancamentos/lancamentos.component';
import { AddLancamentoComponent } from './add-lancamento/add-lancamento.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LancamentosService } from './shared/lancamentos.service';
import { RouterModule } from '@angular/router';
import { SaldoComponent } from './saldo/saldo.component';



@NgModule({
  declarations: [
    LancamentosComponent,
    AddLancamentoComponent,
    SaldoComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule
  ],
  exports: [
    LancamentosComponent,
    AddLancamentoComponent,
    SaldoComponent
  ],
  providers:[
    LancamentosService
  ],
})
export class ComponentsModule { }
