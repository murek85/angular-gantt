export interface Project {
    name: string;
    startDate?: Date;
    tasks: Task[];
}
export interface Task {
    name: string;
    resource?: string;
    description?: string;
    start: Date;
    end?: Date;
    color?: any;
}
export interface IGanttOptions {
    scale?: IScale;
}
export interface IScale {
    start?: Date;
    end?: Date;
}
