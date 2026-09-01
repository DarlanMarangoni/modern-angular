import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MessageService } from 'primeng/api';

import { Investimentos } from './investimentos';

describe('Investimentos', () => {
  let component: Investimentos;
  let fixture: ComponentFixture<Investimentos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Investimentos],
      providers: [MessageService]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Investimentos);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
