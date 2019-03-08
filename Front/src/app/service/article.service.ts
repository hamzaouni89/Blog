import { Injectable } from '@angular/core';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  constructor(private http: HttpClient) { }
  getImage(NomImage) {
    let header = new HttpHeaders().append('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.get('http://localhost:3000/article/getImage/' + NomImage, { headers: header })
      .map(res => res);
  }

  uploadImage(file) {
    let header = new HttpHeaders().append('Authorization', 'Bearer ' + localStorage.getItem('token'));
    header.append('Content-Type', 'application/json')
    return this.http.post('http://localhost:3000/article/upload', file, { headers: header })
      .map(res => res);
  }
  getArticles() {
    let header = new HttpHeaders().append('Authorization', 'Bearer ' + localStorage.getItem('token'));

    return this.http.get('http://localhost:3000/article/getArticle', { headers: header })
      .map(res => res);
  }
  getArticlesById(IdUser) {
    let header = new HttpHeaders().append('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.get('http://localhost:3000/article/getArticle' + IdUser, { headers: header })
      .map(res => res);
  }

  createArticle(article) {
    let header = new HttpHeaders().append('Authorization', 'Bearer ' + localStorage.getItem('token'));
    header.append('Content-Type', 'application/json')
    return this.http.post('http://localhost:3000/article/addArticle', article, { headers: header })
      .map(res => res);
  }
  deleteArticle(article) {
    let header = new HttpHeaders().append('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.get('http://localhost:3000/article/deletearticle/' + article._id, { headers: header });
  }

  updateArticle(article) {
    let header = new HttpHeaders().append('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.post('http://localhost:3000/article/updatearticle/' + article._id, article, { headers: header })
      .map(res => res);
  }
}
