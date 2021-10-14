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
  private filmsObservable : BehaviorSubject<Film[]> = new BehaviorSubject<Film[]>([]);
  // Test Loic
  private filmObservable : BehaviorSubject<Film>;


  /**
   * je déclare mon api keys pour pouvoir la changer quand je fait plus de 100 request 
   * @APIKEYS
   */
  private APIKEYS = "k_rjbzywnu";

  /**
   * on injecte http pour utiliser c methode pour faire des requests et on injecte router pour recup 
   * un params d'une route 
   * @param http
   * @param route
   */
  constructor(private http: HttpClient) 
  {
    this.filmObservable = new BehaviorSubject<Film>({})
    /**
     * Test Loic
     * condition qui permet de dire que si le localStorage n'est pas vide 
     * je renvoie mon localStorage dans mon observable 
     * sinon on fait la request 
     */
    if (localStorage.getItem('films') !== undefined)
    {
      // on alimente l'observable avec les info du local storage  
      this.filmsObservable.next(JSON.parse(localStorage.getItem('films')));
    }else
    {
      /**
       * On créer une promise qui va envoyer la liste de message dans mon observable 
       */
      this.http.get<Film[]>(`https://imdb-api.com/fr/API/MostPopularMovies/${this.APIKEYS}`)
      .toPromise()
        .then(result => 
          {
            // on alimente l'observable avec les info de la request 
            this.filmsObservable.next(result);
            // on met a jour le localStoreage 
            localStorage.setItem('films',JSON.stringify(result))
          })
      }
  }

  /**
   * Cette methode a pour but de nous return un observable de ma liste de films
   * @returns 
   */
  getMostPopularFilms() : Observable<Film[]>
  {
    return this.filmsObservable.asObservable();
  }

  /**
   * Cette methode a pour but de refresh mon observable 
   * de la liste de films 
   */

  refreshMostPopularFilms() : void 
  {
    this.http.get<Film[]>(`https://imdb-api.com/fr/API/MostPopularMovies/${this.APIKEYS}`)
      .toPromise()
        .then(result => this.filmsObservable.next(result));
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


  /**
   * Test Loic
   * on recup notre route actuel pour recup l'id en params 
   * cette methode va nous return un observable qui contient le film 
   * @param id 
   * @returns 
   */
  getObservableFilm(id) : Observable<Film>
  {
    // on recup le film
    let film = this.filmsObservable.getValue().find(f =>
      {
        f.id = id
      });
      // si le details du film est deja pret n envoie dans l'observable 
    if (film.detail) this.filmObservable.next(film);
    // si le deatils du film n'est pas pret alors on va le chercher 
    if (!film.detail) this.getFilm(id).subscribe(f=> 
      {
        // on passe detail à true 
        f.detail = true;
        // on le met dans l'observable 
        this.filmObservable.next(f);
        // on alimente 
        let films = this.filmsObservable.getValue();
        films.forEach(film => 
          {
            if(film.id === id) film = f
          })
          // on met a jour l'observable et le local 
          this.filmsObservable.next(films)
          localStorage.setItem('films',JSON.stringify(films));
      })
    return this.filmObservable;
  }
}
