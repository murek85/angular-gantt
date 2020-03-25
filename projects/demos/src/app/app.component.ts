import { Component, OnInit } from '@angular/core';
import { IGanttOptions, Project } from 'projects/gantt/src/lib';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  // Default options
  options: IGanttOptions = {
    scale: {
        start: new Date(2020, 0, 1),
        end: new Date(2020, 11, 31)
    }
  };

  project: Project = {
    id: 'dd10f0b6-b8a4-4b2d-a7df-b2c3d63b4a01',
    name: 'Angular2 Gantt',
    startDate: new Date(2020, 0, 1),
    tasks: [
      {
        id: 'ea2a8d86-1d4b-4807-844d-d5417fcf618d',
        name: '01-05 - 15-06',
        resource: 'res1',
        start: new Date('2020-05-01T00:00:00'),
        end: new Date('2020-06-15T23:59:59')
      }
    ]
  };

  ngOnInit() {
    this.loadBigDataSet(100);
  }

  createTask(element: any) {
    const parentTask = {
      id: 'parent_task_' + Math.random(),
      name: 'parent_task',
      start: new Date('2017-01-01T03:30:00.0Z'),
      end: new Date('2017-01-01T12:45:00.0Z')
    };
    this.project.tasks.push(parentTask);

    const childTask = {
      id: 'child_task_' + Math.random(),
      name: 'child3',
      percentComplete: 0,
      start: new Date('2017-01-01T03:30:00.0Z'),
      end: new Date('2017-01-01T12:45:00.0Z')
    };
    this.project.tasks.push(childTask);
  }

  updateTasks() {
    this.project.tasks = [];
  }

  loadBigDataSet(count) {
    const tasks = [];

    for (let i = 1; i <= count; i++) {
      const date = new Date();
      const task = {
        id: `parent${i}`,
        name: `task testing ${i}`,
        start: new Date(),
        end: new Date(date.setMonth(date.getMonth() + 1)),
      };
      tasks.push(task);
    }
    this.project.tasks = tasks;
  }

  gridRowClicked(event) {
    console.log(event);
  }
}
