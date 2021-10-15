import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Acteur } from 'src/app/models/acteur';
import { Film } from 'src/app/models/film';
import { ActeurService } from 'src/app/services/acteur.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit {

  /**
   * On declare notre proprieter acteur pour stocker l'acteur 
   * @acteur
   */
  private acteur: Acteur = {} as Acteur;


  /**
   * On declare notre proprieter films pour stocker les films
   * @films
   */
  private films: Film[] = []

  constructor(private route: ActivatedRoute, private acteurService: ActeurService) { }

  ngOnInit() 
  {
    // on recup l'id qui se trouve dans l'url 
    let id = this.route.snapshot.url[1].path
    // on appel la methode getActeurInfo et on subscribe pour recup notre acteur 
    this.acteurService.getActeurInfo(id)
    // on utlise le pipe pour formatter nos data 
    .pipe(
      map(infoActeur => 
        {
          this.films = infoActeur['knownFor']

          this.acteur = {} as Acteur
          this.acteur.id = infoActeur['id']
          this.acteur.title = infoActeur['name']
          this.acteur.image = infoActeur['image']
          this.acteur.summary = infoActeur['summary']
          this.acteur.birthDate = infoActeur['birthDate']

        }))
      .subscribe((results) =>
      {
        
      })
  }

}
