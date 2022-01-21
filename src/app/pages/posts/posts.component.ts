import { Component, OnInit, ViewChild } from '@angular/core';
import { Post, PostQueryParams } from 'src/app/core/models/posts.model';
import { MatTableDataSource } from '@angular/material/table';
import { PAGE_SIZE_OPTIONS, updateCollection } from 'src/app/core/utils';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { PostsService } from 'src/app/core/services/posts.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DeleteConfirmComponent } from 'src/app/components/modals/delete-confirm/delete-confirm.component';
import { MatDialog } from '@angular/material/dialog';
import { PostFormComponent } from 'src/app/components/modals/post-form/post-form.component';
import { PostMoreInfoComponent } from 'src/app/components/modals/post-more-info/post-more-info.component';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {
  //  Columns to display in the table.
  displayedColumns: string[] = [
    'id',
    'avatar',
    'firstName',
    'lastName',
    'actionsColumn'
  ];

  //Posts values
  dataSource = new MatTableDataSource<Post>([]);

  //  An array of numbers to show on one page.
  pageSizeOptions = PAGE_SIZE_OPTIONS;

  // Total number of items in DB.
  totalCount: number;

  // Page number.
  _page: number = 0;

  // Number of items to show on one page.
  _limit: number = 10;

  /**
   * Object of params collected from paginator and filter
   * to be sent to API.
   */
  postQueryParams: PostQueryParams;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private postService: PostsService,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Get initial fetch criterias from URL query params if user navigated from filtered link
    this.postQueryParams = this.route.snapshot.queryParams;

    // Set paginator values if department navigated from paginated link
    this._page = +this.route.snapshot.queryParams._page - 1;
    this._limit = +this.route.snapshot.queryParams._limit;

    // Fetch data on every URL query params change
    this.route.queryParams.subscribe((params) => {
      if (params.constructor === Object && Object.keys(params).length !== 0) {
        this.getPosts(params);
      } else this.getPosts();
    });
  }

  /**
   * Set selected paginator options as query params
   * @param event Event triggered by changing pagination options
   */
  setPaginationQueryParams(event: PageEvent) {
    const { pageIndex, pageSize } = event;

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        _page: pageIndex + 1,
        _limit: pageSize
      },
      queryParamsHandling: 'merge'
    });
  }

  /**
   * Set query params based on sorting values.
   * @param event Standard MatSort event.
   */
  setSortingQueryParams(event: Sort) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { _sort: event.active, _order: event.direction },
      queryParamsHandling: 'merge'
    });
  }

  /**
   * get posts with filter
   * @param queryParams Query params for filter
   */
  getPosts(queryParams?: PostQueryParams) {
    this.postService.getAll(queryParams).subscribe(
      (response) => {
        this.dataSource.data = response;
        this.totalCount = 100;
      },
      (error: Response) => console.log(error)
    );
  }

  //Show full info of post
  moreInfo(post: Post){
    this.dialog.open(PostMoreInfoComponent, {
      width:'80%',
      maxHeight:'90%',
      data:  post
    })
  }

  //Add post
  add(){
    this.dialog.open(PostFormComponent, {
      maxWidth: '600px',
      data:  {},
    }).afterClosed().subscribe(result => {
      if (result) {       
       this.postService.post(result).subscribe(res => {
         console.log(res);
        this.dataSource.data = updateCollection(this.dataSource.data, res);
       })               
      }
    });
  }

  //Edit post
  edit(data:Post){
    this.dialog.open(PostFormComponent, {
      maxWidth: '600px',
      data:  Object.assign({},data),
    }).afterClosed().subscribe(result => {
      if (result) {       
       this.postService.put(result).subscribe(res => {
         console.log(res);
        this.dataSource.data = updateCollection(this.dataSource.data, res);
       })               
      }
    });  
  }

//Delete post
delete(post:Post){
    this.dialog.open(DeleteConfirmComponent, {
      width: '400px',
      data: post.firstName,
    }).afterClosed().subscribe(result => {
      if (result) {       
       this.postService.delete(post.id).subscribe(res => {
        this.dataSource.data = updateCollection(this.dataSource.data, post,true);
       })               
      }
    });
  }  

}
