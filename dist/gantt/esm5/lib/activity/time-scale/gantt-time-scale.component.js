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
    var date_r2 = ctx.$implicit;
    var i_r3 = ctx.index;
    var ctx_r0 = ɵngcc0.ɵɵnextContext();
    ɵngcc0.ɵɵproperty("ngClass", i_r3 % 2 ? "weekend" : "")("ngStyle", ctx_r0.setTimescaleWeekendCellStyle());
    ɵngcc0.ɵɵadvance(1);
    ɵngcc0.ɵɵtextInterpolate(ɵngcc0.ɵɵpipeBind2(2, 3, date_r2, "dd-MM"));
} }
function GanttTimeScaleComponent_div_4_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵelementStart(0, "div", 3);
    ɵngcc0.ɵɵtext(1);
    ɵngcc0.ɵɵelementEnd();
} if (rf & 2) {
    var i_r5 = ctx.index;
    var ctx_r1 = ɵngcc0.ɵɵnextContext();
    ɵngcc0.ɵɵproperty("ngClass", i_r5 % 2 ? "weekend" : "")("ngStyle", ctx_r1.setTimescaleWeekendCellStyle());
    ɵngcc0.ɵɵadvance(1);
    ɵngcc0.ɵɵtextInterpolate(i_r5 + 1);
} }
var GanttTimeScaleComponent = /** @class */ (function () {
    function GanttTimeScaleComponent(ganttService) {
        this.ganttService = ganttService;
    }
    /**
     * @return {?}
     */
    GanttTimeScaleComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
    };
    /**
     * @return {?}
     */
    GanttTimeScaleComponent.prototype.setTimescaleStyle = /**
     * @return {?}
     */
    function () {
        return {
            'width': (this.dimensions.width + 36) + 'px'
        };
    };
    /**
     * @param {?} borderTop
     * @return {?}
     */
    GanttTimeScaleComponent.prototype.setTimescaleMonthLineStyle = /**
     * @param {?} borderTop
     * @return {?}
     */
    function (borderTop) {
        return {
            'height': this.ganttService.rowHeight + 'px',
            'line-height': this.ganttService.rowHeight + 'px',
            'position': 'relative',
            'border-top': borderTop
        };
    };
    /**
     * @return {?}
     */
    GanttTimeScaleComponent.prototype.setTimescaleMonthCellStyle = /**
     * @return {?}
     */
    function () {
        return {
            'width': this.ganttService.cellWidth + 'px'
        };
    };
    /**
     * @param {?} borderTop
     * @return {?}
     */
    GanttTimeScaleComponent.prototype.setTimescaleWeekendLineStyle = /**
     * @param {?} borderTop
     * @return {?}
     */
    function (borderTop) {
        return {
            'height': this.ganttService.rowHeight + 'px',
            'line-height': this.ganttService.rowHeight + 'px',
            'position': 'relative',
            'border-top': borderTop
        };
    };
    /**
     * @return {?}
     */
    GanttTimeScaleComponent.prototype.setTimescaleWeekendCellStyle = /**
     * @return {?}
     */
    function () {
        return {
            'width': this.ganttService.cellWidth + 'px'
        };
    };
    /**
     * @param {?} date
     * @return {?}
     */
    GanttTimeScaleComponent.prototype.isDayWeekend = /**
     * @param {?} date
     * @return {?}
     */
    function (date) {
        return this.ganttService.isDayWeekend(date);
    };
    /** @nocollapse */
    GanttTimeScaleComponent.ctorParameters = function () { return [
        { type: GanttService }
    ]; };
    GanttTimeScaleComponent.propDecorators = {
        timeScaleMonth: [{ type: Input }],
        timeScaleWeekend: [{ type: Input }],
        dimensions: [{ type: Input }],
        scale: [{ type: Input }]
    };
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
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(GanttTimeScaleComponent, [{
        type: Component,
        args: [{
                selector: 'time-scale',
                template: "\n        <div class=\"time-scale\" [ngStyle]=\"setTimescaleStyle()\">\n            <!--<div class=\"time-scale-line\" [ngStyle]=\"setTimescaleMonthLineStyle('none')\">\n                <div class=\"time-scale-cell\" *ngFor=\"let scale of timeScaleMonth; let i = index\"\n                    [ngClass]=\"(i % 2) ? 'weekend' : ''\" [style.width.px]=\"scale.width\">{{scale.start | date: 'dd-MM'}}</div>\n            </div>-->\n            <div class=\"time-scale-line\" [ngStyle]=\"setTimescaleWeekendLineStyle('none')\">\n                <div class=\"time-scale-cell\" *ngFor=\"let date of timeScaleWeekend; let i = index\"\n                    [ngClass]=\"(i % 2) ? 'weekend' : ''\" [ngStyle]=\"setTimescaleWeekendCellStyle()\">{{date | date: 'dd-MM'}}</div>\n            </div>\n            <div class=\"time-scale-line\" [ngStyle]=\"setTimescaleWeekendLineStyle('none')\">\n                <div class=\"time-scale-cell\" *ngFor=\"let date of timeScaleWeekend; let i = index\"\n                [ngClass]=\"(i % 2) ? 'weekend' : ''\" [ngStyle]=\"setTimescaleWeekendCellStyle()\">{{i + 1}}</div>\n            </div>\n        </div>",
                providers: [
                    GanttService
                ],
                styles: ["\n        .weekend {\n            background-color: whitesmoke;\n        }\n        .time-scale {\n            font-size: 12px;\n            background-color: #fff;\n            border-bottom: 1px solid #cecece;\n        }\n        .time-scale-line {\n            box-sizing: border-box;\n            border-bottom: 1px solid #cecece;\n        }\n        .time-scale-line:first-child {\n            border-top: none;\n        }\n        .time-scale-cell {\n            display: inline-block;\n            white-space: nowrap;\n            overflow: hidden;\n            border-right: 1px solid #cecece;\n            text-align: center;\n            height: 100%;\n        }"]
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
    return GanttTimeScaleComponent;
}());
export { GanttTimeScaleComponent };
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2FudHQtdGltZS1zY2FsZS5jb21wb25lbnQuanMiLCJzb3VyY2VzIjpbIm5nOi9hbmd1bGFyLWdhbnR0L2xpYi9hY3Rpdml0eS90aW1lLXNjYWxlL2dhbnR0LXRpbWUtc2NhbGUuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFVLEtBQUssRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6RCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0scUNBQXFDLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFHbkU7QUFHRSxJQWlERSxpQ0FBbUIsWUFBMEI7QUFBSSxRQUE5QixpQkFBWSxHQUFaLFlBQVksQ0FBYztBQUFDLElBQUcsQ0FBQztBQUN0RDtBQUNPO0FBR0w7QUFBUSxJQUhOLDBDQUFRO0FBQ1Y7QUFFWTtBQUFRLElBSGxCO0FBQ0gsSUFBRyxDQUFDO0FBRUw7QUFBUTtBQUNQO0FBQVEsSUFETCxtREFBaUI7QUFDbkI7QUFDRTtBQUFRLElBRlI7QUFBYyxRQUNWLE9BQU87QUFDZixZQUFZLE9BQU8sRUFBRSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQyxHQUFHLElBQUk7QUFDeEQsU0FBUyxDQUFDO0FBQ1YsSUFBSSxDQUFDO0FBRUw7QUFBUTtBQUE0QjtBQUNqQztBQUFRLElBRFAsNERBQTBCO0FBQU87QUFDeEI7QUFDRTtBQUFRLElBRm5CLFVBQTJCLFNBQWlCO0FBQ2hELFFBQVEsT0FBTztBQUNmLFlBQVksUUFBUSxFQUFFLElBQUksQ0FBQyxZQUFZLENBQUMsU0FBUyxHQUFHLElBQUk7QUFDeEQsWUFBWSxhQUFhLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxTQUFTLEdBQUcsSUFBSTtBQUM3RCxZQUFZLFVBQVUsRUFBRSxVQUFVO0FBQ2xDLFlBQVksWUFBWSxFQUFFLFNBQVM7QUFDbkMsU0FBUyxDQUFDO0FBQ1YsSUFBSSxDQUFDO0FBRUw7QUFB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QSxBQUFBLEFBQUEsQUFDQSxBQUFBLEFBQ0EsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFDQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUNBLEFBQUEsQUFBQSxBQUFBLEFBQ0EsQUFBQSxBQUFBLEFBQUEsQUFDQSxBQUFBLEFBQ0EsQUFBQSxBQUVBLEFBQUEsQUFBQSxBQUNBLEFBQUEsQUFDQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUNBLEFBQUEsQUFDQSxBQUFBLEFBRUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUNBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFDQSxBQUFBLEFBL0ZBLEFBQUEsQUFBQSxBQUNBLEFBQUEsQUFBQSxBQUFBLEFBQ0EsQUFBQSxBQUFBLEFBY0EsQUEwQkEsQUFBQSxBQUFBLEFBQ0EsQUFBQSxBQUNBLEFBM0JBLEFBdUJBLEFBS0EsQUFoREEsQUFBQSxBQWtEQSxBQUFBLEFBQ0EsQUFBQSxBQUNBLEFBQUEsQUFDQSxBQUFBLEFBOENBLEFBQUEsQUFBQSxBQWhHQSxBQWdHQSxBQWxEQSxBQUFBLEFBQ0EsQUFBQSxBQUNBLEFBQUEsQUFDQSxBQUFBLEFBQ0EsQUFBQSxBQUVBLEFBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgR2FudHRTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2hhcmVkL3NlcnZpY2VzL2dhbnR0LnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBJU2NhbGUgfSBmcm9tICcuLi8uLi9zaGFyZWQvaW50ZXJmYWNlcyc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiAndGltZS1zY2FsZScsXHJcbiAgICB0ZW1wbGF0ZTogYFxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJ0aW1lLXNjYWxlXCIgW25nU3R5bGVdPVwic2V0VGltZXNjYWxlU3R5bGUoKVwiPlxyXG4gICAgICAgICAgICA8IS0tPGRpdiBjbGFzcz1cInRpbWUtc2NhbGUtbGluZVwiIFtuZ1N0eWxlXT1cInNldFRpbWVzY2FsZU1vbnRoTGluZVN0eWxlKCdub25lJylcIj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0aW1lLXNjYWxlLWNlbGxcIiAqbmdGb3I9XCJsZXQgc2NhbGUgb2YgdGltZVNjYWxlTW9udGg7IGxldCBpID0gaW5kZXhcIlxyXG4gICAgICAgICAgICAgICAgICAgIFtuZ0NsYXNzXT1cIihpICUgMikgPyAnd2Vla2VuZCcgOiAnJ1wiIFtzdHlsZS53aWR0aC5weF09XCJzY2FsZS53aWR0aFwiPnt7c2NhbGUuc3RhcnQgfCBkYXRlOiAnZGQtTU0nfX08L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+LS0+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0aW1lLXNjYWxlLWxpbmVcIiBbbmdTdHlsZV09XCJzZXRUaW1lc2NhbGVXZWVrZW5kTGluZVN0eWxlKCdub25lJylcIj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0aW1lLXNjYWxlLWNlbGxcIiAqbmdGb3I9XCJsZXQgZGF0ZSBvZiB0aW1lU2NhbGVXZWVrZW5kOyBsZXQgaSA9IGluZGV4XCJcclxuICAgICAgICAgICAgICAgICAgICBbbmdDbGFzc109XCIoaSAlIDIpID8gJ3dlZWtlbmQnIDogJydcIiBbbmdTdHlsZV09XCJzZXRUaW1lc2NhbGVXZWVrZW5kQ2VsbFN0eWxlKClcIj57e2RhdGUgfCBkYXRlOiAnZGQtTU0nfX08L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0aW1lLXNjYWxlLWxpbmVcIiBbbmdTdHlsZV09XCJzZXRUaW1lc2NhbGVXZWVrZW5kTGluZVN0eWxlKCdub25lJylcIj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0aW1lLXNjYWxlLWNlbGxcIiAqbmdGb3I9XCJsZXQgZGF0ZSBvZiB0aW1lU2NhbGVXZWVrZW5kOyBsZXQgaSA9IGluZGV4XCJcclxuICAgICAgICAgICAgICAgIFtuZ0NsYXNzXT1cIihpICUgMikgPyAnd2Vla2VuZCcgOiAnJ1wiIFtuZ1N0eWxlXT1cInNldFRpbWVzY2FsZVdlZWtlbmRDZWxsU3R5bGUoKVwiPnt7aSArIDF9fTwvZGl2PlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8L2Rpdj5gLFxyXG4gICAgc3R5bGVzOiBbYFxyXG4gICAgICAgIC53ZWVrZW5kIHtcclxuICAgICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGVzbW9rZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLnRpbWUtc2NhbGUge1xyXG4gICAgICAgICAgICBmb250LXNpemU6IDEycHg7XHJcbiAgICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6ICNmZmY7XHJcbiAgICAgICAgICAgIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjY2VjZWNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICAudGltZS1zY2FsZS1saW5lIHtcclxuICAgICAgICAgICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcclxuICAgICAgICAgICAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICNjZWNlY2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC50aW1lLXNjYWxlLWxpbmU6Zmlyc3QtY2hpbGQge1xyXG4gICAgICAgICAgICBib3JkZXItdG9wOiBub25lO1xyXG4gICAgICAgIH1cclxuICAgICAgICAudGltZS1zY2FsZS1jZWxsIHtcclxuICAgICAgICAgICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xyXG4gICAgICAgICAgICB3aGl0ZS1zcGFjZTogbm93cmFwO1xyXG4gICAgICAgICAgICBvdmVyZmxvdzogaGlkZGVuO1xyXG4gICAgICAgICAgICBib3JkZXItcmlnaHQ6IDFweCBzb2xpZCAjY2VjZWNlO1xyXG4gICAgICAgICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgICAgICAgICAgIGhlaWdodDogMTAwJTtcclxuICAgICAgICB9YFxyXG4gICAgXSxcclxuICAgIHByb3ZpZGVyczogW1xyXG4gICAgICAgIEdhbnR0U2VydmljZVxyXG4gICAgXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgR2FudHRUaW1lU2NhbGVDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xyXG4gICAgQElucHV0KCkgdGltZVNjYWxlTW9udGg6IGFueTtcclxuICAgIEBJbnB1dCgpIHRpbWVTY2FsZVdlZWtlbmQ6IGFueTtcclxuICAgIEBJbnB1dCgpIGRpbWVuc2lvbnM6IGFueTtcclxuICAgIEBJbnB1dCgpIHNjYWxlOiBJU2NhbGU7XHJcblxyXG4gICAgY29uc3RydWN0b3IocHVibGljIGdhbnR0U2VydmljZTogR2FudHRTZXJ2aWNlKSB7IH1cclxuXHJcbiAgICBuZ09uSW5pdCgpIHtcclxuICAgIH1cclxuXHJcbiAgICBzZXRUaW1lc2NhbGVTdHlsZSgpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAnd2lkdGgnOiAodGhpcy5kaW1lbnNpb25zLndpZHRoICsgMzYpICsgJ3B4J1xyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgc2V0VGltZXNjYWxlTW9udGhMaW5lU3R5bGUoYm9yZGVyVG9wOiBzdHJpbmcpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAnaGVpZ2h0JzogdGhpcy5nYW50dFNlcnZpY2Uucm93SGVpZ2h0ICsgJ3B4JyxcclxuICAgICAgICAgICAgJ2xpbmUtaGVpZ2h0JzogdGhpcy5nYW50dFNlcnZpY2Uucm93SGVpZ2h0ICsgJ3B4JyxcclxuICAgICAgICAgICAgJ3Bvc2l0aW9uJzogJ3JlbGF0aXZlJyxcclxuICAgICAgICAgICAgJ2JvcmRlci10b3AnOiBib3JkZXJUb3BcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIHNldFRpbWVzY2FsZU1vbnRoQ2VsbFN0eWxlKCkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICd3aWR0aCc6IHRoaXMuZ2FudHRTZXJ2aWNlLmNlbGxXaWR0aCArICdweCdcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIHNldFRpbWVzY2FsZVdlZWtlbmRMaW5lU3R5bGUoYm9yZGVyVG9wOiBzdHJpbmcpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAnaGVpZ2h0JzogdGhpcy5nYW50dFNlcnZpY2Uucm93SGVpZ2h0ICsgJ3B4JyxcclxuICAgICAgICAgICAgJ2xpbmUtaGVpZ2h0JzogdGhpcy5nYW50dFNlcnZpY2Uucm93SGVpZ2h0ICsgJ3B4JyxcclxuICAgICAgICAgICAgJ3Bvc2l0aW9uJzogJ3JlbGF0aXZlJyxcclxuICAgICAgICAgICAgJ2JvcmRlci10b3AnOiBib3JkZXJUb3BcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIHNldFRpbWVzY2FsZVdlZWtlbmRDZWxsU3R5bGUoKSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgJ3dpZHRoJzogdGhpcy5nYW50dFNlcnZpY2UuY2VsbFdpZHRoICsgJ3B4J1xyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgaXNEYXlXZWVrZW5kKGRhdGU6IERhdGUpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5nYW50dFNlcnZpY2UuaXNEYXlXZWVrZW5kKGRhdGUpO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==