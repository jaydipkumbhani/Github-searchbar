import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent {
  users: Array<any> = [];
  repos: Array<any> = [];
  selectedUser: any;
  contributions: any = {};

  constructor() {}

  setUserInfo(e: any) {
    if (e) {
      this.updateUsersInfo();
      this.selectedUser = e.userInfo || e.error;
      this.repos = e.topFiveRepos;
      console.log(this.repos);
      console.log(this.selectedUser);
    } else {
      this.resetAll();
    }
  }

  setUserRepos(e: any) {
    this.contributions = e;
  }

  updateUsersInfo() {
    if (this.selectedUser && this.selectedUser.id) {
      let result = this.users.find((obj) => {
        console.log(obj.userInfo.id);
        return obj.userInfo.id == this.selectedUser.id;
      });
      if (!result) {
        this.users.unshift({
          userInfo: this.selectedUser,
          topFiveRepos: this.repos,
        });
      }
    }
  }

  resetAll() {
    this.users = [];
    this.selectedUser = null;
    this.repos = [];
  }
}
