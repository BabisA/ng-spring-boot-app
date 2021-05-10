import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeFormComponent } from './components/employees/employee-form/employee-form.component';
import { EmployeeListComponent } from './components/employees/employee-list/employee-list.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/list',
    pathMatch: 'full'
  },
  {
    path: 'list',
    component: EmployeeListComponent,
    data: { title: 'List of Employee' }
  },
  {
    path: 'create',
    component: EmployeeFormComponent,
    data: { title: 'Add Employee' }
  },
  {
    path: 'edit/:id',
    component: EmployeeFormComponent,
    data: { title: 'Edit Employee' }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
