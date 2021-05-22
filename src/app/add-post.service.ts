// clasa de tip service -> comunica cu BE si trimite obiectul PostPayload catre DB pentru a fi stocat

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PostPayLoad } from './add-post/post-payload';

@Injectable({
  providedIn: 'root',
})
export class AddPostService {
  constructor(private httpClient: HttpClient) {}

  addPost(postPayload: PostPayLoad) {
    return this.httpClient.post('http://localhost:8080/api/posts', postPayload);
  }

  getAllPosts(): Observable<Array<PostPayLoad>> {
    return this.httpClient.get<Array<PostPayLoad>>(
      'http://localhost:8080/api/posts/all'
    );
  }

  getSinglePost(permaLink: Number): Observable<PostPayLoad> {
    return this.httpClient.get<PostPayLoad>(
      'http://localhost:8080/api/posts/get/' + permaLink
    );
  }
}
