import { Component, OnInit } from '@angular/core';
import { Acteur } from '../models/acteur';
import { ActeurService } from '../services/acteur.service';

@Component({
  selector: 'app-acteur',
  templateUrl: './acteur.page.html',
  styleUrls: ['./acteur.page.scss'],
})
export class ActeurPage implements OnInit {

  /**
   * je declare la proprieter acteur qui va stocker mais acteurs
   * @acteur
   */
  private acteurs : Acteur[] = [];

  constructor(private acteurService: ActeurService) { }

  ngOnInit() {
  }

  searchbar( event )
  {
    // on recup la value de ma bar de recherche 
    var value = event.target.value

    // on va ubscribe a l'observable pour recup la liste d'acteurs
    this.acteurService.getActeurs(value)
      .subscribe((results) =>
      {
        // comme le result est un objet on cible l'array que l'on veut recup
        this.acteurs = results['results'];
      })
  }
}
