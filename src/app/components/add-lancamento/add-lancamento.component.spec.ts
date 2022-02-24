import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLancamentoComponent } from './add-lancamento.component';

describe('AddLancamentoComponent', () => {
  let component: AddLancamentoComponent;
  let fixture: ComponentFixture<AddLancamentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddLancamentoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddLancamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
