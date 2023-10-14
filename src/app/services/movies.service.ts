import {Injectable} from '@angular/core';
import  {HttpClient, HttpHeaders}  from "@angular/common/http";
import {catchError, empty, map, Observable, throwError, timeout} from "rxjs";
import {Movie} from "../clases/Movie";
import {Result} from "../clases/MovieResult";

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  TAG = 'movies.services.ts';
  constructor(private http: HttpClient) {

  }
  getMovies(): Observable<Movie> {
    const url = 'https://moviesdatabase.p.rapidapi.com/titles';
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': 'a75eedde27msh5c5d58c2d4fb67ep1d97d9jsna4ebfc81b7f9',
        'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com'
      }
    };
    return this.http.get<Movie>(url,options);
  }

}
