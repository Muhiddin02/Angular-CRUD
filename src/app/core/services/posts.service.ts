import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Post } from '../models/posts.model';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class PostsService extends  BaseService<Post> {
  protected url = environment.baseUrl+'posts';
}
