import { IBlocks } from './classes/Elements';

export interface ILibraryRootConfg {
  xApiKey: string;
  apiPath?: string;
}

export interface ITestEmail {
  to: string;
  from?: string;
  subject?: string;
}

export interface IMjmlServerResponse {
  html: string;
  errors: string[];
}

export type TStructreTypes = 'cols_1' | 'cols_2' | 'cols_3' | 'cols_4' | 'cols_12' | 'cols_21';
export type TDirection = 'ltr' | 'rtl';
export type TUnits = '%' | 'px' | 'cover' | 'contain';
export type TAlign = 'left' | 'center' | 'right';
export type TLineHeight = '%' | 'px' | 'none';
export type TLinkTarget = '_blank' | '_self' | '_parent' | '_top';
export type TFontStyle = 'italic' | 'normal' | 'oblique';
export type TFontWeight = number | 'bold' | 'bolder' | 'inherit' | 'initial' | 'light' | 'normal';
export type TBackgroundRepeat = 'no-repeat' | 'repeat' | 'repeat-x' | 'repeat-y' | 'round' | 'space';

export interface IBorder {
  color: string;
  style: string;
  width: number;
  radius?: number;
}

export interface IPadding {
  top: number;
  right: number;
  bottom: number;
  left: number;
}

export interface IWidthHeight {
  value: number;
  unit: TUnits;
  auto?: boolean;
  units?: TUnits[];
}

export interface IBackground {
  color: string;
  url?: string;
  repeat?: TBackgroundRepeat;
  size?: IWidthHeight;
}

export interface IFont {
  family: string;
  size: number;
  style?: TFontStyle;
  weight?: TFontWeight;
}

export type IFontFamily = Map<string, string>;

export interface ILineHeight {
  value: number;
  unit: TLineHeight;
}

export interface ILink {
  href: string;
  target: TLinkTarget;
}

export interface IStructureOptions {
  border: IBorder;
  background: IBackground;
  padding: IPadding;
  // direction: TDirection;
}

export interface IStructure {
  readonly type: TStructreTypes;
  options: IStructureOptions;
  elements: IBlocks[][];
  readonly columns: number;
}

export interface IBlockState {
  disabled: boolean;
  message: string;
}

export interface ITextBlockOptions {
  color?: string;
  font?: IFont;
  lineHeight?: ILineHeight;
  padding?: IPadding;
}

export interface IImageBLockOptions {
  border?: IBorder;
  width?: IWidthHeight;
  height?: IWidthHeight;
  link?: ILink;
  align?: TAlign;
  title?: string;
  padding?: IPadding;
}

export interface IButtonBlockOptions {
  backgroundColor?: string;
  border?: IBorder;
  color?: string;
  font?: IFont;
  align?: TAlign;
  lineHeight?: ILineHeight;
  link?: ILink;
  innerPadding?: IPadding;
  padding?: IPadding;
}

export interface IDividerBlockOptions {
  border?: IBorder;
  padding?: IPadding;
}

export interface ISpacerBlockOptions {
  height?: IWidthHeight;
}

export interface IGeneralOptions {
  width?: IWidthHeight;
  background?: IBackground;
  padding?: IPadding;
  direction?: TDirection;
  global?: {
    padding?: IPadding;
  };
}

export interface IIPDefaultEmail {
  general?: IGeneralOptions;
  structures?: IStructure[];
}
