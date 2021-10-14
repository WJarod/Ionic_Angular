import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private user: User; // utiliser un BehaviorSubject

  constructor(private http: HttpClient) { }

  /**
   * on verify si l'utilisatuer et autoriser 
   * @param callback 
   */
  async verifyUser()
  {
    return this.http.get('https://openidconnect.googleapis.com/v1/userinfo')
      .toPromise()
        .then(result =>
          {
            this.user = result as User // a corriger
            return true;
          })
        .catch(error =>
          {
            return false;
          })
  }

  /**
   * Permet de recup le token en arguemnt pour le stocker dans le localStorage
   * @param token 
   */
  setToken(token : string)
  {
    localStorage.setItem('token', token);
  }

  /**
   * Permet de recup mon token stocker dans le localStorage
   * @returns localStorage
   */
  getToken(): String
  {
    return localStorage.getItem('token');
  }

  /**
   * le code ci dessous ne fonctione que sur navigateur
   * utiliser la biblio angular/oauth2 pour la page login
   */
  login()
  {
    window.location.replace('https://accounts.google.com/o/oauth2/v2/auth?client_id=488533050494-nilmcrleh34r44km88eo3jb1q5541q72.apps.googleusercontent.com&redirect_uri=http://localhost:8100/auth&response_type=token&scope=profile');
  }
}
