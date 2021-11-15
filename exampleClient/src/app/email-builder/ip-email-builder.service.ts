import { Injectable, Inject, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, combineLatest, throwError } from 'rxjs';
import { catchError, retry, tap, distinctUntilChanged } from 'rxjs/operators';
import { IStructure, IFontFamily, ITestEmail, IMjmlServerResponse } from './interfaces';
import { IPDefaultEmail } from './classes/DefaultEmail';
import { Structure } from './classes/Structure';
import { cloneDeep, isEqual } from 'lodash';
import {
  TextBlock,
  ImageBlock,
  ButtonBlock,
  DividerBlock,
  SpacerBlock,
  SocialBlock,
  IBlocks,
} from './classes/Elements';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ILibraryRootConfg } from '../common/shared';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class IpEmailBuilderService implements OnInit {
  private _email = new BehaviorSubject(new IPDefaultEmail());
  //getachew
  private _originalEmail = cloneDeep(this.Email);

  private _template = new BehaviorSubject<string>('');
  private _fontFamily: IFontFamily = new Map([
    ['Open Sans', 'https://fonts.googleapis.com/css?family=Open+Sans:300,400,500,700'],
    ['Droid Sans', 'https://fonts.googleapis.com/css?family=Droid+Sans:300,400,500,700'],
    ['Lato', 'https://fonts.googleapis.com/css?family=Lato:300,400,500,700'],
    ['Roboto', 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700'],
    ['Ubuntu', 'https://fonts.googleapis.com/css?family=Ubuntu:300,400,500,700'],
  ]);
  private _mergeTags = new Set<string>();
  private _emailMergeTags = new Set<string>();
  private _subjectMergeTags = new Set<string>();

  /**
   * Private read-only Structures from aside!
   */
  private readonly _structures: Set<IStructure> = new Set([
    new Structure(),
    new Structure('cols_2'),
    new Structure('cols_3'),
    new Structure('cols_4'),
    new Structure('cols_12'),
    new Structure('cols_21'),
  ]);

  /**
   * Private read-only Blocks from aside!
   */
  private readonly _blocks: Set<any> = new Set([
    new TextBlock(),
    new ImageBlock(),
    new ButtonBlock(),
    new DividerBlock(),
    new SpacerBlock(),
    new SocialBlock(null, null, { disabled: true, message: 'Not ready yet!' }),
  ]);

  isLoading = new BehaviorSubject(false);

  constructor(private _http: HttpClient, public snackBar: MatSnackBar) {}

  private handleError(error: HttpErrorResponse) {
    this.isLoading.next(false);
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(`Backend returned code ${error.status}, ` + `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError('Something bad happened; please try again later.');
  }

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Api-Key': environment.emailConfig.xApiKey,
    });
  }

  /**
   * Send request to generate HTML Output
   */
  sendRequest(): Promise<IMjmlServerResponse> {
    this.isLoading.next(true);

    return this._http
      .post<IMjmlServerResponse>(environment.emailConfig.apiPath + '/mail', this._email.value, {
        headers: this.getHeaders(),
      })
      .pipe(
        distinctUntilChanged(),
        retry(3),
        tap(({ html, errors }: IMjmlServerResponse) => {
          this.Template = html;
          this.isLoading.next(false);
          this.notify('Template has been saved');
          if (errors.length) {
            console.log(errors);
          }
        }),
        catchError(this.handleError)
      )
      .toPromise();
  }

  /**
   * Send test email
   * @param opts Options to send test email
   */
  sendTestEmail(opts: ITestEmail): Promise<{ error: object | null }> {
    if (!this._template.value.length) {
      this.notify('Please save email in order to test it!');
      return Promise.reject('No template source found.');
    }
    this.isLoading.next(true);
    return this._http
      .post<{ error: object | null }>(
        `${environment.emailConfig.apiPath}/mail`,
        { ...opts, html: this._template.value },
        { headers: this.getHeaders() }
      )
      .pipe(
        distinctUntilChanged(),
        retry(3),
        tap(({ error }) => {
          this.isLoading.next(false);
          if (error) {
            this.notify('It seems to be an error, try to change your email ID.');
          } else {
            this.notify('Test email has been sent. Can be in Junk Folder!', 'Thanks', 10000);
          }
        }),
        catchError(this.handleError)
      )
      .toPromise();
  }

  /**
   * Create a simple notifiation
   * @param msg string
   * @param close string
   * @param duration number
   * @param data object
   */
  notify(msg: string, close = 'Dismiss', duration = 3000, data = null) {
    this.snackBar.open(msg, close, { duration, data });
  }
  /**
   * Get Email as object
   * @returns Object
   */
  get Email(): IPDefaultEmail {
    return this._email.value;
  }

  /**
   * Set Email saved from database or created with new IPDefaultEmail()
   */
  set Email(email: IPDefaultEmail) {
    this._email.next(email);
  }

  //getachew
  get OriginalEmail(): IPDefaultEmail {
    return this._originalEmail['value'];
  }
  //getachew
  get IsChanged(): boolean {
    return !isEqual(this._email, this._originalEmail);
  }
  /**
   * Get HTML output
   */
  set Template(template: string) {
    this._template.next(template);
  }

  /**
   * Set HTML Output
   */
  get Template(): string {
    return this._template.value;
  }

  /**
   * Listen Email changes
   */
  getEmailAsObservalble$(): Observable<IPDefaultEmail> {
    return this._email.asObservable();
  }

  /**
   * Listen Template changes
   */
  getTemplateAsObservale$(): Observable<string> {
    return this._template.asObservable();
  }

  /**
   * Listen Email and Template chabges
   * @returns [IPDefaultEmail, string]
   */
  onChanges$(): Observable<[IPDefaultEmail, string]> {
    return combineLatest(this.getEmailAsObservalble$(), this.getTemplateAsObservale$());
  }

  /**
   * Get Set of Structures from aside
   * @returns Set<IStructure>
   */
  getSideStructures(): Set<IStructure> {
    return this._structures;
  }

  /**
   * Get Set of Blocks from aside
   * @returns Set<IStructure>
   */
  getSideBlocks(): Set<IBlocks> {
    return this._blocks;
  }

  /**
   * Get a Map of fonts family
   * @returns Set<IStructure>
   */
  getFonts(): IFontFamily {
    return this._fontFamily;
  }

  get MergeTags(): Set<string> {
    return this._mergeTags;
  }

  set MergeTags(tags: Set<string>) {
    this._mergeTags = tags;
  }

  get EmailMergeTags(): Set<string> {
    return this._emailMergeTags;
  }

  set EmailMergeTags(tags: Set<string>) {
    this._emailMergeTags = tags;
  }

  get SubjectMergeTags(): Set<string> {
    return this._subjectMergeTags;
  }

  set SubjectMergeTags(tags: Set<string>) {
    this._subjectMergeTags = tags;
  }

  ngOnInit() {}
}
