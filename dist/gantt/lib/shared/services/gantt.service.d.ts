import { Task, IScale } from '../interfaces';
export declare class GanttService {
    rowHeight: number;
    hourCellWidth: number;
    hoursCellWidth: number;
    cellWidth: number;
    windowInnerWidth: number;
    activityHeight: number;
    barHeight: number;
    barLineHeight: number;
    barTop: number;
    barMoveable: boolean;
    gridWidth: number;
    gridHeight: number;
    TASK_CACHE: any[];
    TIME_SCALE: any[];
    MONTH_SCALE: any[];
    constructor();
    private calculateBarWidth;
    private calculateBarLeft;
    /** Calculates the height of the gantt grid, activity and vertical scroll */
    calculateGanttHeight(): string;
    private calculateBarLeftDelta;
    /** Calculate the bar styles */
    calculateBar(task: any, index: number, scale: any): {
        'top': string;
        'left': string;
        'height': string;
        'line-height': string;
        'width': string;
        'background-color': any;
        'border-left': any;
    };
    /** Get the bar style based on task status */
    private getBarStyle;
    /** Calculates the difference in two dates and returns number of days */
    calculateDiffDays(start: Date, end: Date): number;
    /** Calculate the gantt scale range given the start and end date of tasks*/
    calculateScale(start?: Date, end?: Date): any[];
    calculateMonthScale(start?: Date, end?: Date): any[];
    /** Determines whether given date is a weekend */
    isDayWeekend(date: Date): boolean;
    /** Add x number of days to a date object */
    addDays(date: Date, days: number): Date;
    removeDays(date: Date, days: number): Date;
    /** Calculates the grid scale for gantt based on tasks start and end dates */
    calculateGridScale(tasks: Task[]): IScale;
    getComputedStyle(element: any, attribute: any): number;
    calculateContainerWidth(): number;
    calculateContainerHeight(): number;
    calculateActivityContainerDimensions(): any;
    calculateGanttActivityWidth(elem: HTMLElement): any;
    calculateGanttActivityHeight(elem: HTMLElement): any;
    calculateCellMonthWidth(minDate: Date, maxDate: Date): any[];
    private calculateDiffMonths;
    /** Set the vertical scroll top positions for gantt */
    scrollTop(verticalScrollElem: any, ganttGridElem: any, ganttActivityAreaElem: any): void;
    /** Group data by id , only supports one level*/
    groupData(tasks: any): any;
    /** Checks whether any new data needs to be added to task cache  */
    doTaskCheck(tasks: any[], scale: any): boolean;
    /** Set a id prefix so CSS3 query selector can work with ids that contain numbers */
    setIdPrefix(id: string): string;
    /** Set the scroll top property of a native DOM element */
    setScrollTop(scrollTop: number, element: any): void;
}
