import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Acteur } from '../models/acteur';


@Injectable({
  providedIn: 'root'
})
export class ActeurService {

  /**
   * je déclare ma variable filmObservable qui est un BehaviorSubject
   * @AacteusrsObservable
   */
   private AacteursObservable : BehaviorSubject<Acteur[]> = new BehaviorSubject<Acteur[]>([]);

  /**
   * on injecte http pour utiliser c methode pour faire des requests
   * @param http
   */

  /**
   * je déclare mon api keys pour pouvoir la changer quand je fait plus de 100 request 
   * @APIKEYS
   */
   private APIKEYS = "k_in84pj7w";
  constructor(private http: HttpClient) { }

  /**
   * on recup le nom qui va nous permettre de faire une request sur le nom que l'on recherche 
   * et on return un observalbe avec notre liste d'acteurs
   * @param name 
   * @returns 
   */
  getActeurs(name : String) : Observable<Acteur[]>
  {
    return this.http.get<Acteur[]>(`https://imdb-api.com/fr/API/SearchName/${this.APIKEYS}/${name}`);
  }

  /**
   * on recup l id pour faire une recherche par rapport a l'id de l'acteur 
   * cette recherche va nous return c'est info
   * @param id 
   * @returns 
   */
  getActeurInfo(id : String) : Observable<Acteur[]>
  {
    return this.http.get<Acteur[]>(`https://imdb-api.com/fr/API/Name/${this.APIKEYS}/${id}`);
  }
}
