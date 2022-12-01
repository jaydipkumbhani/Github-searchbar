import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
    selector: 'app-search-result',
    templateUrl: './search-result.component.html',
    styleUrls: ['./search-result.component.css']
})

export class SearchResultComponent implements OnChanges {

    @Input() selectedUser: any;
    userCreationDate: any;
    noUserFound: boolean = false;
    userInfo = null;
    error = false;


    ngOnChanges(changes: SimpleChanges) {
        console.log(changes);
        console.log(changes['selectedUser']) // you can get selectedUser 
        for (let propName in changes) { // you can get selectedUser to use for-in loop
            let change = changes[propName];
            console.log(change);
            if (change && change.currentValue) {
                this.updateSelectedUserInfo(change.currentValue);
            }
        }
    }

    updateSelectedUserInfo(userInfo: any) {
        console.log(userInfo)
        this.selectedUser = userInfo;
        // console.log(this.selectedUser.created_at)
        this.userCreationDate = new Date(this.selectedUser.created_at).toLocaleDateString();
        this.checkIfUserFoundOrNot();
    }

    checkIfUserFoundOrNot() {
        if (this.selectedUser.status == 404) {
            this.selectedUser = false;
            this.noUserFound = true;
            this.error = false;
        } else if (this.selectedUser.status == 403) {
            this.selectedUser = false;
            this.noUserFound = true;
            this.error = true;
        } else {
            this.error = false;
            this.noUserFound = false;
        }
    }


}