import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConectivityComponent } from './component/conectivity/conectivity.component';
import { GithubCallbackComponentComponent } from './component/github-callback-component/github-callback-component.component';

const routes: Routes = [ {
  path: '',
  component: ConectivityComponent,
  pathMatch: 'full',
},
{
  path: 'integrations/github/oauth2/callback',
  component: GithubCallbackComponentComponent ,
  pathMatch: 'full',
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
