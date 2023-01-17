import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {JobService} from "@setbrain-dashboard/shared/data-access/users";

interface Project {
  id: string;
  name: string;
  created_at: Date;
  end_date: Date;
  project_icon_url: string;
}

@Component({
  selector: 'setbrain-dashboard-project-card',
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ProjectCardComponent implements OnInit {
  @Input() project!: Project;
  @Input() projectNotifications: number | undefined;
  @Input() active = false;
  isAdmin= false;

  constructor(public job: JobService) {}

  ngOnInit() {
    this.job.isAdmin().then(admin => this.isAdmin = admin as unknown as boolean);
  }
}
