import { Component, OnInit, ElementRef } from '@angular/core';
import { ArticleService } from '../service/article.service';
import { FormGroup, FormControl } from '@angular/forms';
import * as jwt_decode from "jwt-decode";
import { Http, Response } from '@angular/http';
import { UserService } from '../service/user.service';


@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {
 
  selectedImage: File;
  image: any;
  public imagePath;
  imgURL: any;

  articles;
  formArticle: FormGroup;
  formArticleModifer: FormGroup;
  http: Http;
  el: ElementRef;
  constructor(public articleService: ArticleService, private userService: UserService) {
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

  createArticle() {
    console.log(this.formArticle.value)
    this.formArticle.value.owner = this.userService.connectedUser._id;
    console.log(this.formArticle.value.owner, this.userService.connectedUser._id);
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
      this.formArticle.value.owner = this.userService.connectedUser._id;
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
      contenue: new FormControl(article.contenue),
      type: new FormControl(article.type),
      ArticleImage: new FormControl(article.ArticleImage),
    });
  }

  updateArticle(article) {

    article.titre = this.formArticleModifer.controls.titre.value;
    article.contenue = this.formArticleModifer.controls.contenue.value;
    article.type = this.formArticleModifer.controls.type.value;
    article.ArticleImage = this.formArticleModifer.controls.ArticleImage.value;
    console.log(article)
    return this.articleService.updateArticle(article).subscribe((res) => {
      article = res;

    });
  }
}
