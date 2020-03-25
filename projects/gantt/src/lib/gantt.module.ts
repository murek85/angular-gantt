import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { GanttComponent } from './gantt.component';
import { GanttHeaderComponent } from './header/gantt-header.component';
import { GanttFooterComponent } from './footer/gantt-footer.component';
import { GanttService } from './shared/services/gantt.service';
import { GanttActivityModule } from './activity/gantt-activity.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        GanttActivityModule,
    ],
    exports: [
        GanttComponent
    ],
    declarations: [
        GanttComponent,
        GanttHeaderComponent,
        GanttFooterComponent
    ],
    providers: [GanttService],
})
export class GanttModule { }
