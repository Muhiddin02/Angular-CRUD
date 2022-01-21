import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Post } from 'src/app/core/models/posts.model';

@Component({
  selector: 'app-post-more-info',
  templateUrl: './post-more-info.component.html',
  styleUrls: ['./post-more-info.component.scss']
})
export class PostMoreInfoComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: Post) { }

  ngOnInit(): void {
  }
}
