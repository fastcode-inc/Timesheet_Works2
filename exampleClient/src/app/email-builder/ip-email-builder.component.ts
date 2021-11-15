import { Component, ViewEncapsulation, HostBinding, OnInit, OnDestroy, EventEmitter, Output } from '@angular/core';
import { cloneDeep, isEqual } from 'lodash';
import { DropResult } from 'ngx-smooth-dnd';
import { IpEmailBuilderService } from './ip-email-builder.service';
import { IStructure } from './interfaces';
import { IPDefaultEmail } from './classes/DefaultEmail';
import { Subject, Subscription, BehaviorSubject } from 'rxjs';
import { createWidthHeight, createPadding } from './utils';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from './components/dialog.component';
import { IBlocks } from './classes/Elements';
import { TranslateService } from '@ngx-translate/core';

// https://github.com/kutlugsahin/ngx-smooth-dnd/blob/master/apps/demo/src/pages/cards.ts
@Component({
  selector: 'ip-email-builder',
  templateUrl: './ip-email-builder.component.html',
  styleUrls: ['./ip-email-builder.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class IpEmailBuilderComponent implements OnInit, OnDestroy {
  @HostBinding('style.display')
  display = 'block';

  email: IPDefaultEmail;
  cloneEmail: IPDefaultEmail;
  template: string;

  structures: Set<IStructure>;
  blocks: Set<IBlocks>;
  currentEditingBlock$ = new Subject<object>();
  currentEditingStructure$ = new Subject<object>();
  changeFromService$: Subscription;
  generatingTemplate$: BehaviorSubject<boolean>;

  selectedTabIndex = 0;
  previewTemplate = false;
  filesMap = new Map();

  //getachew
  @Output() onEmailTemplateSave = new EventEmitter();

  constructor(
    private _ngb: IpEmailBuilderService,
    private confirmDialog: MatDialog,
    private translate: TranslateService
  ) {
    this.email = _ngb.Email;
    console.log(this.email);
    this.cloneEmail = cloneDeep(_ngb.Email);
    this.template = _ngb.Template;
    this.structures = _ngb.getSideStructures();
    this.blocks = _ngb.getSideBlocks();

    this.generatingTemplate$ = _ngb.isLoading;

    if (!this.email.structures.length) {
      this.selectedTabIndex = 1;
    }
  }

  private _hasChanges(): Boolean {
    return !isEqual(this.email, this.cloneEmail);
  }

  onSegmentDrop({ addedIndex, removedIndex, payload }: DropResult) {
    let addItem = payload;
    if (removedIndex !== null) {
      addItem = this.email.structures.splice(removedIndex, 1)[0];
    }
    if (addedIndex !== null) {
      this.email.structures.splice(addedIndex, 0, addItem);
    }
  }

  createArrayFromStructureColumns({ columns }): string[] {
    return new Array(columns).fill('');
  }

  getBlockPayload() {
    return (index) => cloneDeep(Array.from(this.blocks)[index]);
  }

  getStructurePayload() {
    return (index) => cloneDeep(Array.from(this.structures)[index]);
  }

  getKeys(object): string[] {
    return Object.keys(object);
  }

  getEmailWidth(): string {
    const { width } = this.email.general;
    return `1 1 ${createWidthHeight(width)}`;
  }

  saveEmail = () => {
    if (!this._hasChanges()) {
      this._ngb.notify(this.translate.instant('EMAIL-BUILDER.MESSAGES.NO-CHANGES'));
      return Promise.reject(this.translate.instant('EMAIL-BUILDER.MESSAGES.NO-CHANGES'));
    } else {
      this.onEmailTemplateSave.emit(JSON.stringify(this._ngb.Email));
    }
  };

  togglePreview(): void {
    if (!this.previewTemplate && this._hasChanges()) {
      this._ngb.notify(this.translate.instant('EMAIL-BUILDER.MESSAGES.UNSAVED-CHANGES-WARNING'));
    } else {
      this.previewTemplate = !this.previewTemplate;
    }
  }

  removeStructure(key) {
    this.confirmDialog
      .open(ConfirmDialogComponent, {
        data: {
          message: this.translate.instant('EMAIL-BUILDER.MESSAGES.DIALOG-TITLE'),
        },
      })
      .afterClosed()
      .subscribe((result) => +result === 1 && this.email.structures.splice(key, 1));
  }

  duplicateStructure(structure, key) {
    this.email.structures.splice(key, 0, cloneDeep(structure));
  }

  getBuilderContainerStyles() {
    const { background, padding, direction } = this.email.general;
    return {
      direction,
      backgroundImage: `url(${background.url})`,
      backgroundRepeat: background.repeat,
      backgroundColor: background.color,
      backgroundSize: createWidthHeight(background.size),
      backgroundPosition: 'top center',
      ...createPadding(padding),
    };
  }

  editStructure(structure) {
    this.selectedTabIndex = 1;
    this.currentEditingStructure$.next(structure);
  }

  editBlock(block) {
    this.selectedTabIndex = 0;
    this.currentEditingBlock$.next(block);
  }

  ngOnInit() {
    this.changeFromService$ = this._ngb.onChanges$().subscribe(([Email, Template]) => {
      this.template = Template;
      this.email = Email;
      this.cloneEmail = cloneDeep(Email);
    });
  }

  ngOnDestroy() {
    this.changeFromService$.unsubscribe();
  }

  onFileChange($event: any, block) {
    block['file'] = $event.target.files[0];
    this.setFileUri($event.target.files[0], block);
  }

  setFileUri(file: File, block) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      block.src = reader.result;
      this.filesMap.set(file, reader.result);
      this.currentEditingBlock$.next(block);
    };
  }
}
