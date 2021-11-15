import { IStructure, IIPDefaultEmail, IGeneralOptions } from '../interfaces';
import { Structure } from './Structure';

export class Defaults {
  constructor(
    public structures: IStructure[] = [new Structure()],
    public general: IGeneralOptions = {
      width: {
        value: 600,
        unit: 'px',
        units: ['px'],
      },
      background: {
        // url: '',
        color: '#cccccc',
        // repeat: 'repeat',
        size: {
          value: 100,
          unit: '%',
          auto: true,
          units: ['px', '%', 'cover', 'contain'],
        },
      },
      padding: {
        top: 16,
        right: 10,
        bottom: 10,
        left: 10,
      },
      direction: 'ltr',
      global: {
        // TODO Add more global configurations
        padding: {
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
        },
      },
    }
  ) {}
}

export class IPDefaultEmail extends Defaults {
  constructor({ structures, general }: IIPDefaultEmail = {}) {
    super(structures, general);
  }
}
