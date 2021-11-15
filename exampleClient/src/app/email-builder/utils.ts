import { IFont, IPadding, IBorder, ILineHeight, IWidthHeight, IBackground } from './interfaces';

export const createBorder = (
  { color = '#000000', style = 'solid', width = 4, radius = 0 }: IBorder,
  rule = 'border'
) => {
  return {
    [rule]: `${width}px ${style} ${color}`,
    borderRadius: `${radius}px`,
  };
};

export const createPadding = ({ top = 10, right = 25, bottom = 10, left = 25 }: IPadding, rule = 'padding') => {
  return {
    [rule]: `${top}px ${right}px ${bottom}px ${left}px`,
  };
};

export const createFont = ({ family = '', size = 13, style = 'normal', weight = 'normal' }: IFont) => {
  return {
    fontFamily: family,
    fontSize: `${size}px`,
    fontStyle: style,
    fontWeight: weight,
  };
};

export const createLineHeight = ({ value = 22, unit = 'px' }: ILineHeight) => {
  return {
    lineHeight: unit !== 'none' ? `${value}${unit}` : 'normal',
  };
};

export const createBackground = ({ url = '', color = 'white', repeat = 'no-repeat' }: IBackground): string => {
  return `${color} ${url && `url(${url})`} ${repeat} top center`;
};

export const createWidthHeight = ({ value = 100, unit = '%', auto = false }: IWidthHeight) => {
  return (auto && 'auto') || (['%', 'px'].indexOf(unit) > -1 && `${value}${unit}`) || unit;
};
