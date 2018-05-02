import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {LandingPageComponent} from './landing-page/landing-page.component';
import {SidebarComponent} from './sidebar/sidebar.component';
import {NavbarComponent} from './shared/navbar/navbar.component';
import {MainLayoutComponent} from './layout/main-layout/main-layout.component';

const appRoutes: Routes = [
    {path: '', redirectTo: 'login', pathMatch: 'full'},
    {path: 'login', component: MainLayoutComponent, pathMatch: 'full'},
];
@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRouteModule {

}
