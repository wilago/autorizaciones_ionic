import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NoaprobadoPage } from './noaprobado.page';

describe('NoaprobadoPage', () => {
  let component: NoaprobadoPage;
  let fixture: ComponentFixture<NoaprobadoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoaprobadoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NoaprobadoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
