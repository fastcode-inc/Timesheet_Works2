import { IStructure, TStructreTypes, IStructureOptions } from '../interfaces';
import { IBlocks } from '../classes/Elements';

export class Structure implements IStructure {
  columns = 1;
  constructor(
    readonly type: TStructreTypes = 'cols_1',
    public elements: IBlocks[][] = [],
    public options: IStructureOptions = {
      border: {
        color: '#cccccc',
        style: 'solid',
        width: 0,
        radius: 0,
      },
      background: {
        color: '#ffffff',
        url: '',
        repeat: 'repeat',
        size: {
          value: 100,
          unit: 'px',
          auto: true,
          units: ['px', '%', 'cover', 'contain'],
        },
      },
      padding: {
        top: 20,
        right: 0,
        bottom: 20,
        left: 0,
      },
      // direction: 'inherit'
    }
  ) {
    if (!elements.length) {
      if (type === 'cols_2' || type === 'cols_12' || type === 'cols_21') {
        this.columns = 2;
      } else if (type === 'cols_3') {
        this.columns = 3;
      } else if (type === 'cols_4') {
        this.columns = 4;
      }
    }
  }
}
