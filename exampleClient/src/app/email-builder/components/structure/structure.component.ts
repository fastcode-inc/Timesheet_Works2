import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { IStructure } from '../../interfaces';
import { DropResult } from 'ngx-smooth-dnd';
import { Structure } from '../../classes/Structure';
import { createBorder, createPadding, createWidthHeight } from '../../utils';
import { cloneDeep } from 'lodash';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../dialog.component';
import { TranslateService } from '@ngx-translate/core';
import { IpEmailBuilderService } from '../../ip-email-builder.service';
import { EmailVariableService } from '../../email-editor/email-variable/email-variable.service';

@Component({
  selector: 'ip-structure',
  templateUrl: './structure.component.html',
  styleUrls: ['./structure.component.scss'],
})
export class StructureComponent implements OnInit {
  showField: boolean = false;
  errorMessage: any;
  @Input('structure')
  structure: IStructure = new Structure();

  @Output()
  blockClick: EventEmitter<object> = new EventEmitter(true);

  editingBlock;

  constructor(
    private confirmDialog: MatDialog,
    private translate: TranslateService,
    private _ngb: IpEmailBuilderService,
    private emailVariableService: EmailVariableService
  ) {
    _ngb.MergeTags = new Set([]);
  }

  onBlockDrop(column, { removedIndex, addedIndex, payload }: DropResult) {
    if (removedIndex !== null) {
      column.splice(removedIndex, 1);
    }
    if (addedIndex !== null) {
      column.splice(addedIndex, 0, payload);
    }
  }

  getBlockPayload(column) {
    return (index) => {
      return column[index];
    };
  }

  getStructureStyles() {
    const { border, background, padding } = this.structure.options;
    return {
      // direction,
      backgroundImage: `url(${background.url})`,
      backgroundRepeat: background.repeat,
      backgroundColor: background.color,
      backgroundSize: createWidthHeight(background.size),
      backgroundPosition: 'top center',
      ...createBorder(border),
      ...createPadding(padding),
    };
  }

  editBlock(block) {
    this.editingBlock = block;
    this.blockClick.emit(block);
  }

  dublicateBlock(key, column, block) {
    column.splice(key, 0, cloneDeep(block));
  }

  removeBlock(key, column) {
    this.confirmDialog
      .open(ConfirmDialogComponent, {
        data: {
          message: this.translate.instant('COMPONENTS.STRUCTURE.REMOVE-BLOCK-MESSAGE'),
        },
      })
      .afterClosed()
      .subscribe((result) => +result === 1 && column.splice(key, 1));
  }

  ngOnInit() {
    const { elements, columns } = this.structure;
    if (!elements.length) {
      this.structure.elements = Array.from({ length: columns }, () => []);
    }

    this.emailVariableService.getAllWithoutPagination().subscribe(
      (items) => {
        let tags = items.map((item) => item.propertyName);
        this._ngb.MergeTags = new Set(tags);
      },
      (error) => (this.errorMessage = <any>error)
    );
  }
}
