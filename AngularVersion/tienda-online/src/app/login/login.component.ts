import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  errorLogin:boolean = false;
  constructor(public afAuth: AngularFireAuth, private router: Router) { }

  ngOnInit() {
  }

  login(email, password) {
      this.afAuth.auth.signInWithEmailAndPassword(email, password).then(()=>{
        this.router.navigateByUrl('/home');
      })
      .catch((error) => {
        this.errorLogin = true;
      })
  }

}
