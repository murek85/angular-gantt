import { Component, OnInit } from "@angular/core";
import { IGanttOptions, Project } from "projects/gantt/src/lib";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
  // Default options
  options: IGanttOptions = {
    scale: {
      start: new Date(2020, 0, 1),
      end: new Date(2020, 11, 31),
    },
    gridColumns: [
      { left: 0, width: 16 },
      { name: "Grupa asortymentów", left: 0, width: 330 },
    ],
  };

  project: Project = {
    name: "Angular Gantt",
    startDate: new Date(2020, 0, 1),
    tasks: [
      {
        name: "01-02 - 15-02 01-02 - 15-0201-02 - 15-0201-02 - 15-0201-02 - 15-0201-02 - 15-0201-02 - 15-0201-02 - 15-0201-02 - 15-0201-02 - 15-0201-02 - 15-0201-02 - 15-0201-02 - 15-0201-02 - 15-0201-02 - 15-0201-02 - 15-0201-02 - 15-0201-02 - 15-0201-02 - 15-0201-02 - 15-0201-02 - 15-0201-02 - 15-0201-02 - 15-0201-02 - 15-0201-02 - 15-0201-02 - 15-0201-02 - 15-02",
        resource: "res1",
        start: new Date("2020-02-01T00:00:00"),
        end: new Date("2020-02-15T23:59:59"),
        color: {
          primary: "rgba(244,67,54,1)",
          secondary: "rgba(244,67,54,.2)",
        },
      },
      {
        name: "01-03 - 15-03",
        resource: "res1",
        start: new Date("2020-03-01T00:00:00"),
        end: new Date("2020-03-15T23:59:59"),
        color: {
          primary: "rgba(244,67,54,1)",
          secondary: "rgba(244,67,54,.2)",
        },
      },
      {
        name: "01-02 - 15-03",
        resource: "res1",
        start: new Date("2020-02-01T00:00:00"),
        end: new Date("2020-03-15T23:59:59"),
        color: {
          primary: "rgba(244,67,54,1)",
          secondary: "rgba(244,67,54,.2)",
        },
      },
    ],
  };

  ngOnInit() {}

  createTask(elem: any) {
    this.options.scale.start = new Date(2019, 0, 1);
    this.options.scale.end = new Date(2019, 11, 31);
    this.project.startDate = new Date(2019, 0, 1);
    this.project.tasks = [
      {
        name: "child3",
        resource: "res1",
        start: new Date("2019-02-01T03:30:00.0Z"),
        end: new Date("2019-03-01T12:45:00.0Z"),
        color: {
          primary: "rgba(244,67,54,1)",
          secondary: "rgba(244,67,54,.2)",
        },
      },
    ];
  }

  updateTasks() {
    this.project.tasks = [];
  }

  loadBigDataSet(count) {
    const tasks = [];

    for (let i = 1; i <= count; i++) {
      const date = new Date();
      const task = {
        name: `task testing ${i}`,
        start: new Date(),
        end: new Date(date.setMonth(date.getMonth() + 1)),
        color: {
          primary: "rgba(244,67,54,1)",
          secondary: "rgba(244,67,54,.2)",
        },
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
