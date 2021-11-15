import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'fcclient';
  translationsLoaded: boolean = false;
  constructor(
    public appService: AppService,

    private translate: TranslateService,
    private http: HttpClient
  ) {
    this.http.options(environment.apiUrl + '/auth').subscribe((res) => {
      console.log(res);
    });
    this.getFontFamily();
    let languages = ['en', 'fr'];
    let defaultLang = languages[0];
    translate.addLangs(languages);
    translate.setDefaultLang(defaultLang);

    let browserLang = translate.getBrowserLang();
    let lang;

    let selectedLanguage = localStorage.getItem('selectedLanguage');
    if (selectedLanguage && languages.includes(selectedLanguage)) {
      lang = selectedLanguage;
    } else {
      lang = languages.includes(browserLang) ? browserLang : defaultLang;
      localStorage.setItem('selectedLanguage', lang);
    }

    translate.use(lang);
  }

  ngOnInit() {}

  getFontFamily() {
    this.appService.getFontFamily().subscribe(
      (res) => {
        console.log('res', res);
        let array = res.items;
        let font_string: string = '';
        for (let i = 0; i < array.length; i++) {
          //this.appendLink(array[i].family);
          if (font_string == '') {
            font_string = `${array[i].family}`;
          } else {
            font_string = `${font_string}|${array[i].family}`;
          }
        }
        this.appendLink(font_string);
      },
      (err) => {
        console.log('err', err);
      }
    );
  }
  appendLink(family: any) {
    let headID = document.getElementsByTagName('head')[0];
    let link = document.createElement('link');
    link.type = 'text/css';
    link.rel = 'stylesheet';
    headID.appendChild(link);
    link.href = `https://fonts.googleapis.com/css?family=${family}:300,400,500`;
  }
}
