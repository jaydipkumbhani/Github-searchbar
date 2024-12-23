import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './routing/app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header-footer/header/header.component';
import { SearchComponent } from './components/search/search.component';
import { SearchbarComponent } from './components/searchbar/searchbar.component';
import { CustomStyleDirective } from './custom-directive/custom-style.directive';
import { SearchResultComponent } from './components/search-result/search-result.component';
import { SearchedUserListComponent } from './components/searched-user-list/searched-user-list.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FiveStarReposComponents } from './components/five-star-repos/five-star-repos.component';
import { ContributionCalendarComponent } from './components/contribution-calendar/contribution-calendar.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SearchComponent,
    SearchbarComponent,
    CustomStyleDirective,
    SearchResultComponent,
    SearchedUserListComponent,
    FiveStarReposComponents,
    ContributionCalendarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
