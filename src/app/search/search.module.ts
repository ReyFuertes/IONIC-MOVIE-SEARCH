import { DetailComponent } from './components/detail/detail.component';
import { ListComponent } from './components/list/list.component';
import { ListService, SearchTextService } from './search.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: '',
        component: ListComponent
      },
      {
        path: 'detail/:title',
        component: DetailComponent
      }
    ])
  ],
  declarations: [ListComponent, DetailComponent],
  providers: [ListService, SearchTextService]
})
export class ListModule { }
