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
       console.log(this.films)
      });
  }
  searchbar( event )
  {
    // on recup la value de la bar de recherche 
    var value = event.target.value
    // on fait une condition pour qu'il ne recherhe pas si la value est vide 
    if (value != '')
    {
      /**
     * On subscribe à l'observable pour recup notre liste de film
     */
      this.filmService.getFilmByTittle(value)
        .subscribe((result) =>
          {
            // comme le result est un objet on cible l'array que l'on veut recup
            this.films = result['results'] ;
            console.log(this.films)
          })
    }
  }

}
