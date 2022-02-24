import { Component, OnInit } from '@angular/core';
import { Lancamentos } from '../shared/lancamentos.model';
import { LancamentosService } from '../shared/lancamentos.service';

@Component({
  selector: 'app-lancamentos',
  templateUrl: './lancamentos.component.html',
  styleUrls: ['./lancamentos.component.css']
})
export class LancamentosComponent implements OnInit {

  lancamentos: Lancamentos[];
  isEmpty: boolean;
  isReversed: boolean = false;

  constructor(private lancamentosService: LancamentosService) { }

  ngOnInit(): void {
     this.lancamentos = this.lancamentosService.listarLancamentos();
     if(this.lancamentos.length === 0){
       this.isEmpty = true;
     }
  }

  onNotify(){
    this.lancamentos = this.lancamentosService.listarLancamentos();
    if(this.lancamentos.length > 0){
      this.isEmpty = false;
    }
  }

  delete(id: number): void{
    let confirmaDelete = confirm('Deseja deletar este lançamento?');
    if(!confirmaDelete){
      return;
    }
    this.lancamentosService.delete(id);
    this.lancamentos = this.lancamentosService.listarLancamentos();
    if(this.lancamentos.length === 0){
      this.isEmpty = true;
    }
  }

  reordena(){
    this.lancamentos = this.lancamentos.reverse();
    this.isReversed = !this.isReversed;
  }

}
