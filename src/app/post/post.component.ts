import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AddPostService } from '../add-post.service';
import { PostPayLoad } from '../add-post/post-payload';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
})
export class PostComponent implements OnInit {
  post: PostPayLoad;
  permaLink: Number;

  constructor(
    private router: ActivatedRoute,
    private postService: AddPostService
  ) {}

  ngOnInit(): void {
    this.router.params.subscribe((params) => {
      this.permaLink = params['id'];
    });

    // create a field to assing the response -> post of type PostPayload
    this.postService.getSinglePost(this.permaLink).subscribe(
      (data: PostPayLoad) => {
        this.post = data;
      },
      (err: any) => {
        console.log('Failed to retrieve post');
      }
    );
  }
}
