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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JvdXBCeS5waXBlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1nYW50dC8iLCJzb3VyY2VzIjpbImxpYi9zaGFyZWQvcGlwZXMvZ3JvdXBCeS5waXBlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsSUFBSSxFQUFpQixNQUFNLGVBQWUsQ0FBQzs7Ozs7Ozs7OztBQVdwRCxNQUFNLE9BQU8sV0FBVzs7Ozs7O0lBQ3RCLFNBQVMsQ0FBQyxLQUFZLEVBQUUsQ0FBTTs7WUFDdEIsTUFBTSxHQUFHLEVBQUU7UUFDZixLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBTSxFQUFFLEVBQUU7O2dCQUNuQixLQUFLLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFFaEMsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDcEMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN4QixDQUFDLENBQUMsQ0FBQztRQUNILE9BQU8sTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFVLEVBQUUsRUFBRTtZQUMxQyxPQUFPLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN6QixDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7OztZQWJGLElBQUksU0FBQyxFQUFDLElBQUksRUFBRSxTQUFTLEVBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQaXBlLCBQaXBlVHJhbnNmb3JtIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbi8qXHJcbiAqIEdyb3VwIHRoZSBhcnJheSBieSBnaXZlbiBmdW5jdGlvblxyXG4gKiBUYWtlcyBhbiBhcnJheSBhcmd1bWVudCB0aGF0IGRlZmF1bHRzIHRvIDEuXHJcbiAqIFVzYWdlOlxyXG4gKiAgIGFycmF5IHwgZ3JvdXBCeTpmdW5jKClcclxuICogRXhhbXBsZTpcclxuICogICB7eyBbIHsgaWQ6ICcxJ31dIHwgIGdyb3VwQnk6IH19XHJcbiAqICAgZm9ybWF0cyB0bzogW11cclxuKi9cclxuQFBpcGUoe25hbWU6ICdncm91cEJ5J30pXHJcbmV4cG9ydCBjbGFzcyBHcm91cEJ5UGlwZSBpbXBsZW1lbnRzIFBpcGVUcmFuc2Zvcm0ge1xyXG4gIHRyYW5zZm9ybShhcnJheTogYW55W10sIGY6IGFueSk6IGFueVtdIHtcclxuICAgICAgdmFyIGdyb3VwcyA9IHt9O1xyXG4gICAgICBhcnJheS5mb3JFYWNoKChvOiBhbnkpID0+IHtcclxuICAgICAgICB2YXIgZ3JvdXAgPSBKU09OLnN0cmluZ2lmeShmKG8pKTtcclxuXHJcbiAgICAgICAgZ3JvdXBzW2dyb3VwXSA9IGdyb3Vwc1tncm91cF0gfHwgW107XHJcbiAgICAgICAgZ3JvdXBzW2dyb3VwXS5wdXNoKG8pO1xyXG4gICAgICB9KTtcclxuICAgICAgcmV0dXJuIE9iamVjdC5rZXlzKGdyb3VwcykubWFwKChncm91cDogYW55KSA9PiB7XHJcbiAgICAgICAgICByZXR1cm4gZ3JvdXBzW2dyb3VwXTtcclxuICAgICAgfSk7XHJcbiAgfVxyXG59XHJcbiJdfQ==