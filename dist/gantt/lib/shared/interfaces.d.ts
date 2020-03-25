export interface Project {
    id?: string;
    name: string;
    startDate?: Date;
    tasks: Task[];
}
export interface Task {
    id: string;
    name: string;
    resource?: string;
    start: Date;
    end?: Date;
    status?: string;
}
export interface IGanttOptions {
    scale?: IScale;
}
export interface IScale {
    start?: Date;
    end?: Date;
}
export interface IBarStyle {
    status: string;
    backgroundColor: string;
    border: string;
    progressBackgroundColor: string;
}
