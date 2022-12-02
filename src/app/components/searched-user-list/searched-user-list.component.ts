import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-searched-user-list',
  templateUrl: './searched-user-list.component.html',
  styleUrls: ['./searched-user-list.component.css']
})
export class SearchedUserListComponent {

  @Input() users: Array<any> = [];
  @Output() userSelected = new EventEmitter<any>();

  selectUser(user: any) {
    this.userSelected.emit({ userInfo: user.userInfo, topFiveRepos: user.topFiveRepos });
  }

}
