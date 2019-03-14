import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from "@angular/router"

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  constructor(public userService: UserService, private router: Router) {
    this.registerForm = new FormGroup({
      nom: new FormControl('', [Validators.required]),
      prenom: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.email, Validators.required]),
      role: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.minLength(8), , Validators.required]),
      password2: new FormControl('', [Validators.required]),
      Tel: new FormControl('', [Validators.required]),
      DateNais: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit() {
  }
  createUser() {
    console.log(this.registerForm.value)
    this.userService.createUser(this.registerForm.value).subscribe((res) => {
      console.log(res);
      this.router.navigateByUrl('/login')
    });
  }

}






