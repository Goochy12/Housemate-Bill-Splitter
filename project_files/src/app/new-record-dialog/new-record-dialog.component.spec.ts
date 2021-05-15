import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewRecordDialogComponent } from './new-record-dialog.component';

describe('NewRecordDialogComponent', () => {
  let component: NewRecordDialogComponent;
  let fixture: ComponentFixture<NewRecordDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewRecordDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewRecordDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
