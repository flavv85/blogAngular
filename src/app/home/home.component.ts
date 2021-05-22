import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AddPostService } from '../add-post.service';
import { PostPayLoad } from '../add-post/post-payload';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  posts: Observable<Array<PostPayLoad>>;

  constructor(private postService: AddPostService) {}

  ngOnInit(): void {
    // call method aici pentru ca sa fie chemata de oricate ori reincarcam pagina/componenta este initializata
    this.posts = this.postService.getAllPosts();
  }
}
