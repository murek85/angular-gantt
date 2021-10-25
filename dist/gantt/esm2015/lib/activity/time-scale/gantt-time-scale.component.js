/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input } from '@angular/core';
import { GanttService } from '../../shared/services/gantt.service';
import * as ɵngcc0 from '@angular/core';
import * as ɵngcc1 from '@angular/common';

function GanttTimeScaleComponent_div_2_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵelementStart(0, "div", 3);
    ɵngcc0.ɵɵtext(1);
    ɵngcc0.ɵɵpipe(2, "date");
    ɵngcc0.ɵɵelementEnd();
} if (rf & 2) {
    const date_r2 = ctx.$implicit;
    const i_r3 = ctx.index;
    const ctx_r0 = ɵngcc0.ɵɵnextContext();
    ɵngcc0.ɵɵproperty("ngClass", i_r3 % 2 ? "weekend" : "")("ngStyle", ctx_r0.setTimescaleWeekendCellStyle());
    ɵngcc0.ɵɵadvance(1);
    ɵngcc0.ɵɵtextInterpolate(ɵngcc0.ɵɵpipeBind2(2, 3, date_r2, "dd-MM"));
} }
function GanttTimeScaleComponent_div_4_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵelementStart(0, "div", 3);
    ɵngcc0.ɵɵtext(1);
    ɵngcc0.ɵɵelementEnd();
} if (rf & 2) {
    const i_r5 = ctx.index;
    const ctx_r1 = ɵngcc0.ɵɵnextContext();
    ɵngcc0.ɵɵproperty("ngClass", i_r5 % 2 ? "weekend" : "")("ngStyle", ctx_r1.setTimescaleWeekendCellStyle());
    ɵngcc0.ɵɵadvance(1);
    ɵngcc0.ɵɵtextInterpolate(i_r5 + 1);
} }
export class GanttTimeScaleComponent {
    /**
     * @param {?} ganttService
     */
    constructor(ganttService) {
        this.ganttService = ganttService;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
    }
    /**
     * @return {?}
     */
    setTimescaleStyle() {
        return {
            'width': (this.dimensions.width + 36) + 'px'
        };
    }
    /**
     * @param {?} borderTop
     * @return {?}
     */
    setTimescaleMonthLineStyle(borderTop) {
        return {
            'height': this.ganttService.rowHeight + 'px',
            'line-height': this.ganttService.rowHeight + 'px',
            'position': 'relative',
            'border-top': borderTop
        };
    }
    /**
     * @return {?}
     */
    setTimescaleMonthCellStyle() {
        return {
            'width': this.ganttService.cellWidth + 'px'
        };
    }
    /**
     * @param {?} borderTop
     * @return {?}
     */
    setTimescaleWeekendLineStyle(borderTop) {
        return {
            'height': this.ganttService.rowHeight + 'px',
            'line-height': this.ganttService.rowHeight + 'px',
            'position': 'relative',
            'border-top': borderTop
        };
    }
    /**
     * @return {?}
     */
    setTimescaleWeekendCellStyle() {
        return {
            'width': this.ganttService.cellWidth + 'px'
        };
    }
    /**
     * @param {?} date
     * @return {?}
     */
    isDayWeekend(date) {
        return this.ganttService.isDayWeekend(date);
    }
}
GanttTimeScaleComponent.ɵfac = function GanttTimeScaleComponent_Factory(t) { return new (t || GanttTimeScaleComponent)(ɵngcc0.ɵɵdirectiveInject(GanttService)); };
GanttTimeScaleComponent.ɵcmp = ɵngcc0.ɵɵdefineComponent({ type: GanttTimeScaleComponent, selectors: [["time-scale"]], inputs: { timeScaleMonth: "timeScaleMonth", timeScaleWeekend: "timeScaleWeekend", dimensions: "dimensions", scale: "scale" }, features: [ɵngcc0.ɵɵProvidersFeature([
            GanttService
        ])], decls: 5, vars: 5, consts: [[1, "time-scale", 3, "ngStyle"], [1, "time-scale-line", 3, "ngStyle"], ["class", "time-scale-cell", 3, "ngClass", "ngStyle", 4, "ngFor", "ngForOf"], [1, "time-scale-cell", 3, "ngClass", "ngStyle"]], template: function GanttTimeScaleComponent_Template(rf, ctx) { if (rf & 1) {
        ɵngcc0.ɵɵelementStart(0, "div", 0);
        ɵngcc0.ɵɵelementStart(1, "div", 1);
        ɵngcc0.ɵɵtemplate(2, GanttTimeScaleComponent_div_2_Template, 3, 6, "div", 2);
        ɵngcc0.ɵɵelementEnd();
        ɵngcc0.ɵɵelementStart(3, "div", 1);
        ɵngcc0.ɵɵtemplate(4, GanttTimeScaleComponent_div_4_Template, 2, 3, "div", 2);
        ɵngcc0.ɵɵelementEnd();
        ɵngcc0.ɵɵelementEnd();
    } if (rf & 2) {
        ɵngcc0.ɵɵproperty("ngStyle", ctx.setTimescaleStyle());
        ɵngcc0.ɵɵadvance(1);
        ɵngcc0.ɵɵproperty("ngStyle", ctx.setTimescaleWeekendLineStyle("none"));
        ɵngcc0.ɵɵadvance(1);
        ɵngcc0.ɵɵproperty("ngForOf", ctx.timeScaleWeekend);
        ɵngcc0.ɵɵadvance(1);
        ɵngcc0.ɵɵproperty("ngStyle", ctx.setTimescaleWeekendLineStyle("none"));
        ɵngcc0.ɵɵadvance(1);
        ɵngcc0.ɵɵproperty("ngForOf", ctx.timeScaleWeekend);
    } }, directives: [ɵngcc1.NgStyle, ɵngcc1.NgForOf, ɵngcc1.NgClass], pipes: [ɵngcc1.DatePipe], styles: [".weekend[_ngcontent-%COMP%] {\n            background-color: whitesmoke;\n        }\n        .time-scale[_ngcontent-%COMP%] {\n            font-size: 12px;\n            background-color: #fff;\n            border-bottom: 1px solid #cecece;\n        }\n        .time-scale-line[_ngcontent-%COMP%] {\n            box-sizing: border-box;\n            border-bottom: 1px solid #cecece;\n        }\n        .time-scale-line[_ngcontent-%COMP%]:first-child {\n            border-top: none;\n        }\n        .time-scale-cell[_ngcontent-%COMP%] {\n            display: inline-block;\n            white-space: nowrap;\n            overflow: hidden;\n            border-right: 1px solid #cecece;\n            text-align: center;\n            height: 100%;\n        }"] });
