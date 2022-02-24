import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Lancamentos } from '../shared/lancamentos.model';
import { FormGroup, NgForm,  FormControl, FormArray, FormBuilder } from '@angular/forms';
import { LancamentosService } from '../shared/lancamentos.service';

@Component({
  selector: 'app-add-lancamento',
  templateUrl: './add-lancamento.component.html',
  styleUrls: ['./add-lancamento.component.css']
})
export class AddLancamentoComponent implements OnInit {

  @Input() lancamentos: Lancamentos;
  @Output() notify = new EventEmitter();

  formLancamento: FormGroup;
  lancamento: Lancamentos;

  constructor(
    private lancamentosService: LancamentosService) { }

  ngOnInit(): void {
    this.lancamento = new Lancamentos();
  }

  adicionar($event): void{
    $event.preventDefault();
    
    if(!this.lancamento.title || !this.lancamento.value || !this.lancamento.type){
      alert('Preencha todos os campos');
      return;
    }
    else if(this.lancamento.value < 0){
      alert('Apenas valores positivos');
      return;
    }
    else{
      this.lancamentosService.adicionar(this.lancamento);
    }
    
  }

}
