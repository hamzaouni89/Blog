import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../service/article.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {
  AjoutForm: FormGroup;
  selectedImage: File;
  users: any[];
  token: string;
  ID: any;
  EditUser: FormGroup;

  constructor(public articleService: ArticleService, private userService: UserService) {
    this.AjoutForm = new FormGroup({
      titre: new FormControl(),
      contenue: new FormControl(),
      type: new FormControl(),
      ArticleImage: new FormControl(),
    });
    this.EditUser = new FormGroup({
      nom: new FormControl(),
      prenom: new FormControl(),
      email: new FormControl(),
      Tel: new FormControl(),
      DateNais: new FormControl(),

    });
  }

  ngOnInit() {
    this.token = this.userService.getToken();
    // this.userService.getUser(this.ID).subscribe(async (user: any) => {
    //   this.users = [user];
    // });
  }
  handleFileInput(files: FileList) {
    this.selectedImage = files.item(0);
  }
  createArticle() {
    console.log(this.selectedImage)
    this.AjoutForm.value.ArticleImage = this.selectedImage.name;
    this.articleService.createArticle(this.AjoutForm.value).subscribe((res) => {
      const file = new FormData()
      file.append("ArticleImage", this.selectedImage);
      this.articleService.uploadImage(file).subscribe(res => console.log(res))
      console.log(res);

    });
  }
  // getArticlesById() {
  //   this.articleService.getArticlesById().subscribe((res) => {
  //     console.log(res)
  //     this.AjoutForm.value.owner = this.decoded._id;
  //     this.articles = res;
  //   })

  // }
  update(user) {
    console.log(this.userService.connectedUser._id)
    this.EditUser = new FormGroup({
      nom: new FormControl(this.userService.connectedUser.nom),
      prenom: new FormControl(this.userService.connectedUser.prenom),
      email: new FormControl(this.userService.connectedUser.email),
      Tel: new FormControl(this.userService.connectedUser.Tel),
      DateNais: new FormControl(this.userService.connectedUser.DateNais),
      _id: new FormControl(this.userService.connectedUser._id),

    });
    console.log(this.EditUser);
  }
  UpdateUser(user) {
    // console.log(this.userService.getUser(this.userService.connectedUser._id));

    return this.userService.UpdateUser(user).subscribe((res) => {

      this.userService.getUser(this.userService.connectedUser._id);
      user = res;
      localStorage.removeItem("token");
      localStorage.setItem('token', user.token);
      this.userService.connectedUser = this.userService.getDecodedToken();


    });
  }


}



