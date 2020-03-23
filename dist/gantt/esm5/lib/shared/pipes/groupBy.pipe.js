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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JvdXBCeS5waXBlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1nYW50dC8iLCJzb3VyY2VzIjpbImxpYi9zaGFyZWQvcGlwZXMvZ3JvdXBCeS5waXBlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsSUFBSSxFQUFpQixNQUFNLGVBQWUsQ0FBQzs7Ozs7Ozs7OztBQVVwRDtJQUFBO0lBY0EsQ0FBQzs7Ozs7O0lBWkMsK0JBQVM7Ozs7O0lBQVQsVUFBVSxLQUFZLEVBQUUsQ0FBTTs7WUFDdEIsTUFBTSxHQUFHLEVBQUU7UUFDZixLQUFLLENBQUMsT0FBTyxDQUFDLFVBQUMsQ0FBTTs7Z0JBQ2YsS0FBSyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBRWhDLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDO1lBQ3BDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDeEIsQ0FBQyxDQUFDLENBQUM7UUFDSCxPQUFPLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxDQUFDLFVBQUMsS0FBVTtZQUN0QyxPQUFPLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN6QixDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7O2dCQWJGLElBQUksU0FBQyxFQUFDLElBQUksRUFBRSxTQUFTLEVBQUM7O0lBY3ZCLGtCQUFDO0NBQUEsQUFkRCxJQWNDO1NBYlksV0FBVyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFBpcGUsIFBpcGVUcmFuc2Zvcm0gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuLypcclxuICogR3JvdXAgdGhlIGFycmF5IGJ5IGdpdmVuIGZ1bmN0aW9uXHJcbiAqIFRha2VzIGFuIGFycmF5IGFyZ3VtZW50IHRoYXQgZGVmYXVsdHMgdG8gMS5cclxuICogVXNhZ2U6XHJcbiAqICAgYXJyYXkgfCBncm91cEJ5OmZ1bmMoKVxyXG4gKiBFeGFtcGxlOlxyXG4gKiAgIHt7IFsgeyBpZDogJzEnfV0gfCAgZ3JvdXBCeTogfX1cclxuICogICBmb3JtYXRzIHRvOiBbXVxyXG4qL1xyXG5AUGlwZSh7bmFtZTogJ2dyb3VwQnknfSlcclxuZXhwb3J0IGNsYXNzIEdyb3VwQnlQaXBlIGltcGxlbWVudHMgUGlwZVRyYW5zZm9ybSB7XHJcbiAgdHJhbnNmb3JtKGFycmF5OiBhbnlbXSwgZjogYW55KTogYW55W10ge1xyXG4gICAgICB2YXIgZ3JvdXBzID0ge307XHJcbiAgICAgIGFycmF5LmZvckVhY2goKG86IGFueSkgPT4ge1xyXG4gICAgICAgIHZhciBncm91cCA9IEpTT04uc3RyaW5naWZ5KGYobykpO1xyXG5cclxuICAgICAgICBncm91cHNbZ3JvdXBdID0gZ3JvdXBzW2dyb3VwXSB8fCBbXTtcclxuICAgICAgICBncm91cHNbZ3JvdXBdLnB1c2gobyk7XHJcbiAgICAgIH0pO1xyXG4gICAgICByZXR1cm4gT2JqZWN0LmtleXMoZ3JvdXBzKS5tYXAoKGdyb3VwOiBhbnkpID0+IHtcclxuICAgICAgICAgIHJldHVybiBncm91cHNbZ3JvdXBdO1xyXG4gICAgICB9KTtcclxuICB9XHJcbn1cclxuIl19