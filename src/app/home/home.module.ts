import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationModule } from '../shared/layout/navigation/navigation.module';
import { homeRouting } from './home.routing';
import { HomeComponent } from "./home.component";

@NgModule({
  imports: [
    CommonModule,
    homeRouting,
    NavigationModule
  ],
  declarations: [HomeComponent]
})
export class HomeModule { }
