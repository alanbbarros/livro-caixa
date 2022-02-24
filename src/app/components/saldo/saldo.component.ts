import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Lancamentos } from '../shared/lancamentos.model';
import { LancamentosService } from '../shared/lancamentos.service';

@Component({
  selector: 'app-saldo',
  templateUrl: './saldo.component.html',
  styleUrls: ['./saldo.component.css']
})
export class SaldoComponent implements OnInit {

  saldo: number;
  lancamentos: Lancamentos[];

  constructor(private lancamentosService: LancamentosService) { }

  ngOnInit(): void {
    this.lancamentosService.saldoAtual.subscribe(saldo => this.saldo = saldo);
    this.lancamentosService.lancamentosAtual.subscribe(lancamentos => this.lancamentos = lancamentos )
    this.lancamentosService.iniciaSaldo();
    this.lancamentos = this.lancamentosService.listarLancamentos();
  }

}
