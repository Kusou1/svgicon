export interface Options {
    tagName?: string;
    classPrefix?: string;
    isStroke?: boolean;
    isOriginalDefault?: boolean;
    defaultWidth?: string;
    defaultHeight?: string;
}
export interface IconData {
    width?: number | string;
    height?: number | string;
    viewBox: string;
    data: string;
    [key: string]: unknown;
}
export interface Icon {
    name: string;
    data: IconData;
}
interface Props {
    /** icon data */
    data?: Icon;
    width: string;
    height: string;
    scale?: string;
    /** icon direction */
    dir?: string;
    color?: string;
    title?: string;
    fill?: boolean;
    /** is use original color */
    original?: boolean;
}
export default class SvgIcon {
    static options: Options;
    constructor(props: Partial<Props>);
    private _props;
    get props(): Props;
    get colors(): string[];
    get icon(): Icon | undefined;
    get iconData(): IconData | null;
    get clazz(): string;
    get path(): string;
    get box(): string;
    get style(): CSSStyleDeclaration;
    protected addColor(data: string): string;
    protected addOriginalColor(data: string): string;
    protected getValidPathData(pathData: string): string;
    protected setTitle(pathData: string): string;
}
export {};
