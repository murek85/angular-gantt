import { Component, OnInit } from '@angular/core';
import { IGanttOptions, Project } from 'projects/gantt/src/lib';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
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
        start: new Date('2020-02-01T00:00:00'),
        end: new Date('2020-02-15T23:59:59'),
        color: { 
          primary: 'rgba(244,67,54,1)',
          secondary: 'rgba(244,67,54,.2)'
        }
      },
      {
        id: 'ea2a8d86-1d4b-4807-844d-d5417fcf618d',
        name: '01-05 - 15-06',
        resource: 'res1',
        start: new Date('2020-03-01T00:00:00'),
        end: new Date('2020-03-15T23:59:59'),
        color: { 
          primary: 'rgba(244,67,54,1)',
          secondary: 'rgba(244,67,54,.2)'
        }
      },
      {
        id: 'ea2a8d86-1d4b-4807-844d-d5417fcf618d',
        name: '01-05 - 15-06',
        resource: 'res1',
        start: new Date('2020-02-01T00:00:00'),
        end: new Date('2020-03-15T23:59:59'),
        color: { 
          primary: 'rgba(244,67,54,1)',
          secondary: 'rgba(244,67,54,.2)'
        }
      }
    ]
  };

  ngOnInit() {
    // this.loadBigDataSet(100);
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
        end: new Date(date.setMonth(date.getMonth() + 1))
      };
      tasks.push(task);
    }
    this.project.tasks = tasks;
  }

  gridRowClicked(event) {
    console.log(event);
  }

  popoverOpened(event) {
    event.description = `<span>
    <strong>Umowa:</strong> UAT-231-212-2020<br />
    <strong>Wykonawca:</strong> Wściekły pies<br />
    <strong>Okres:</strong> 23-01-2020 - 29-12-2020<br />
    <strong>Status:</strong> Realizowana
    </span>`;
  }
}
