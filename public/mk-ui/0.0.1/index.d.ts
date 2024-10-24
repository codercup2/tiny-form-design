import { JSX as JSX_2 } from 'react/jsx-runtime';

/**
 * CalendarV1 component
 * @category image-text
 */
export declare function CalendarV1({ name, subtitle, endTime, title, content }: ICalendarV1Props): JSX_2.Element;

/**
 * HeroV1 component
 * @category hero
 */
export declare function HeroV1({ title, description, image, activeButton, shareButton }: IHeroV1Props): JSX_2.Element;

/**
 * 页面布局 公共属性
 */
declare interface IBaseProps {
    /**
     * 页面标题
     * @component i18n-text
     */
    title: string;
    /**
     * 页面描述
     * @component i18n-rich-text
     */
    description: string;
}

export declare interface ICalendarV1Props {
    name: string;
    subtitle: string;
    title: string;
    content: string;
    /**
     * @hidden
     */
    endTime?: Date;
}

export declare interface IHeroV1Props {
    title: string;
    description: string;
    image: string;
    activeButton: string;
    shareButton: string;
}

export declare interface IPlHeroTopProps extends IBaseProps {
    /**
     * @hidden
     */
    title: string;
    /**
     * @hidden
     */
    description: string;
    /**
     * 头图插槽
     * @max 1
     * @allow #hero
     */
    hero: React.ReactNode;
    /**
     * @disallow #hero
     */
    children: React.ReactNode;
}

/**
 * 默认页面布局组件
 * @category page-layout
 */
export declare function PlHeroTop(props: IPlHeroTopProps): JSX_2.Element;

export { }
