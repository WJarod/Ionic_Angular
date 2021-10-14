import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-callback',
  templateUrl: './callback.component.html',
  styleUrls: ['./callback.component.scss'],
})
export class CallbackComponent implements OnInit {

  constructor(private router: ActivatedRoute, private authService: AuthService ) { }

  ngOnInit() 
  {
    let url = this.router.snapshot.url.toString();
    let token = url.slice(url.indexOf('=')+1, url.indexOf('&'));
    console.log(token);
    this.authService.setToken(token);
  }

}
