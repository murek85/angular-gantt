import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatCardModule } from '@angular/material';
import { MdePopoverModule } from '@material-extended/mde';

import { GanttActivityComponent } from './gantt-activity.component';
import { GanttTimeScaleComponent } from './time-scale/gantt-time-scale.component';
import { GanttActivityBackgroundComponent } from './background/activity-background.component';
import { GanttActivityBarsComponent } from './bars/activity-bars.component';

@NgModule({
    imports: [
        CommonModule,
        MatCardModule,
        MdePopoverModule
    ],
    exports: [
        GanttActivityComponent,
        GanttTimeScaleComponent,
        GanttActivityBackgroundComponent,
        GanttActivityBarsComponent
    ],
    declarations: [
        GanttActivityComponent,
        GanttTimeScaleComponent,
        GanttActivityBackgroundComponent,
        GanttActivityBarsComponent
    ],
    providers: [],
})
export class GanttActivityModule { }
