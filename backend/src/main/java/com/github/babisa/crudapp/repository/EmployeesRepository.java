package com.github.babisa.crudapp.repository;

import com.github.babisa.crudapp.model.Employee;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface EmployeesRepository extends CrudRepository<Employee, Integer> {
    List<Employee> findAllByCompanyId(Integer companyId);

    Optional<Employee> findByIdAndCompanyId(Integer id, Integer companyId);
}