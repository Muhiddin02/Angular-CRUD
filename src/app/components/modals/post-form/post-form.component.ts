import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Post } from 'src/app/core/models/posts.model';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.scss']
})
export class PostFormComponent implements OnInit {
  //Post form
  form: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Post,
    private dialogRef: MatDialogRef<PostFormComponent>,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      id:[null],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      avatar: ['', Validators.required],
      language: ['', Validators.required],
      company: ['', Validators.required],
      university: ['', Validators.required],
    });

    //Checking is edit or add
    if(this.data.id){
      this.form.reset(this.data)
    }
  }

  closeDialog() {
    this.dialogRef.close(this.form.value);
  }
}
