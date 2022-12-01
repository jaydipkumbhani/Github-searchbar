import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from '../environment/environment';


@Injectable({
    providedIn: 'root'
})

export class GithubSearchService {

    baseURL = environment.baseURL;
    public userInfo = new Subject<string>();

    constructor(private http: HttpClient) { }

    getUserInfo(username: string) {
        return this.http.get(`${this.baseURL}/users/${username}`)
    }

    getUserRepos(username: string) {
        return this.http.get(`${this.baseURL}/users/${username}/repos`);
    }

}