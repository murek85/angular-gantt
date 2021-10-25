import { Component, Input } from '@angular/core';
import { GanttService } from '../../shared/services/gantt.service';
import * as i0 from "@angular/core";
import * as i1 from "../../shared/services/gantt.service";
import * as i2 from "@angular/common";
function GanttTimeScaleComponent_div_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 3);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "date");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const date_r2 = ctx.$implicit;
    const i_r3 = ctx.index;
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵproperty("ngClass", i_r3 % 2 ? "weekend" : "")("ngStyle", ctx_r0.setTimescaleWeekendCellStyle());
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(2, 3, date_r2, "dd-MM"));
} }
function GanttTimeScaleComponent_div_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 3);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const i_r5 = ctx.index;
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵproperty("ngClass", i_r5 % 2 ? "weekend" : "")("ngStyle", ctx_r1.setTimescaleWeekendCellStyle());
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(i_r5 + 1);
} }
export class GanttTimeScaleComponent {
    constructor(ganttService) {
        this.ganttService = ganttService;
    }
    ngOnInit() {
    }
    setTimescaleStyle() {
        return {
            'width': (this.dimensions.width + 36) + 'px'
        };
    }
    setTimescaleMonthLineStyle(borderTop) {
        return {
            'height': this.ganttService.rowHeight + 'px',
            'line-height': this.ganttService.rowHeight + 'px',
            'position': 'relative',
            'border-top': borderTop
        };
    }
    setTimescaleMonthCellStyle() {
        return {
            'width': this.ganttService.cellWidth + 'px'
        };
    }
    setTimescaleWeekendLineStyle(borderTop) {
        return {
            'height': this.ganttService.rowHeight + 'px',
            'line-height': this.ganttService.rowHeight + 'px',
            'position': 'relative',
            'border-top': borderTop
        };
    }
    setTimescaleWeekendCellStyle() {
        return {
            'width': this.ganttService.cellWidth + 'px'
        };
    }
    isDayWeekend(date) {
        return this.ganttService.isDayWeekend(date);
    }
}
/** @nocollapse */ GanttTimeScaleComponent.ɵfac = function GanttTimeScaleComponent_Factory(t) { return new (t || GanttTimeScaleComponent)(i0.ɵɵdirectiveInject(i1.GanttService)); };
/** @nocollapse */ GanttTimeScaleComponent.ɵcmp = i0.ɵɵdefineComponent({ type: GanttTimeScaleComponent, selectors: [["time-scale"]], inputs: { timeScaleMonth: "timeScaleMonth", timeScaleWeekend: "timeScaleWeekend", dimensions: "dimensions", scale: "scale" }, features: [i0.ɵɵProvidersFeature([
            GanttService
        ])], decls: 5, vars: 5, consts: [[1, "time-scale", 3, "ngStyle"], [1, "time-scale-line", 3, "ngStyle"], ["class", "time-scale-cell", 3, "ngClass", "ngStyle", 4, "ngFor", "ngForOf"], [1, "time-scale-cell", 3, "ngClass", "ngStyle"]], template: function GanttTimeScaleComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "div", 0);
        i0.ɵɵelementStart(1, "div", 1);
        i0.ɵɵtemplate(2, GanttTimeScaleComponent_div_2_Template, 3, 6, "div", 2);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(3, "div", 1);
        i0.ɵɵtemplate(4, GanttTimeScaleComponent_div_4_Template, 2, 3, "div", 2);
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
    } if (rf & 2) {
        i0.ɵɵproperty("ngStyle", ctx.setTimescaleStyle());
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngStyle", ctx.setTimescaleWeekendLineStyle("none"));
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngForOf", ctx.timeScaleWeekend);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngStyle", ctx.setTimescaleWeekendLineStyle("none"));
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngForOf", ctx.timeScaleWeekend);
    } }, directives: [i2.NgStyle, i2.NgForOf, i2.NgClass], pipes: [i2.DatePipe], styles: [".weekend[_ngcontent-%COMP%] {\n            background-color: whitesmoke;\n        }\n        .time-scale[_ngcontent-%COMP%] {\n            font-size: 12px;\n            background-color: #fff;\n            border-bottom: 1px solid #cecece;\n        }\n        .time-scale-line[_ngcontent-%COMP%] {\n            box-sizing: border-box;\n            border-bottom: 1px solid #cecece;\n        }\n        .time-scale-line[_ngcontent-%COMP%]:first-child {\n            border-top: none;\n        }\n        .time-scale-cell[_ngcontent-%COMP%] {\n            display: inline-block;\n            white-space: nowrap;\n            overflow: hidden;\n            border-right: 1px solid #cecece;\n            text-align: center;\n            height: 100%;\n        }"] });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(GanttTimeScaleComponent, [{
        type: Component,
        args: [{
                selector: 'time-scale',
                template: `
        <div class="time-scale" [ngStyle]="setTimescaleStyle()">
            <!--<div class="time-scale-line" [ngStyle]="setTimescaleMonthLineStyle('none')">
                <div class="time-scale-cell" *ngFor="let scale of timeScaleMonth; let i = index"
                    [ngClass]="(i % 2) ? 'weekend' : ''" [style.width.px]="scale.width">{{scale.start | date: 'dd-MM'}}</div>
            </div>-->
            <div class="time-scale-line" [ngStyle]="setTimescaleWeekendLineStyle('none')">
                <div class="time-scale-cell" *ngFor="let date of timeScaleWeekend; let i = index"
                    [ngClass]="(i % 2) ? 'weekend' : ''" [ngStyle]="setTimescaleWeekendCellStyle()">{{date | date: 'dd-MM'}}</div>
            </div>
            <div class="time-scale-line" [ngStyle]="setTimescaleWeekendLineStyle('none')">
                <div class="time-scale-cell" *ngFor="let date of timeScaleWeekend; let i = index"
                [ngClass]="(i % 2) ? 'weekend' : ''" [ngStyle]="setTimescaleWeekendCellStyle()">{{i + 1}}</div>
            </div>
        </div>`,
                styles: [`
        .weekend {
            background-color: whitesmoke;
        }
        .time-scale {
            font-size: 12px;
            background-color: #fff;
            border-bottom: 1px solid #cecece;
        }
        .time-scale-line {
            box-sizing: border-box;
            border-bottom: 1px solid #cecece;
        }
        .time-scale-line:first-child {
            border-top: none;
        }
        .time-scale-cell {
            display: inline-block;
            white-space: nowrap;
            overflow: hidden;
            border-right: 1px solid #cecece;
            text-align: center;
            height: 100%;
        }`
                ],
                providers: [
                    GanttService
                ]
            }]
    }], function () { return [{ type: i1.GanttService }]; }, { timeScaleMonth: [{
            type: Input
        }], timeScaleWeekend: [{
            type: Input
        }], dimensions: [{
            type: Input
        }], scale: [{
            type: Input
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2FudHQtdGltZS1zY2FsZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLWdhbnR0LyIsInNvdXJjZXMiOlsibGliL2FjdGl2aXR5L3RpbWUtc2NhbGUvZ2FudHQtdGltZS1zY2FsZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBVSxLQUFLLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLHFDQUFxQyxDQUFDOzs7OztJQVluRCw4QkFDb0Y7SUFBQSxZQUF3Qjs7SUFBQSxpQkFBTTs7Ozs7SUFBOUcsbURBQW9DLGtEQUFBO0lBQTRDLGVBQXdCO0lBQXhCLDREQUF3Qjs7O0lBRzVHLDhCQUNnRjtJQUFBLFlBQVM7SUFBQSxpQkFBTTs7OztJQUEvRixtREFBb0Msa0RBQUE7SUFBNEMsZUFBUztJQUFULDhCQUFTOztBQWdDekcsTUFBTSxPQUFPLHVCQUF1QjtJQU1oQyxZQUFtQixZQUEwQjtRQUExQixpQkFBWSxHQUFaLFlBQVksQ0FBYztJQUFJLENBQUM7SUFFbEQsUUFBUTtJQUNSLENBQUM7SUFFRCxpQkFBaUI7UUFDYixPQUFPO1lBQ0gsT0FBTyxFQUFFLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDLEdBQUcsSUFBSTtTQUMvQyxDQUFDO0lBQ04sQ0FBQztJQUVELDBCQUEwQixDQUFDLFNBQWlCO1FBQ3hDLE9BQU87WUFDSCxRQUFRLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxTQUFTLEdBQUcsSUFBSTtZQUM1QyxhQUFhLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxTQUFTLEdBQUcsSUFBSTtZQUNqRCxVQUFVLEVBQUUsVUFBVTtZQUN0QixZQUFZLEVBQUUsU0FBUztTQUMxQixDQUFDO0lBQ04sQ0FBQztJQUVELDBCQUEwQjtRQUN0QixPQUFPO1lBQ0gsT0FBTyxFQUFFLElBQUksQ0FBQyxZQUFZLENBQUMsU0FBUyxHQUFHLElBQUk7U0FDOUMsQ0FBQztJQUNOLENBQUM7SUFFRCw0QkFBNEIsQ0FBQyxTQUFpQjtRQUMxQyxPQUFPO1lBQ0gsUUFBUSxFQUFFLElBQUksQ0FBQyxZQUFZLENBQUMsU0FBUyxHQUFHLElBQUk7WUFDNUMsYUFBYSxFQUFFLElBQUksQ0FBQyxZQUFZLENBQUMsU0FBUyxHQUFHLElBQUk7WUFDakQsVUFBVSxFQUFFLFVBQVU7WUFDdEIsWUFBWSxFQUFFLFNBQVM7U0FDMUIsQ0FBQztJQUNOLENBQUM7SUFFRCw0QkFBNEI7UUFDeEIsT0FBTztZQUNILE9BQU8sRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLFNBQVMsR0FBRyxJQUFJO1NBQzlDLENBQUM7SUFDTixDQUFDO0lBRUQsWUFBWSxDQUFDLElBQVU7UUFDbkIsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNoRCxDQUFDOztpSEFqRFEsdUJBQXVCOytFQUF2Qix1QkFBdUIsOExBSnJCO1lBQ1AsWUFBWTtTQUNmO1FBekNHLDhCQUNJO1FBSUEsOEJBQ0k7UUFBQSx3RUFDb0Y7UUFDeEYsaUJBQU07UUFDTiw4QkFDSTtRQUFBLHdFQUNnRjtRQUNwRixpQkFBTTtRQUNWLGlCQUFNOztRQWJrQixpREFBK0I7UUFLdEIsZUFBZ0Q7UUFBaEQsa0VBQWdEO1FBQzVDLGVBQW9EO1FBQXBELDhDQUFvRDtRQUd4RCxlQUFnRDtRQUFoRCxrRUFBZ0Q7UUFDNUMsZUFBb0Q7UUFBcEQsOENBQW9EOztrREFpQ3BGLHVCQUF1QjtjQTlDbkMsU0FBUztlQUFDO2dCQUNQLFFBQVEsRUFBRSxZQUFZO2dCQUN0QixRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7O2VBY0M7Z0JBQ1gsTUFBTSxFQUFFLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1VBdUJIO2lCQUNMO2dCQUNELFNBQVMsRUFBRTtvQkFDUCxZQUFZO2lCQUNmO2FBQ0o7O2tCQUVJLEtBQUs7O2tCQUNMLEtBQUs7O2tCQUNMLEtBQUs7O2tCQUNMLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgR2FudHRTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2hhcmVkL3NlcnZpY2VzL2dhbnR0LnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBJU2NhbGUgfSBmcm9tICcuLi8uLi9zaGFyZWQvaW50ZXJmYWNlcyc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiAndGltZS1zY2FsZScsXHJcbiAgICB0ZW1wbGF0ZTogYFxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJ0aW1lLXNjYWxlXCIgW25nU3R5bGVdPVwic2V0VGltZXNjYWxlU3R5bGUoKVwiPlxyXG4gICAgICAgICAgICA8IS0tPGRpdiBjbGFzcz1cInRpbWUtc2NhbGUtbGluZVwiIFtuZ1N0eWxlXT1cInNldFRpbWVzY2FsZU1vbnRoTGluZVN0eWxlKCdub25lJylcIj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0aW1lLXNjYWxlLWNlbGxcIiAqbmdGb3I9XCJsZXQgc2NhbGUgb2YgdGltZVNjYWxlTW9udGg7IGxldCBpID0gaW5kZXhcIlxyXG4gICAgICAgICAgICAgICAgICAgIFtuZ0NsYXNzXT1cIihpICUgMikgPyAnd2Vla2VuZCcgOiAnJ1wiIFtzdHlsZS53aWR0aC5weF09XCJzY2FsZS53aWR0aFwiPnt7c2NhbGUuc3RhcnQgfCBkYXRlOiAnZGQtTU0nfX08L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+LS0+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0aW1lLXNjYWxlLWxpbmVcIiBbbmdTdHlsZV09XCJzZXRUaW1lc2NhbGVXZWVrZW5kTGluZVN0eWxlKCdub25lJylcIj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0aW1lLXNjYWxlLWNlbGxcIiAqbmdGb3I9XCJsZXQgZGF0ZSBvZiB0aW1lU2NhbGVXZWVrZW5kOyBsZXQgaSA9IGluZGV4XCJcclxuICAgICAgICAgICAgICAgICAgICBbbmdDbGFzc109XCIoaSAlIDIpID8gJ3dlZWtlbmQnIDogJydcIiBbbmdTdHlsZV09XCJzZXRUaW1lc2NhbGVXZWVrZW5kQ2VsbFN0eWxlKClcIj57e2RhdGUgfCBkYXRlOiAnZGQtTU0nfX08L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0aW1lLXNjYWxlLWxpbmVcIiBbbmdTdHlsZV09XCJzZXRUaW1lc2NhbGVXZWVrZW5kTGluZVN0eWxlKCdub25lJylcIj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0aW1lLXNjYWxlLWNlbGxcIiAqbmdGb3I9XCJsZXQgZGF0ZSBvZiB0aW1lU2NhbGVXZWVrZW5kOyBsZXQgaSA9IGluZGV4XCJcclxuICAgICAgICAgICAgICAgIFtuZ0NsYXNzXT1cIihpICUgMikgPyAnd2Vla2VuZCcgOiAnJ1wiIFtuZ1N0eWxlXT1cInNldFRpbWVzY2FsZVdlZWtlbmRDZWxsU3R5bGUoKVwiPnt7aSArIDF9fTwvZGl2PlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8L2Rpdj5gLFxyXG4gICAgc3R5bGVzOiBbYFxyXG4gICAgICAgIC53ZWVrZW5kIHtcclxuICAgICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGVzbW9rZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLnRpbWUtc2NhbGUge1xyXG4gICAgICAgICAgICBmb250LXNpemU6IDEycHg7XHJcbiAgICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6ICNmZmY7XHJcbiAgICAgICAgICAgIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjY2VjZWNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICAudGltZS1zY2FsZS1saW5lIHtcclxuICAgICAgICAgICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcclxuICAgICAgICAgICAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICNjZWNlY2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC50aW1lLXNjYWxlLWxpbmU6Zmlyc3QtY2hpbGQge1xyXG4gICAgICAgICAgICBib3JkZXItdG9wOiBub25lO1xyXG4gICAgICAgIH1cclxuICAgICAgICAudGltZS1zY2FsZS1jZWxsIHtcclxuICAgICAgICAgICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xyXG4gICAgICAgICAgICB3aGl0ZS1zcGFjZTogbm93cmFwO1xyXG4gICAgICAgICAgICBvdmVyZmxvdzogaGlkZGVuO1xyXG4gICAgICAgICAgICBib3JkZXItcmlnaHQ6IDFweCBzb2xpZCAjY2VjZWNlO1xyXG4gICAgICAgICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgICAgICAgICAgIGhlaWdodDogMTAwJTtcclxuICAgICAgICB9YFxyXG4gICAgXSxcclxuICAgIHByb3ZpZGVyczogW1xyXG4gICAgICAgIEdhbnR0U2VydmljZVxyXG4gICAgXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgR2FudHRUaW1lU2NhbGVDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xyXG4gICAgQElucHV0KCkgdGltZVNjYWxlTW9udGg6IGFueTtcclxuICAgIEBJbnB1dCgpIHRpbWVTY2FsZVdlZWtlbmQ6IGFueTtcclxuICAgIEBJbnB1dCgpIGRpbWVuc2lvbnM6IGFueTtcclxuICAgIEBJbnB1dCgpIHNjYWxlOiBJU2NhbGU7XHJcblxyXG4gICAgY29uc3RydWN0b3IocHVibGljIGdhbnR0U2VydmljZTogR2FudHRTZXJ2aWNlKSB7IH1cclxuXHJcbiAgICBuZ09uSW5pdCgpIHtcclxuICAgIH1cclxuXHJcbiAgICBzZXRUaW1lc2NhbGVTdHlsZSgpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAnd2lkdGgnOiAodGhpcy5kaW1lbnNpb25zLndpZHRoICsgMzYpICsgJ3B4J1xyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgc2V0VGltZXNjYWxlTW9udGhMaW5lU3R5bGUoYm9yZGVyVG9wOiBzdHJpbmcpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAnaGVpZ2h0JzogdGhpcy5nYW50dFNlcnZpY2Uucm93SGVpZ2h0ICsgJ3B4JyxcclxuICAgICAgICAgICAgJ2xpbmUtaGVpZ2h0JzogdGhpcy5nYW50dFNlcnZpY2Uucm93SGVpZ2h0ICsgJ3B4JyxcclxuICAgICAgICAgICAgJ3Bvc2l0aW9uJzogJ3JlbGF0aXZlJyxcclxuICAgICAgICAgICAgJ2JvcmRlci10b3AnOiBib3JkZXJUb3BcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIHNldFRpbWVzY2FsZU1vbnRoQ2VsbFN0eWxlKCkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICd3aWR0aCc6IHRoaXMuZ2FudHRTZXJ2aWNlLmNlbGxXaWR0aCArICdweCdcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIHNldFRpbWVzY2FsZVdlZWtlbmRMaW5lU3R5bGUoYm9yZGVyVG9wOiBzdHJpbmcpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAnaGVpZ2h0JzogdGhpcy5nYW50dFNlcnZpY2Uucm93SGVpZ2h0ICsgJ3B4JyxcclxuICAgICAgICAgICAgJ2xpbmUtaGVpZ2h0JzogdGhpcy5nYW50dFNlcnZpY2Uucm93SGVpZ2h0ICsgJ3B4JyxcclxuICAgICAgICAgICAgJ3Bvc2l0aW9uJzogJ3JlbGF0aXZlJyxcclxuICAgICAgICAgICAgJ2JvcmRlci10b3AnOiBib3JkZXJUb3BcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIHNldFRpbWVzY2FsZVdlZWtlbmRDZWxsU3R5bGUoKSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgJ3dpZHRoJzogdGhpcy5nYW50dFNlcnZpY2UuY2VsbFdpZHRoICsgJ3B4J1xyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgaXNEYXlXZWVrZW5kKGRhdGU6IERhdGUpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5nYW50dFNlcnZpY2UuaXNEYXlXZWVrZW5kKGRhdGUpO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==