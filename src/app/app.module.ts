import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './layouts/header/header.component';
import { DashboardComponent } from './layouts/dashboard/dashboard.component';
import { PostsFilterComponent } from './components/filters/posts-filter/posts-filter.component';
import { PostsComponent } from './pages/posts/posts.component';
import { MaterialModule } from './material/material.module';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DeleteConfirmComponent } from './components/modals/delete-confirm/delete-confirm.component';
import { PostFormComponent } from './components/modals/post-form/post-form.component';
import { PostMoreInfoComponent } from './components/modals/post-more-info/post-more-info.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DashboardComponent,
    PostsFilterComponent,
    PostsComponent,
    DeleteConfirmComponent,
    PostFormComponent,
    PostMoreInfoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
