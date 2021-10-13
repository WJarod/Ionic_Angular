import { Component, OnInit } from '@angular/core';
import { Film } from '../models/film';
import { FilmService } from '../services/film.service';

@Component({
  selector: 'app-film',
  templateUrl: './film.page.html',
  styleUrls: ['./film.page.scss'],
})
export class FilmPage implements OnInit {

  /**
   * je déclare ma variable fimls pour stocker ma liste de films
   * @films
   */
   private films : Film[] = []

  /**
   * on injecte FilmService pour utiliser c methode
   * @param  filmService
   */
  constructor(private filmService : FilmService) { }

  ngOnInit()
  {
    /**
     * On subscribe à l'observable pour recup notre liste de film
     */
    this.filmService.getMostPopularFilms()
      .subscribe((result) => 
      {
        // comme le result est un objet on cible l'array que l'on veut recup
       this.films = result['items']
      });
  }
  searchbar( event )
  {
    // on recup la value de la bar de recherche 
    var value = event.target.value
  
    // cette condition permet que des que le champ de recherche est vide on refresh pour recup la liste de films
    if (value == '')
    {
      this.filmService.refreshMostPopularFilms();
    }
    else
    {
       /**
     * On subscribe à l'observable pour recup notre liste de film
     */
      this.filmService.getFilmByTittle(value)
        .subscribe((result) =>
          {
            // comme le result est un objet on cible l'array que l'on veut recup
            this.films = result['results'] ;
          })
      }
  }

}
