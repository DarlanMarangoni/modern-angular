import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MessageService } from 'primeng/api';

import { Proventos } from './proventos';

describe('Proventos', () => {
  let component: Proventos;
  let fixture: ComponentFixture<Proventos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Proventos],
      providers: [MessageService]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Proventos);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
