import { Component, OnInit, ElementRef } from '@angular/core';
import { ArticleService } from '../service/article.service';
import { FormGroup, FormControl } from '@angular/forms';
import * as jwt_decode from "jwt-decode";
import { FileUploader } from 'ng2-file-upload/ng2-file-upload';
import { Http, Response } from '@angular/http';

//const URL = 'http://localhost:8000/article/upload';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {
  public uploader: FileUploader = new FileUploader({});
  selectedImage: File;
  image: any;
  public imagePath;
  imgURL: any;

  articles;
  decoded = jwt_decode(localStorage.getItem('token'));
  formArticle: FormGroup;
  formArticleModifer: FormGroup;
  http: Http;
  el: ElementRef;
  constructor(public articleService: ArticleService) {
    this.formArticle = new FormGroup({
      titre: new FormControl(),
      contenue: new FormControl(),
      type: new FormControl(),
      ArticleImage: new FormControl(),
      owner: new FormControl(),
    });
    this.formArticleModifer = new FormGroup({
      titre: new FormControl(),
      contenue: new FormControl(),
      type: new FormControl(),
      ArticleImage: new FormControl(),
      owner: new FormControl(),
    });

  }

  ngOnInit() {
    this.getArticles();

  }
  /*  upload() {
     let inputEl: HTMLInputElement = this.el.nativeElement.querySelector('#photo');
     let fileCount: number = inputEl.files.length;
     let formData = new FormData();
     if (fileCount > 0) {
       formData.append('photo', inputEl.files.item(0));
       this.articleService.getImage(formData).subscribe(res => console.log(res));
 
     }
   } */
  createArticle() {
    console.log(this.formArticle.value)
    this.formArticle.value.owner = this.decoded._id;
    console.log(this.formArticle.value.owner, this.decoded._id);
    this.articleService.createArticle(this.formArticle.value).subscribe((res) => {
      this.getArticles();
    });
  }
  getImage(image) {
    this.articleService.getImage(image).subscribe(() => {
      return this.getArticles();
    })
  }

  getArticles() {
    this.articleService.getArticles().subscribe((res) => {
      console.log(res)
      this.formArticle.value.owner = this.decoded._id;
      this.articles = res;
    })
  }

  deleteArticle(article) {
    console.log(article)
    this.articleService.deleteArticle(article).subscribe(() => {
      return this.getArticles();
    })
  }

  update(article) {

    console.log(article)
    this.formArticleModifer = new FormGroup({
      titre: new FormControl(article.titre),
      description: new FormControl(article.description),
      type: new FormControl(article.type)
    });
  }

  updateArticle(article) {

    article.titre = this.formArticleModifer.controls.titre.value;
    article.description = this.formArticleModifer.controls.description.value;
    console.log(article)
    return this.articleService.updateArticle(article).subscribe((res) => {
      article = res;

    });
  }
}
