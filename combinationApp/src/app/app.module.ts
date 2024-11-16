import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CombinationInputComponent } from './components/combination/combination-input/combination-input.component';
import { InputNumberModule } from 'primeng/inputnumber';
import { ButtonModule } from 'primeng/button';
import { ReactiveFormsModule } from '@angular/forms';
import { CombinationService } from './services/combination.service';
import { HttpClientModule } from '@angular/common/http';
import { DisplayCombinationItemComponent } from './components/combination/display-combination-item/display-combination-item.component';
import { DisplayAllCombinationsComponent } from './components/combination/display-all-combinations/display-all-combinations.component';
import { PaginatorModule } from 'primeng/paginator';
import { CardModule } from 'primeng/card';
import { provideAnimations } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    AppComponent,
    CombinationInputComponent,
    DisplayCombinationItemComponent,
    DisplayAllCombinationsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    InputNumberModule,
    ButtonModule,
    ReactiveFormsModule,
    HttpClientModule,
    PaginatorModule,
    CardModule,
  ],
  providers: [CombinationService,
    provideAnimations()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
