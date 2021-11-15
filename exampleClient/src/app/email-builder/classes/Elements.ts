import {
  IBlockState,
  ITextBlockOptions,
  IImageBLockOptions,
  IButtonBlockOptions,
  IDividerBlockOptions,
  ISpacerBlockOptions,
} from '../interfaces';
import { defaults } from 'lodash';

export abstract class IpBlock {
  readonly type: string;
  readonly icon: string;

  public options:
    | ITextBlockOptions
    | IImageBLockOptions
    | IButtonBlockOptions
    | IDividerBlockOptions
    | ISpacerBlockOptions
    | object; // Just for socal, is not ready yet!
  public state: IBlockState;
}

export class TextBlock implements IpBlock {
  readonly type = 'text';
  readonly icon = 'text_format';
  options: ITextBlockOptions = {
    color: '#000000',
    font: {
      family: 'Roboto',
      size: 16,
      weight: 400,
    },
    lineHeight: {
      value: 40,
      unit: 'px',
    },
    padding: {
      top: 10,
      right: 25,
      bottom: 10,
      left: 25,
    },
  };

  constructor(
    public innerText?: string,
    options?: ITextBlockOptions,
    public state: IBlockState = {
      disabled: false,
      message: '',
    }
  ) {
    this.options = defaults(options, this.options);
  }
}

export class ImageBlock implements IpBlock {
  readonly type = 'image';
  readonly icon = 'image';
  options: IImageBLockOptions = {
    border: {
      color: '#cccccc',
      style: 'solid',
      width: 0,
      radius: 0,
    },
    width: {
      value: 100,
      unit: 'px',
      auto: true,
      units: ['px'],
    },
    height: {
      value: 100,
      unit: 'px',
      auto: true,
      units: ['px'],
    },
    link: {
      href: '',
      target: '_blank',
    },
    align: 'center',
    title: '',
    padding: {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
    },
  };

  constructor(
    public src: string = 'https://via.placeholder.com/600x200?text=CHANGE+ME',
    options?: IImageBLockOptions,
    public state: IBlockState = {
      disabled: false,
      message: '',
    }
  ) {
    this.options = defaults(options, this.options);
  }
}

export class ButtonBlock implements IpBlock {
  readonly type = 'button';
  readonly icon = 'radio_button_checked';
  options: IButtonBlockOptions = {
    backgroundColor: '#414141',
    border: {
      color: '#414141',
      style: 'solid',
      width: 0,
      radius: 3,
    },
    color: '#ffffff',
    font: {
      family: 'Roboto',
      size: 13,
      style: 'normal',
      weight: 400,
    },

    align: 'center',
    // verticalAlign: 'middle',
    lineHeight: {
      value: 120,
      unit: '%',
    },
    link: {
      href: '',
      target: '_blank',
    },
    innerPadding: {
      top: 10,
      right: 25,
      bottom: 10,
      left: 25,
    },
    padding: {
      top: 10,
      right: 25,
      bottom: 10,
      left: 25,
    },
  };

  constructor(
    public innerText: string = 'Click on me',
    options?: IButtonBlockOptions,
    public state: IBlockState = {
      disabled: false,
      message: '',
    }
  ) {
    this.options = defaults(options, this.options);
  }
}

export class DividerBlock implements IpBlock {
  readonly type = 'divider';
  readonly icon = 'remove';
  options: IDividerBlockOptions = {
    border: {
      color: '#000000',
      style: 'solid',
      width: 4,
    },
    padding: {
      top: 10,
      right: 25,
      bottom: 10,
      left: 25,
    },
  };

  constructor(
    options?: IDividerBlockOptions,
    public state: IBlockState = {
      disabled: false,
      message: '',
    }
  ) {
    this.options = defaults(options, this.options);
  }
}

export class SpacerBlock implements IpBlock {
  readonly type = 'spacer';
  readonly icon = 'vertical_align_center';

  options: ISpacerBlockOptions = {
    height: {
      value: 20,
      unit: 'px',
      units: ['px'],
    },
  };

  constructor(
    options?: ISpacerBlockOptions,
    public state: IBlockState = {
      disabled: false,
      message: '',
    }
  ) {
    this.options = defaults(options, this.options);
  }
}

/**
 * Don't use this class, is not ready yet!
 * @deprecated
 */
export class SocialBlock implements IpBlock {
  readonly type = 'social';
  readonly icon = 'share';

  constructor(
    public networks: object[] = [
      {
        href: '[[SHORT_PERMALINK]]',
        target: '_blank',
        textMode: true,
        name: null, // facebook | google | instagram | pinterest | linkedin | twitter
        padding: {
          top: 10,
          right: 25,
          bottom: 10,
          left: 25,
        },
      },
    ],
    public options = {
      border: {
        radius: 3,
      },
      font: {
        family: 'Roboto',
        size: 13,
      },
      iconSize: '20px',
      lineHeight: {
        value: 22,
        unit: 'px',
      },
      mode: 'horizontal',
      text: {
        decoration: 'none',
      },
      align: 'center',
      color: '#333333',
      innerPadding: {
        top: 10,
        right: 25,
        bottom: 10,
        left: 25,
      },
      padding: {
        top: 10,
        right: 25,
        bottom: 10,
        left: 25,
      },
    },
    public state: IBlockState = {
      disabled: false,
      message: '',
    }
  ) {
    this.options = defaults(options, this.options);
  }
}

export type IBlocks = TextBlock | ImageBlock | ButtonBlock | DividerBlock | SpacerBlock;
