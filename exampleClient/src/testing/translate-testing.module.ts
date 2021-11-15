import { EventEmitter, Injectable, NgModule, Pipe, PipeTransform } from '@angular/core';
import {
  TranslateFakeLoader,
  TranslateLoader,
  TranslateModule,
  TranslatePipe,
  TranslateService,
} from '@ngx-translate/core';
import { Observable, of } from 'rxjs';

const translations: any = {
  en: {},
  fr: {},
};

export class FakeLoader implements TranslateLoader {
  getTranslation(lang: string): Observable<any> {
    return of(translations);
  }
}

@Pipe({
  name: 'translate',
})
export class TranslatePipeMock implements PipeTransform {
  public name = 'translate';

  public transform(query: string, ...args: any[]): any {
    return query;
  }
}

@Injectable()
export class TranslateServiceStub {
  public onLangChange: EventEmitter<any> = new EventEmitter();
  public onTranslationChange: EventEmitter<any> = new EventEmitter();
  public onDefaultLangChange: EventEmitter<any> = new EventEmitter();
  public get<T>(key: T): Observable<T> {
    return of(key);
  }

  public getLangs() {
    return Object.keys(translations);
  }

  public instant(): string {
    return '';
  }

  public addLangs() {
    return '';
  }

  public setDefaultLang() {
    return '';
  }

  public getBrowserLang() {
    return 'en';
  }

  public use(lang: string) {
    return 'en';
  }
}

@NgModule({
  declarations: [TranslatePipeMock],
  providers: [
    { provide: TranslateService, useClass: TranslateServiceStub },
    { provide: TranslatePipe, useClass: TranslatePipeMock },
  ],
  imports: [
    TranslateModule.forRoot({
      loader: { provide: TranslateLoader, useClass: TranslateFakeLoader },
    }),
  ],
  exports: [TranslatePipeMock, TranslateModule],
})
export class TranslateTestingModule {}
