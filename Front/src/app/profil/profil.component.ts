import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../service/article.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {
  AjoutForm: FormGroup;
  selectedImage: File;

  constructor(public articleService: ArticleService, ) {
    this.AjoutForm = new FormGroup({
      titre: new FormControl(),
      contenue: new FormControl(),
      type: new FormControl(),
      selectImage: new FormControl(),
    });
  }

  ngOnInit() {
  }

  createArticle() {
    this.articleService.createArticle(this.AjoutForm.value).subscribe((res) => {
      console.log(res);
    });
  }
}
