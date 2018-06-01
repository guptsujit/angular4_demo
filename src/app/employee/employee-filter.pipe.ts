import { Pipe, PipeTransform } from '@angular/core';
import { Employee } from '../models/employee-model';

@Pipe({
  name: 'employeeFilter',
  pure :true
})
export class EmployeeFilterPipe implements PipeTransform {

  transform(employees: Employee[], searchTxt: string): Employee[] {
    if (!searchTxt && employees != null) {
      return employees;
    }
    return employees.filter((employee) => employee.fullname.toLowerCase().indexOf(searchTxt) != -1)
  }

}
