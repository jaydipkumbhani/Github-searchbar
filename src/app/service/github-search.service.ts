import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Subject, tap, throwError } from 'rxjs';
import { environment } from '../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class GithubSearchService {
  baseURL = environment.baseURL;
  token = environment.token;
  public userInfo = new Subject<Object>();

  constructor(private http: HttpClient) {}

  getUserInfo(username: string) {
    // return this.http.get(`${this.baseURL}/users/${username}`)
    return this.http
      .get(`${this.baseURL}/users/${username}`)
      .pipe(tap((userInfo) => this.userInfo.next(userInfo)));
  }

  getUserRepos(username: string) {
    return this.http.get(`${this.baseURL}/users/${username}/repos`);
  }

  getContributions(username: string) {
    const headers = new HttpHeaders({
      Authorization: `bearer ${this.token}`,
      'Content-Type': 'application/json',
    });
    const body = {
      query: `query {
                user(login: "${username}") {
                name
                contributionsCollection {
                    contributionCalendar {
                    colors
                    totalContributions
                    weeks {
                        contributionDays {
                        color
                        contributionCount
                        date
                        weekday
                        }
                        firstDay
                    }
                    }
                }
                }
            }`,
    };

    return this.http
      .post(`https://api.github.com/graphql`, JSON.stringify(body), {
        headers: headers,
      })
      .pipe(
        map((response: any) => {
          let weeks =
            response.data.user.contributionsCollection.contributionCalendar
              .weeks;
          const contributionDays = weeks.flatMap(
            (week: any) => week.contributionDays
          );

          return contributionDays.reduce(
            (
              acc: { [key: string]: { count: number; color: string } },
              day: any
            ) => {
              acc[day.date] = {
                count: day.contributionCount,
                color: day.color,
              };
              return acc;
            },
            {}
          );
        }),
        catchError(this.handleError)
      );

    // const response = await fetch('https://api.github.com/graphql', {
    //   method: 'POST',
    //   body: JSON.stringify(body),
    //   headers: headers,
    // });
    // const data = await response.json();
    // return data.data.user.contributionsCollection.contributionCalendar;
  }

  handleError(error: HttpErrorResponse) {
    return throwError(error);
  }
}
