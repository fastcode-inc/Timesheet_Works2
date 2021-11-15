// import { GeneralListComponent } from './general-list/general-list.component';
// import { GeneralNewComponent } from './general-new/general-new.component';
// import { GeneralDetailsComponent } from './general-details/general-details.component';
// import { FieldsComponent } from './fields/fields.component';

import { GeneralListExtendedComponent } from 'src/app/extended/common/general-components/general-list/general-list.component';
import { GeneralDetailsExtendedComponent } from 'src/app/extended/common/general-components/general-details/general-details.component';
import { GeneralNewExtendedComponent } from 'src/app/extended/common/general-components/general-new/general-new.component';
import { FieldsExtendedComponent } from 'src/app/extended/common/general-components/fields/fields.component';

// export let ListComponent = GeneralListComponent;
// export let DetailsComponent = GeneralDetailsComponent;
// export let NewComponent = GeneralNewComponent;
// export let FieldsComp = FieldsComponent;

export let DetailsComponent = GeneralDetailsExtendedComponent;
export let ListComponent = GeneralListExtendedComponent;
export let NewComponent = GeneralNewExtendedComponent;
export let FieldsComp = FieldsExtendedComponent;

export let GeneralComponents: any[] = [DetailsComponent, NewComponent, ListComponent, FieldsComp];
