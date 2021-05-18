// clasa de tip service -> comunica cu BE si trimite obiectul PostPayload catre DB pentru a fi stocat

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PostPayLoad } from './add-post/post-payload';

@Injectable({
  providedIn: 'root',
})
export class AddPostService {
  constructor(private httpClient: HttpClient) {}

  addPost(postPayload: PostPayLoad) {
    return this.httpClient.post('http://localhost:8080/api/posts', postPayload);
  }
}
