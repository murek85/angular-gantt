import { Injectable } from '@angular/core';

@Injectable()
export class GanttConfig {
    public cellWidth = 76;
    public rowHeight = 30;
    public activityHeight = 420;
    public barHeight = 25;
    public barLineHeight = 35;
    public barMoveable = false;
}
