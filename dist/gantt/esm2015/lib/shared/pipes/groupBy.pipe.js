/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Pipe } from '@angular/core';
/*
 * Group the array by given function
 * Takes an array argument that defaults to 1.
 * Usage:
 *   array | groupBy:func()
 * Example:
 *   {{ [ { id: '1'}] |  groupBy: }}
 *   formats to: []
*/
export class GroupByPipe {
    /**
     * @param {?} array
     * @param {?} f
     * @return {?}
     */
    transform(array, f) {
        /** @type {?} */
        var groups = {};
        array.forEach((o) => {
            /** @type {?} */
            var group = JSON.stringify(f(o));
            groups[group] = groups[group] || [];
            groups[group].push(o);
        });
        return Object.keys(groups).map((group) => {
            return groups[group];
        });
    }
}
GroupByPipe.decorators = [
    { type: Pipe, args: [{ name: 'groupBy' },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JvdXBCeS5waXBlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vZ2FudHQvIiwic291cmNlcyI6WyJsaWIvc2hhcmVkL3BpcGVzL2dyb3VwQnkucGlwZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLElBQUksRUFBaUIsTUFBTSxlQUFlLENBQUM7Ozs7Ozs7Ozs7QUFXcEQsTUFBTSxPQUFPLFdBQVc7Ozs7OztJQUN0QixTQUFTLENBQUMsS0FBWSxFQUFFLENBQU07O1lBQ3RCLE1BQU0sR0FBRyxFQUFFO1FBQ2YsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQU0sRUFBRSxFQUFFOztnQkFDbkIsS0FBSyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBRWhDLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDO1lBQ3BDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDeEIsQ0FBQyxDQUFDLENBQUM7UUFDSCxPQUFPLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBVSxFQUFFLEVBQUU7WUFDMUMsT0FBTyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDekIsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDOzs7WUFiRixJQUFJLFNBQUMsRUFBQyxJQUFJLEVBQUUsU0FBUyxFQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUGlwZSwgUGlwZVRyYW5zZm9ybSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG4vKlxyXG4gKiBHcm91cCB0aGUgYXJyYXkgYnkgZ2l2ZW4gZnVuY3Rpb25cclxuICogVGFrZXMgYW4gYXJyYXkgYXJndW1lbnQgdGhhdCBkZWZhdWx0cyB0byAxLlxyXG4gKiBVc2FnZTpcclxuICogICBhcnJheSB8IGdyb3VwQnk6ZnVuYygpXHJcbiAqIEV4YW1wbGU6XHJcbiAqICAge3sgWyB7IGlkOiAnMSd9XSB8ICBncm91cEJ5OiB9fVxyXG4gKiAgIGZvcm1hdHMgdG86IFtdXHJcbiovXHJcbkBQaXBlKHtuYW1lOiAnZ3JvdXBCeSd9KVxyXG5leHBvcnQgY2xhc3MgR3JvdXBCeVBpcGUgaW1wbGVtZW50cyBQaXBlVHJhbnNmb3JtIHtcclxuICB0cmFuc2Zvcm0oYXJyYXk6IGFueVtdLCBmOiBhbnkpOiBhbnlbXSB7XHJcbiAgICAgIHZhciBncm91cHMgPSB7fTtcclxuICAgICAgYXJyYXkuZm9yRWFjaCgobzogYW55KSA9PiB7XHJcbiAgICAgICAgdmFyIGdyb3VwID0gSlNPTi5zdHJpbmdpZnkoZihvKSk7XHJcblxyXG4gICAgICAgIGdyb3Vwc1tncm91cF0gPSBncm91cHNbZ3JvdXBdIHx8IFtdO1xyXG4gICAgICAgIGdyb3Vwc1tncm91cF0ucHVzaChvKTtcclxuICAgICAgfSk7XHJcbiAgICAgIHJldHVybiBPYmplY3Qua2V5cyhncm91cHMpLm1hcCgoZ3JvdXA6IGFueSkgPT4ge1xyXG4gICAgICAgICAgcmV0dXJuIGdyb3Vwc1tncm91cF07XHJcbiAgICAgIH0pO1xyXG4gIH1cclxufVxyXG4iXX0=