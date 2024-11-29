import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddcarPage } from './addcar.page';

describe('AddcarPage', () => {
  let component: AddcarPage;
  let fixture: ComponentFixture<AddcarPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AddcarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