/** @nocollapse */
GanttTimeScaleComponent.ctorParameters = () => [
    { type: GanttService }
];
GanttTimeScaleComponent.propDecorators = {
    timeScaleMonth: [{ type: Input }],
    timeScaleWeekend: [{ type: Input }],
    dimensions: [{ type: Input }],
    scale: [{ type: Input }]
};
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(GanttTimeScaleComponent, [{
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
                providers: [
                    GanttService
                ],
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
        }`]
            }]
    }], function () { return [{ type: GanttService }]; }, { timeScaleMonth: [{
            type: Input
        }], timeScaleWeekend: [{
            type: Input
        }], dimensions: [{
            type: Input
        }], scale: [{
            type: Input
        }] }); })();
if (false) {
    /** @type {?} */
    GanttTimeScaleComponent.prototype.timeScaleMonth;
    /** @type {?} */
    GanttTimeScaleComponent.prototype.timeScaleWeekend;
    /** @type {?} */
    GanttTimeScaleComponent.prototype.dimensions;
    /** @type {?} */
    GanttTimeScaleComponent.prototype.scale;
    /** @type {?} */
    GanttTimeScaleComponent.prototype.ganttService;
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2FudHQtdGltZS1zY2FsZS5jb21wb25lbnQuanMiLCJzb3VyY2VzIjpbIm5nOi9hbmd1bGFyLWdhbnR0L2xpYi9hY3Rpdml0eS90aW1lLXNjYWxlL2dhbnR0LXRpbWUtc2NhbGUuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFVLEtBQUssRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6RCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0scUNBQXFDLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFpRG5FLE1BQU0sT0FBTyx1QkFBdUI7QUFBRztBQUFRO0FBQzFCO0FBQVEsSUFLekIsWUFBbUIsWUFBMEI7QUFBSSxRQUE5QixpQkFBWSxHQUFaLFlBQVksQ0FBYztBQUFDLElBQUcsQ0FBQztBQUN0RDtBQUNPO0FBR0w7QUFBUSxJQUhOLFFBQVE7QUFDWixJQUFJLENBQUM7QUFDTDtBQUNPO0FBQ1A7QUFBUSxJQURKLGlCQUFpQjtBQUNyQixRQUFRLE9BQU87QUFDZixZQUFZLE9BQU8sRUFBRSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQyxHQUFHLElBQUk7QUFDeEQsU0FBUyxDQUFDO0FBQ1YsSUFBSSxDQUFDO0FBQ0w7QUFDTztBQUE0QjtBQUNqQztBQUFRLElBRE4sMEJBQTBCLENBQUMsU0FBaUI7QUFDaEQsUUFBUSxPQUFPO0FBQ2YsWUFBWSxRQUFRLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxTQUFTLEdBQUcsSUFBSTtBQUN4RCxZQUFZLGFBQWEsRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLFNBQVMsR0FBRyxJQUFJO0FBQzdELFlBQVksVUFBVSxFQUFFLFVBQVU7QUFDbEMsWUFBWSxZQUFZLEVBQUUsU0FBUztBQUNuQyxTQUFTLENBQUM7QUFDVixJQUFJLENBQUM7QUFDTDtBQUNPO0FBQW1CO0FBQVEsSUFBOUIsMEJBQTBCO0FBQzlCLFFBQVEs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QUFBLEFBQ0EsQUFBQSxBQUVBLEFBQUEsQUFDQSxBQUFBLEFBQ0EsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFDQSxBQUFBLEFBQ0EsQUFBQSxBQUVBLEFBQUEsQUFBQSxBQUFBLEFBQ0EsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUNBLEFBQUEsQUEvRkEsQUFBQSxBQUFBLEFBQ0EsQUFBQSxBQUFBLEFBQUEsQUFDQSxBQUFBLEFBQUEsQUFjQSxBQTBCQSxBQUFBLEFBQUEsQUFDQSxBQUFBLEFBQ0EsQUEzQkEsQUF1QkEsQUFLQSxBQWhEQSxBQUFBLEFBa0RBLEFBQUEsQUFDQSxBQUFBLEFBQ0EsQUFBQSxBQUNBLEFBQUEsQUFIQSxBQUFBLEFBQ0EsQUFBQSxBQUNBLEFBQUEsQUFDQSxBQUFBLEFBRUEsQUFBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBHYW50dFNlcnZpY2UgfSBmcm9tICcuLi8uLi9zaGFyZWQvc2VydmljZXMvZ2FudHQuc2VydmljZSc7XHJcbmltcG9ydCB7IElTY2FsZSB9IGZyb20gJy4uLy4uL3NoYXJlZC9pbnRlcmZhY2VzJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6ICd0aW1lLXNjYWxlJyxcclxuICAgIHRlbXBsYXRlOiBgXHJcbiAgICAgICAgPGRpdiBjbGFzcz1cInRpbWUtc2NhbGVcIiBbbmdTdHlsZV09XCJzZXRUaW1lc2NhbGVTdHlsZSgpXCI+XHJcbiAgICAgICAgICAgIDwhLS08ZGl2IGNsYXNzPVwidGltZS1zY2FsZS1saW5lXCIgW25nU3R5bGVdPVwic2V0VGltZXNjYWxlTW9udGhMaW5lU3R5bGUoJ25vbmUnKVwiPlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRpbWUtc2NhbGUtY2VsbFwiICpuZ0Zvcj1cImxldCBzY2FsZSBvZiB0aW1lU2NhbGVNb250aDsgbGV0IGkgPSBpbmRleFwiXHJcbiAgICAgICAgICAgICAgICAgICAgW25nQ2xhc3NdPVwiKGkgJSAyKSA/ICd3ZWVrZW5kJyA6ICcnXCIgW3N0eWxlLndpZHRoLnB4XT1cInNjYWxlLndpZHRoXCI+e3tzY2FsZS5zdGFydCB8IGRhdGU6ICdkZC1NTSd9fTwvZGl2PlxyXG4gICAgICAgICAgICA8L2Rpdj4tLT5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRpbWUtc2NhbGUtbGluZVwiIFtuZ1N0eWxlXT1cInNldFRpbWVzY2FsZVdlZWtlbmRMaW5lU3R5bGUoJ25vbmUnKVwiPlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRpbWUtc2NhbGUtY2VsbFwiICpuZ0Zvcj1cImxldCBkYXRlIG9mIHRpbWVTY2FsZVdlZWtlbmQ7IGxldCBpID0gaW5kZXhcIlxyXG4gICAgICAgICAgICAgICAgICAgIFtuZ0NsYXNzXT1cIihpICUgMikgPyAnd2Vla2VuZCcgOiAnJ1wiIFtuZ1N0eWxlXT1cInNldFRpbWVzY2FsZVdlZWtlbmRDZWxsU3R5bGUoKVwiPnt7ZGF0ZSB8IGRhdGU6ICdkZC1NTSd9fTwvZGl2PlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRpbWUtc2NhbGUtbGluZVwiIFtuZ1N0eWxlXT1cInNldFRpbWVzY2FsZVdlZWtlbmRMaW5lU3R5bGUoJ25vbmUnKVwiPlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRpbWUtc2NhbGUtY2VsbFwiICpuZ0Zvcj1cImxldCBkYXRlIG9mIHRpbWVTY2FsZVdlZWtlbmQ7IGxldCBpID0gaW5kZXhcIlxyXG4gICAgICAgICAgICAgICAgW25nQ2xhc3NdPVwiKGkgJSAyKSA/ICd3ZWVrZW5kJyA6ICcnXCIgW25nU3R5bGVdPVwic2V0VGltZXNjYWxlV2Vla2VuZENlbGxTdHlsZSgpXCI+e3tpICsgMX19PC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvZGl2PmAsXHJcbiAgICBzdHlsZXM6IFtgXHJcbiAgICAgICAgLndlZWtlbmQge1xyXG4gICAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZXNtb2tlO1xyXG4gICAgICAgIH1cclxuICAgICAgICAudGltZS1zY2FsZSB7XHJcbiAgICAgICAgICAgIGZvbnQtc2l6ZTogMTJweDtcclxuICAgICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZjtcclxuICAgICAgICAgICAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICNjZWNlY2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC50aW1lLXNjYWxlLWxpbmUge1xyXG4gICAgICAgICAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xyXG4gICAgICAgICAgICBib3JkZXItYm90dG9tOiAxcHggc29saWQgI2NlY2VjZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLnRpbWUtc2NhbGUtbGluZTpmaXJzdC1jaGlsZCB7XHJcbiAgICAgICAgICAgIGJvcmRlci10b3A6IG5vbmU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC50aW1lLXNjYWxlLWNlbGwge1xyXG4gICAgICAgICAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XHJcbiAgICAgICAgICAgIHdoaXRlLXNwYWNlOiBub3dyYXA7XHJcbiAgICAgICAgICAgIG92ZXJmbG93OiBoaWRkZW47XHJcbiAgICAgICAgICAgIGJvcmRlci1yaWdodDogMXB4IHNvbGlkICNjZWNlY2U7XHJcbiAgICAgICAgICAgIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICAgICAgICAgICAgaGVpZ2h0OiAxMDAlO1xyXG4gICAgICAgIH1gXHJcbiAgICBdLFxyXG4gICAgcHJvdmlkZXJzOiBbXHJcbiAgICAgICAgR2FudHRTZXJ2aWNlXHJcbiAgICBdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBHYW50dFRpbWVTY2FsZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcbiAgICBASW5wdXQoKSB0aW1lU2NhbGVNb250aDogYW55O1xyXG4gICAgQElucHV0KCkgdGltZVNjYWxlV2Vla2VuZDogYW55O1xyXG4gICAgQElucHV0KCkgZGltZW5zaW9uczogYW55O1xyXG4gICAgQElucHV0KCkgc2NhbGU6IElTY2FsZTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgZ2FudHRTZXJ2aWNlOiBHYW50dFNlcnZpY2UpIHsgfVxyXG5cclxuICAgIG5nT25Jbml0KCkge1xyXG4gICAgfVxyXG5cclxuICAgIHNldFRpbWVzY2FsZVN0eWxlKCkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICd3aWR0aCc6ICh0aGlzLmRpbWVuc2lvbnMud2lkdGggKyAzNikgKyAncHgnXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBzZXRUaW1lc2NhbGVNb250aExpbmVTdHlsZShib3JkZXJUb3A6IHN0cmluZykge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICdoZWlnaHQnOiB0aGlzLmdhbnR0U2VydmljZS5yb3dIZWlnaHQgKyAncHgnLFxyXG4gICAgICAgICAgICAnbGluZS1oZWlnaHQnOiB0aGlzLmdhbnR0U2VydmljZS5yb3dIZWlnaHQgKyAncHgnLFxyXG4gICAgICAgICAgICAncG9zaXRpb24nOiAncmVsYXRpdmUnLFxyXG4gICAgICAgICAgICAnYm9yZGVyLXRvcCc6IGJvcmRlclRvcFxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgc2V0VGltZXNjYWxlTW9udGhDZWxsU3R5bGUoKSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgJ3dpZHRoJzogdGhpcy5nYW50dFNlcnZpY2UuY2VsbFdpZHRoICsgJ3B4J1xyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgc2V0VGltZXNjYWxlV2Vla2VuZExpbmVTdHlsZShib3JkZXJUb3A6IHN0cmluZykge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICdoZWlnaHQnOiB0aGlzLmdhbnR0U2VydmljZS5yb3dIZWlnaHQgKyAncHgnLFxyXG4gICAgICAgICAgICAnbGluZS1oZWlnaHQnOiB0aGlzLmdhbnR0U2VydmljZS5yb3dIZWlnaHQgKyAncHgnLFxyXG4gICAgICAgICAgICAncG9zaXRpb24nOiAncmVsYXRpdmUnLFxyXG4gICAgICAgICAgICAnYm9yZGVyLXRvcCc6IGJvcmRlclRvcFxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgc2V0VGltZXNjYWxlV2Vla2VuZENlbGxTdHlsZSgpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAnd2lkdGgnOiB0aGlzLmdhbnR0U2VydmljZS5jZWxsV2lkdGggKyAncHgnXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBpc0RheVdlZWtlbmQoZGF0ZTogRGF0ZSk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmdhbnR0U2VydmljZS5pc0RheVdlZWtlbmQoZGF0ZSk7XHJcbiAgICB9XHJcbn1cclxuIl19