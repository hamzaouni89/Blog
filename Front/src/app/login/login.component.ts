import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Router, Params } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {



  loginForm: FormGroup;
  constructor(public userService: UserService, private router: Router) {
    this.loginForm = new FormGroup({
      email: new FormControl(),
      password: new FormControl()
    });
  }
  ngOnInit() {
    console.log(localStorage.getItem('token'));

  }

  login(user) {

    this.userService.loginUser(user).subscribe((res: any) => {

      if (res.Message === "authentification valide") {
        localStorage.setItem('token', res.token);
        this.userService.connectedUser = this.userService.getDecodedToken();
        this.router.navigate(['/']);

        //location.reload();
      }
      else {
        console.log("user invalide");
      }
    });
  }





}



