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
var GroupByPipe = /** @class */ (function () {
    function GroupByPipe() {
    }
    /**
     * @param {?} array
     * @param {?} f
     * @return {?}
     */
    GroupByPipe.prototype.transform = /**
     * @param {?} array
     * @param {?} f
     * @return {?}
     */
    function (array, f) {
        /** @type {?} */
        var groups = {};
        array.forEach(function (o) {
            /** @type {?} */
            var group = JSON.stringify(f(o));
            groups[group] = groups[group] || [];
            groups[group].push(o);
        });
        return Object.keys(groups).map(function (group) {
            return groups[group];
        });
    };
    GroupByPipe.decorators = [
        { type: Pipe, args: [{ name: 'groupBy' },] }
    ];
    return GroupByPipe;
}());
export { GroupByPipe };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JvdXBCeS5waXBlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vZ2FudHQvIiwic291cmNlcyI6WyJsaWIvc2hhcmVkL3BpcGVzL2dyb3VwQnkucGlwZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLElBQUksRUFBaUIsTUFBTSxlQUFlLENBQUM7Ozs7Ozs7Ozs7QUFVcEQ7SUFBQTtJQWNBLENBQUM7Ozs7OztJQVpDLCtCQUFTOzs7OztJQUFULFVBQVUsS0FBWSxFQUFFLENBQU07O1lBQ3RCLE1BQU0sR0FBRyxFQUFFO1FBQ2YsS0FBSyxDQUFDLE9BQU8sQ0FBQyxVQUFDLENBQU07O2dCQUNmLEtBQUssR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUVoQyxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUNwQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3hCLENBQUMsQ0FBQyxDQUFDO1FBQ0gsT0FBTyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxVQUFDLEtBQVU7WUFDdEMsT0FBTyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDekIsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDOztnQkFiRixJQUFJLFNBQUMsRUFBQyxJQUFJLEVBQUUsU0FBUyxFQUFDOztJQWN2QixrQkFBQztDQUFBLEFBZEQsSUFjQztTQWJZLFdBQVciLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQaXBlLCBQaXBlVHJhbnNmb3JtIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbi8qXHJcbiAqIEdyb3VwIHRoZSBhcnJheSBieSBnaXZlbiBmdW5jdGlvblxyXG4gKiBUYWtlcyBhbiBhcnJheSBhcmd1bWVudCB0aGF0IGRlZmF1bHRzIHRvIDEuXHJcbiAqIFVzYWdlOlxyXG4gKiAgIGFycmF5IHwgZ3JvdXBCeTpmdW5jKClcclxuICogRXhhbXBsZTpcclxuICogICB7eyBbIHsgaWQ6ICcxJ31dIHwgIGdyb3VwQnk6IH19XHJcbiAqICAgZm9ybWF0cyB0bzogW11cclxuKi9cclxuQFBpcGUoe25hbWU6ICdncm91cEJ5J30pXHJcbmV4cG9ydCBjbGFzcyBHcm91cEJ5UGlwZSBpbXBsZW1lbnRzIFBpcGVUcmFuc2Zvcm0ge1xyXG4gIHRyYW5zZm9ybShhcnJheTogYW55W10sIGY6IGFueSk6IGFueVtdIHtcclxuICAgICAgdmFyIGdyb3VwcyA9IHt9O1xyXG4gICAgICBhcnJheS5mb3JFYWNoKChvOiBhbnkpID0+IHtcclxuICAgICAgICB2YXIgZ3JvdXAgPSBKU09OLnN0cmluZ2lmeShmKG8pKTtcclxuXHJcbiAgICAgICAgZ3JvdXBzW2dyb3VwXSA9IGdyb3Vwc1tncm91cF0gfHwgW107XHJcbiAgICAgICAgZ3JvdXBzW2dyb3VwXS5wdXNoKG8pO1xyXG4gICAgICB9KTtcclxuICAgICAgcmV0dXJuIE9iamVjdC5rZXlzKGdyb3VwcykubWFwKChncm91cDogYW55KSA9PiB7XHJcbiAgICAgICAgICByZXR1cm4gZ3JvdXBzW2dyb3VwXTtcclxuICAgICAgfSk7XHJcbiAgfVxyXG59XHJcbiJdfQ==