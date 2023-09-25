import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BooksComponent } from './books/books-page/books.component';

const routes: Routes = [
  { path: '', redirectTo: 'books', pathMatch: 'full' },

  { path: 'books', component: BooksComponent },
  // { path: 'projects/update/:id', component: UpdateProjectComponent },

  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
