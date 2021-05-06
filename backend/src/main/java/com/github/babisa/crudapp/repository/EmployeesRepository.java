package com.github.babisa.crudapp.repository;

import com.github.babisa.crudapp.model.Employee;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EmployeesRepository extends CrudRepository<Employee, Integer> {
}