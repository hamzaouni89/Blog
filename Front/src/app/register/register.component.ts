import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm : FormGroup;
  constructor(public userService: UserService) {
    this.registerForm = new FormGroup({
      username : new FormControl(),
      email: new FormControl(),
      password: new FormControl()
    });
  }

  ngOnInit() {
  }
  createUser() {
    console.log(this.registerForm.value)
    this.userService.createUser(this.registerForm.value).subscribe((res) => {
      
    });
  }

}





 
