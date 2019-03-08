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
      ArticleImage: new FormControl(),
    });
  }

  ngOnInit() {
  }
  handleFileInput(files: FileList) {
    this.selectedImage = files.item(0);
  }
  createArticle() {
    console.log("test")
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
}
