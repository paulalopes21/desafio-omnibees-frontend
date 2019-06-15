import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RepositoriesRoutingModule } from './repositories-routing.module';
import { ListingComponent } from './listing/listing.component';

@NgModule({
  declarations: [ListingComponent],
  imports: [
    CommonModule,
    RepositoriesRoutingModule
  ],
  exports: []
})
export class RepositoriesModule { }
