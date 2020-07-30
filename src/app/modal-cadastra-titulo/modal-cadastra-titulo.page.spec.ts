import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ModalCadastraTituloPage } from './modal-cadastra-titulo.page';

describe('ModalCadastraTituloPage', () => {
  let component: ModalCadastraTituloPage;
  let fixture: ComponentFixture<ModalCadastraTituloPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalCadastraTituloPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ModalCadastraTituloPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
