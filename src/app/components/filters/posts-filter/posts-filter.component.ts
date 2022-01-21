import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PostQueryParams } from 'src/app/core/models/posts.model';
import { removeEmptyFields } from 'src/app/core/utils';

@Component({
  selector: 'app-posts-filter',
  templateUrl: './posts-filter.component.html',
  styleUrls: ['./posts-filter.component.scss']
})
export class PostsFilterComponent implements OnInit {
  //Filter form
  form: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  )  {}

  ngOnInit(): void {
    this.form = this.fb.group({
      firstName: [''],
      company: ['']
    });

    this.form.reset( this.route.snapshot.queryParams);
  }

  submitFilter() {
    const queryParams: PostQueryParams = { ...this.form.value };

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: queryParams,
      queryParamsHandling: 'merge'
    });

  }
}
