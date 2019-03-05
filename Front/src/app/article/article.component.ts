import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../service/article.service';
import { FormGroup, FormControl } from '@angular/forms';
import * as jwt_decode from "jwt-decode";

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {

  articles;
  decoded = jwt_decode(localStorage.getItem('token'));
  formArticle: FormGroup;
  formArticleModifer: FormGroup;
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
  createArticle() {
    console.log(this.formArticle.value)
    this.formArticle.value.owner = this.decoded._id;
    console.log(this.formArticle.value.owner, this.decoded._id);

    this.articleService.createArticle(this.formArticle.value).subscribe((res) => {
      this.getArticles()
    });
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
      description: new FormControl(article.description)

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
