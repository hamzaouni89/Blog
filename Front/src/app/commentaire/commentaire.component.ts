import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user.service';
import { CommentaireService } from '../service/commentaire.service';
import { FormGroup, FormControl } from '@angular/forms';
@Component({
  selector: 'app-commentaire',
  templateUrl: './commentaire.component.html',
  styleUrls: ['./commentaire.component.css']
})
export class CommentaireComponent implements OnInit {

  formCommentaire: FormGroup;
  commentaires : any;
  constructor(public commentaireService: CommentaireService, private userService: UserService) { 
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
   
    this.commentaireService.createCommentaire(this.formCommentaire.value).subscribe((res) => {
      this.getCommentaires();
    });
  }

  getCommentaires() {
    this.commentaireService.getCommentaires().subscribe((res) => {
      console.log(res)
      this.formCommentaire.value.owner = this.userService.connectedUser._id;
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
