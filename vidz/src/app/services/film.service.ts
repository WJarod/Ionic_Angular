import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Film } from '../models/film';


@Injectable({
  providedIn: 'root'
})
export class FilmService {

  /**
   * je déclare ma variable filmObservable qui est un BehaviorSubject
   * @filmObservable
   */
  private filmObservable : BehaviorSubject<Film[]> = new BehaviorSubject<Film[]>([]);

  /**
   * je déclare mon api keys pour pouvoir la changer quand je fait plus de 100 request 
   * @APIKEYS
   */
  private APIKEYS = "k_in84pj7w";

  /**
   * on injecte http pour utiliser c methode pour faire des requests et on injecte router pour recup 
   * un params d'une route 
   * @param http
   * @param route
   */
  constructor(private http: HttpClient) 
  {
    /**
     * On créer une promise qui va envoyer la liste de message dans mon observable 
     */
    this.http.get<Film[]>(`https://imdb-api.com/fr/API/MostPopularMovies/${this.APIKEYS}`)
      .toPromise()
        .then(result => this.filmObservable.next(result))
  }

  /**
   * Cette methode a pour but de nous return un observable de ma liste de films
   * @returns 
   */
  getMostPopularFilms() : Observable<Film[]>
  {
    return this.filmObservable.asObservable();
  }

  /**
   * Cette methode a pour but de refresh mon observable 
   * de la liste de films 
   */

  refreshMostPopularFilms() : void 
  {
    this.http.get<Film[]>(`https://imdb-api.com/fr/API/MostPopularMovies/${this.APIKEYS}`)
      .toPromise()
        .then(result => this.filmObservable.next(result));
  }

  /**
   * on recup la value title qui va nous permettre de faire la request sur le titre que l'on recherche 
   * cette methode va nous return un observable qui contient la liste de films  
   * @param title 
   * @returns 
   */
  getFilmByTittle(title) : Observable<Film[]>
  {
    return this.http.get<Film[]>(`https://imdb-api.com/fr/API/SearchTitle/${this.APIKEYS}/${title}`);
  }

  /**
   * on recup notre route actuel pour recup l'id en params 
   * cette methode va nous return un observable qui contient le film 
   * @param id 
   * @returns 
   */
  getFilm(id) : Observable<Film>
  {
    return this.http.get<Film>(`https://imdb-api.com/fr/API/Title/${this.APIKEYS}/${id}`)
  }
}
