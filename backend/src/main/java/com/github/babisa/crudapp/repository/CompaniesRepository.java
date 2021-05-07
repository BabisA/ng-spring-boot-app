package com.github.babisa.crudapp.repository;

import com.github.babisa.crudapp.model.Company;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CompaniesRepository extends CrudRepository<Company, Integer> {
}