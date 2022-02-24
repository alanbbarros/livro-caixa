import { Injectable } from '@angular/core';
import { Lancamentos } from './lancamentos.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LancamentosService {
  
  saldoCache = null;
  private saldo = new BehaviorSubject<number>(this.saldoCache ? this.saldoCache : 0);
  saldoAtual = this.saldo.asObservable();

  private lancamentos = new BehaviorSubject<Lancamentos[]>(this.listarLancamentos())
  lancamentosAtual = this.lancamentos.asObservable()

  constructor() {}

  mudaLancamentos(lancamentos: Lancamentos[]){
    this.lancamentos.next(lancamentos)
  }

  mudaSaldo(saldo: number){
    this.saldo.next(saldo)
  }

  iniciaSaldo(){ //recupera o saldo em caso de f5 na página
    let lancamentos = this.listarLancamentos();
    if(lancamentos.length === 0){
      this.mudaSaldo(0)
    }
    else{
      let saldo = 0;
      lancamentos.forEach((lancamento, index, array) =>{
        if(lancamento.type === 'Entrada'){
          saldo = saldo + lancamento.value;
        }
        else if(lancamento.type === 'Saída'){
          saldo = saldo - lancamento.value;
        }
      })
      this.mudaSaldo(saldo)
    }
  }


  listarLancamentos(): Lancamentos[]{
    const lancamentos = localStorage['lancamentos'];
    return lancamentos ? JSON.parse(lancamentos) : [];
  }

  delete(id: number): void{
    let lancamentos: Lancamentos[] = this.listarLancamentos();
    let valorDescontado = lancamentos[id].value;
    let saldoAtual = this.saldo.getValue();
    
    let novoSaldo: number;
    if(lancamentos[id].type === 'Entrada'){
      novoSaldo = saldoAtual - valorDescontado
    }
    else{
      novoSaldo = saldoAtual + valorDescontado
    }

    this.mudaSaldo(novoSaldo)
    lancamentos = lancamentos.filter((lancamento, index) => index !== id);
    localStorage['lancamentos'] = JSON.stringify(lancamentos);
    localStorage['saldo'] = JSON.stringify(novoSaldo)
    this.mudaLancamentos(lancamentos)
  }

  calculaSaldo(lancamento: Lancamentos){
    let calc = this.saldo.getValue()
    if(lancamento.type==='Entrada'){
      calc = calc + lancamento.value
    }
    else if(lancamento.type==='Saída'){
      calc = calc - lancamento.value
    }
    this.mudaSaldo(calc)
    localStorage['saldo'] = JSON.stringify(calc)
  }

  dataLancamento(): string{ //formatação de data para display na tabela
    let dataLancamento = new Date();
    let anoLancamento = dataLancamento.getFullYear()
    let mesLancamento = dataLancamento.getMonth() < 10 ? '0'+ (dataLancamento.getMonth()+1) : dataLancamento.getMonth()+1
    let diaLancamento = dataLancamento.getDate() < 10 ? '0'+ dataLancamento.getDate() : dataLancamento.getDate();
    let horaLancamento = dataLancamento.getHours() < 10 ? '0'+dataLancamento.getHours() : dataLancamento.getHours();
    let minutoLancamento = dataLancamento.getMinutes() < 10 ? '0'+ dataLancamento.getMinutes() : dataLancamento.getMinutes();
    let segundoLancamento = dataLancamento.getSeconds() < 10 ? '0'+ dataLancamento.getSeconds() : dataLancamento.getSeconds();

    return `${diaLancamento}/${mesLancamento}/${anoLancamento} ${horaLancamento}:${minutoLancamento}:${segundoLancamento} `
  }

  adicionar(lancamento: Lancamentos){
    let lancamentos = this.listarLancamentos();
    lancamento.date = this.dataLancamento();
    lancamentos.unshift(lancamento);
    this.calculaSaldo(lancamento);
    this.mudaLancamentos(lancamentos);
    localStorage['lancamentos'] = JSON.stringify(lancamentos);
    lancamento.title = '';
    lancamento.type = null;
    lancamento.value = null;
  }


}
