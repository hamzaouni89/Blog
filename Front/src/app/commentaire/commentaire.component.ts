import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../service/user.service';
import { CommentaireService } from '../service/commentaire.service';
import { FormGroup, FormControl } from '@angular/forms';
import { ArticleService } from '../service/article.service';
@Component({
  selector: 'app-commentaire',
  templateUrl: './commentaire.component.html',
  styleUrls: ['./commentaire.component.css']
})
export class CommentaireComponent implements OnInit {
  @Input() idArticle:any;
  formCommentaire: FormGroup;
  commentaires : any;
  article: any;
  constructor(public commentaireService: CommentaireService, private userService: UserService , private articleService: ArticleService) { 
    this.formCommentaire = new FormGroup({
      
      contenue: new FormControl(),
      date: new FormControl(),
      owner: new FormControl(),
      article: new FormControl(),
    });
  }

  ngOnInit() {
    this.getCommentaires();
    
  }


  createCommentaire() {
    console.log(this.formCommentaire.value)
    this.formCommentaire.value.owner = this.userService.connectedUser._id;
   
    
    this.formCommentaire.value.article = this.idArticle;
    console.log(this.formCommentaire.value)
    this.commentaireService.createCommentaire(this.formCommentaire.value).subscribe((res) => {
      this.getCommentaires();
    });
  }

  getCommentaires() {
    this.commentaireService.getCommentaires().subscribe((res) => {
      console.log(res)
      this.formCommentaire.value.owner = this.userService.connectedUser._id;
      this.formCommentaire.value.article = this.articleService.article._id;
      this.commentaires = res;
    })
  }
  getCommentairesById(id) {
    this.commentaireService.getCommentairesById(id).subscribe((res) => {
      console.log(res)
      this.formCommentaire.value.owner = this.userService.connectedUser._id;
      this.formCommentaire.value.article = this.articleService.article._id;
      this.commentaires = res;
    })
  }
  deleteCommentaire(commentaire) {
    console.log(commentaire)
    this.commentaireService.deleteCommentaire(commentaire).subscribe(() => {
      this.getCommentaires();
    })
  }
}
