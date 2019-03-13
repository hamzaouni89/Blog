import { Injectable } from '@angular/core';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CommentaireService {

  constructor(private http: HttpClient) { }


  getCommentaires() {
    let header = new HttpHeaders().append('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.get('http://localhost:3000/commentaire/getCom', { headers: header })
      .map(res => res);
  }
  getCommentairesById(owner) {
    let header = new HttpHeaders().append('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.get('http://localhost:3000/commentaire/getCom' + owner, { headers: header })
      .map(res => res);
  }

  createCommentaire(commentaire) {
    let header = new HttpHeaders().append('Authorization', 'Bearer ' + localStorage.getItem('token'));
    header.append('Content-Type', 'application/json')
    return this.http.post('http://localhost:3000/commentaire/addCom', commentaire, { headers: header })
      .map(res => res);
  }
  deleteCommentaire(commentaire) {
    let header = new HttpHeaders().append('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.get('http://localhost:3000/commentaire/deleteCom/' + commentaire._id, { headers: header });
  }

  updateCommentaire(commentaire) {
    let header = new HttpHeaders().append('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.post('http://localhost:3000/commentaire/updateCom/' + commentaire._id, commentaire, { headers: header })
      .map(res => res);
  }
}
