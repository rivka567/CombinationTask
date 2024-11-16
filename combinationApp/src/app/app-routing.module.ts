import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CombinationInputComponent } from './components/combination/combination-input/combination-input.component';
import { DisplayAllCombinationsComponent } from './components/combination/display-all-combinations/display-all-combinations.component';
import { DisplayCombinationItemComponent } from './components/combination/display-combination-item/display-combination-item.component';

const routes: Routes = [
  {
    path:'', component: CombinationInputComponent,
  },
  {
    path:'all-combinations', component: DisplayAllCombinationsComponent 
  },
  {
    path:'combination-item', component: DisplayCombinationItemComponent 
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
