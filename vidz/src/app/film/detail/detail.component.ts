import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FilmService } from 'src/app/services/film.service';
import { Film } from 'src/app/models/film';
import { Acteur } from 'src/app/models/acteur';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit {

  /**
   * je déclare ma variable fiml pour stocker mon film
   * @films
   */
   private film: Film = {} as Film;

   /**
    * je déclare ma variable acteurs pour stocker les acteurs qui on participer au film
    * @acteurs
    */
  private acteurs: Acteur[] = [];

/**
   * on injecte FilmService pour utiliser c methode
   * @param  filmService
   */
  constructor(private filmService : FilmService, private route: ActivatedRoute) { }

  /**
   * on recup l'id et on subscribe a un observable qui return le film
   */
  ngOnInit() 
  {
    let id = this.route.snapshot.url[1].path
    this.filmService.getFilm(id)
      .subscribe((result) => 
      {
        this.acteurs = result['starList']
        this.film = result;
      })
  }

}
