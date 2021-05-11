package com.github.babisa.crudapp.repository;

import com.github.babisa.crudapp.model.Company;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;

@Repository
public interface CompaniesRepository extends CrudRepository<Company, Integer> {
    @Query("SELECT avg(salary) FROM Employee WHERE companyId = ?1")
    BigDecimal findCompanyAverageSalary(Integer companyId);
}