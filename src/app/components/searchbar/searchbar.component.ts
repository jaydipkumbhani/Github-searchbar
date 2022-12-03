import { AfterViewChecked, Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { GithubSearchService } from 'src/app/service/github-search.service';

@Component({
    selector: 'app-searchbar',
    templateUrl: './searchbar.component.html',
    styleUrls: ['./searchbar.component.css']
})

export class SearchbarComponent implements OnInit, AfterViewChecked {

    @ViewChild("username", { static: true }) input: ElementRef;
    @Output() userInfo = new EventEmitter();

    formGroup = this.fb.group({
        username: ['', [Validators.required]]
    });
    isAPIRunning: boolean = false;
    oldValue: any = null;

    constructor(private fb: FormBuilder,
        private githubSearchService: GithubSearchService) { }

    ngOnInit() {

    }

    ngAfterViewChecked() {
        this.input.nativeElement.focus();
    }

    onSearch() {
        const username: any = this.formGroup.value && this.formGroup.value.username;
        if (!this.isAPIRunning && this.formGroup.valid) {
            this.isAPIRunning = true;
            this.oldValue = username;
            forkJoin([
                this.githubSearchService.getUserInfo(username),
                this.githubSearchService.getUserRepos(username)
            ]).subscribe((res: any) => {
                console.log(res);
                // let topFiveRepos = res[1].sort((a: any, b: any) => {
                //     return b.stargazers_count - a.stargazers_count
                // }).slice(0, 5)
                // console.log(topFiveRepos)
                // this.isAPIRunning = false;
                this.handleResponse(res);
            }, (err) => {
                this.handleError(err);
            })
        }
    }


    handleResponse(userInfo: any) {
        this.isAPIRunning = false;
        let topFiveRepos = userInfo[1].sort((a: any, b: any) => {
            return b.stargazers_count - a.stargazers_count
        }).slice(0, 5);
        console.log(topFiveRepos);
        this.userInfo.emit({ userInfo: userInfo[0], topFiveRepos: topFiveRepos })
    }

    handleError(err: any) {
        this.isAPIRunning = false;
        this.userInfo.emit({ error: err })
    }

    resetEverything() {
        this.formGroup.reset();
        this.isAPIRunning = false;
        this.userInfo.emit(null);
    }
}