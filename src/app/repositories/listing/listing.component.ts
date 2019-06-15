import { Component, OnInit } from '@angular/core';
import { Repository } from './../shared/repository';
import { RepositoriesService } from '../shared/repositories.service';

@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.scss']
})
export class ListingComponent implements OnInit {

  repositories: Repository[];


  constructor(private repositoriesService: RepositoriesService) { }

  ngOnInit() {
    this.getRepos();
  }


  getRepos(): void {
    this.repositoriesService.getRepoByUser('paulalopes21')
      .subscribe(repositories =>  this.repositories = repositories);
  }

}
