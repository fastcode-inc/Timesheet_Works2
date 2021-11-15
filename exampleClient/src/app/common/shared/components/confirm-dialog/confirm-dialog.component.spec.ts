import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { ConfirmDialogComponent } from './confirm-dialog.component';
import { TestingModule } from 'src/testing/utils';

describe('ConfirmDialogComponent', () => {
  let component: ConfirmDialogComponent;
  let fixture: ComponentFixture<ConfirmDialogComponent>;

  describe('', () => {
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [ConfirmDialogComponent],
        imports: [TestingModule],
        providers: [
          { provide: MAT_DIALOG_DATA, useValue: {} },
          { provide: MatDialogRef, useValue: { close: (dialogResult: any) => {} } },
        ],
      }).compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(ConfirmDialogComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });
  });
  describe('', () => {
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [ConfirmDialogComponent],
        imports: [TestingModule],
        providers: [
          { provide: MAT_DIALOG_DATA, useValue: { confirmationType: 'delete' } },
          { provide: MatDialogRef, useValue: { close: (dialogResult: any) => {} } },
        ],
      }).compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(ConfirmDialogComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should be created with confirmation type delete', () => {
      expect(component).toBeTruthy();
    });
  });
});
