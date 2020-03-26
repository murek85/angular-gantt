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
    gridColumns?: IGridColumn[];
}

export interface IScale {
    start?: Date;
    end?: Date;
}

export interface IGridColumn {
    name?: string;
    left: number;
    width: number;
}
