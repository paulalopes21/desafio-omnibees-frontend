import { Component, OnInit } from '@angular/core';
import { Repository } from './../shared/repository';
import { RepositoriesService } from '../shared/repositories.service';
import { AuthenticationService } from '../../auth/services/authentication.service';
import { User } from '../../auth/models/user';

@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.scss']
})
export class ListingComponent implements OnInit {

  repositories: Repository[];
  currentUser: User;
  data: any;

  constructor(
    private repositoriesService: RepositoriesService,
    private authenticationService: AuthenticationService
  ) { this.authenticationService.currentUser.subscribe(x => this.currentUser = x);  }

  ngOnInit() {
    this.getUser();
  }

  getUser() {
    this.authenticationService.getUser(this.currentUser.access_token).subscribe(
      (data) => {
        this.data = data;
        this.getRepos();
      }
    );
  }

  getRepos() {
    this.repositoriesService.getRepoByUser(this.data.login)
      .subscribe((repositories) =>  {
        this.repositories = repositories;
      });
  }


}
