import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AddPostService } from '../add-post.service';
import { PostPayLoad } from './post-payload';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css'],
})
export class AddPostComponent implements OnInit {
  addPostForm: FormGroup;

  // facem o clasa pentru stocarea valorilor in variabile pentru a putea fi trimise catre BE
  // initializam obiectul PostPayload si ii atribuim form control values
  postPayload: PostPayLoad;

  title = new FormControl('');
  body = new FormControl('');

  constructor(private addPostService: AddPostService, private router: Router) {
    // initializam obiectul FormGroup care ia ca param obiectul FormControl
    this.addPostForm = new FormGroup({
      title: this.title,
      body: this.body,
    });

    this.postPayload = {
      id: '',
      content: '',
      title: '',
      username: '',
    };
  }

  ngOnInit(): void {}

  // campurile title si body pe grupam intr-un obiect JSon (Obiect de tip DTO)

  addPost() {
    this.postPayload.content = this.addPostForm.get('body').value;
    this.postPayload.title = this.addPostForm.get('title').value;
    this.addPostService.addPost(this.postPayload).subscribe(
      (data) => {
        // if succes navigate from post page to home page, injecting router class
        this.router.navigateByUrl('/');
      },
      (error) => {
        console.log('Failed to respond');
      }
    );
  }
}
