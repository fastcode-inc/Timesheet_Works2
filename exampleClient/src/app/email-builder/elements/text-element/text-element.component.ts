import { Component, Input, OnInit } from '@angular/core';
import { TextBlock } from '../../classes/Elements';
import { createPadding, createFont, createLineHeight } from '../../utils';
import { IpEmailBuilderService } from '../../ip-email-builder.service';
import { EmailVariableService } from '../../email-editor/email-variable/email-variable.service';

@Component({
  selector: 'ip-text-element',
  templateUrl: './text-element.component.html',
  styleUrls: ['./text-element.component.scss'],
})
export class TextElementComponent implements OnInit {
  showActive: boolean;
  errorMessage: any;
  quillEditorRef: any;
  showDropDown: boolean = true;
  @Input()
  block: TextBlock = new TextBlock('Text from inside a component');

  constructor(
    private ngjs: IpEmailBuilderService,
    private emailVariableService: EmailVariableService,
    private _ngb: IpEmailBuilderService
  ) {
    _ngb.MergeTags = new Set(['tag22']);
  }

  getTextStyles() {
    const { color, font, lineHeight, padding } = this.block.options;

    return {
      color,
      ...createLineHeight(lineHeight),
      ...createFont(font),
      ...createPadding(padding),
    };
  }

  getEditorInstance(editorInstance: any) {
    this.quillEditorRef = editorInstance;
  }

  getQuillConfig() {
    const container: Array<Array<object | string>> = [
      ['bold', 'italic', 'underline', 'strike'],
      [{ header: 1 }, { header: 2 }],
      [{ size: ['small', false, 'large', 'huge'] }, { align: [] }],
      [{ color: [] }, { background: [] }],
      [{ direction: 'rtl' }, 'link'],
    ];

    return {
      toolbar: {
        container,
        handlers: {
          placeholder(selector: string) {
            var selectorTxt = selector ? '{{' + selector + '}}' : selector;
            const range = this.quill.getSelection();
            const format = this.quill.getFormat();
            const text = this.quill.getText(range.index, range.length);
            this.quill.deleteText(range.index, text.length);
            this.quill.insertText(range.index, selectorTxt, format);
            this.quill.setSelection(range.index, selector.length);
          },
        },
      },
    };
  }

  alterText(data: string) {
    if (this.showActive) {
      var selectorTxt = data ? data + '}}' : data;
    } else {
      var selectorTxt = data ? '{{' + data + '}}' : data;
    }
    const range = this.quillEditorRef.getSelection(true);
    if (range != null) {
      const format = this.quillEditorRef.getFormat();
      const text = this.quillEditorRef.getText(range.index, range.length);
      this.quillEditorRef.deleteText(range.index, text.length);
      this.quillEditorRef.insertText(range.index, selectorTxt, format, 'user');
      this.quillEditorRef.setSelection(range.index, selectorTxt.length);
    } else {
      const format = this.quillEditorRef.getFormat();
      this.quillEditorRef.insertText(0, selectorTxt, format, 'user');
      this.quillEditorRef.setSelection(0, selectorTxt.length);
    }
    this.showActive = false;
  }

  ngOnInit() {
    // this.emailVariableService.getAll(null, 0, 20).subscribe(
    //   items => {
    //     let tags = items.map(item => item.propertyName);
    //     this._ngb.MergeTags = new Set(tags);
    //   },
    //   error => this.errorMessage = <any>error
    // );

    this.emailVariableService.getAllWithoutPagination().subscribe(
      (items) => {
        let tags = items.map((item) => item.propertyName);
        this._ngb.MergeTags = new Set(tags);
      },
      (error) => (this.errorMessage = <any>error)
    );
  }

  insertVariable(event) {
    this.showDropDown = false;
    this.alterText(event.target.innerText);
    console.log(event);
    this.hideVariables('subject4-variable');
    setTimeout(() => {
      this.showDropDown = true;
    }, 500);
  }

  getContent(data) {
    if (data && data.text && this.quillEditorRef != null && this.quillEditorRef.getSelection() != null) {
      let pos = this.quillEditorRef.getSelection().index;

      if ('{{' == data.text.substring(pos - 2, pos)) {
        //here I need to add the hover class
        this.showActive = true;
      } else {
        this.showActive = false;
      }
    }
  }

  showHideVariables(subject3Variable: string) {
    const comboElement = document.getElementById(subject3Variable) as any;

    if (comboElement.classList.contains('show')) {
      comboElement.classList.remove('show');
    } else {
      comboElement.classList.add('show');
    }
    return false;
  }
  hideVariables(subject3Variable: string) {
    const comboElement = document.getElementById(subject3Variable) as any;

    if (comboElement.classList.contains('show')) {
      comboElement.classList.remove('show');
    } else {
      comboElement.classList.add('show');
      comboElement.classList.remove('show');
    }
    return false;
  }
}
