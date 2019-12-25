import {Router} from "@angular/router";
import {Component} from "@angular/core";


@Component({
  selector: 'app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})

export class AppComponent {

  constructor(private router: Router){}

  isVideoSessionUrl(){
    return (this.router.url.substring(0, '/session/'.length) === '/session/');
  }

}
