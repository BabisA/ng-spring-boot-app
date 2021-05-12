package com.github.babisa.crudapp.service;

import com.github.babisa.crudapp.dto.CompanyDto;
import com.github.babisa.crudapp.model.Company;
import com.github.babisa.crudapp.repository.CompaniesRepository;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class CompanyService {
    private final CompaniesRepository repository;
    ModelMapper modelMapper = new ModelMapper();

    CompanyService(CompaniesRepository repository) {
        this.repository = repository;
    }

    public List<CompanyDto> getCompanies() {
        return ((List<Company>) repository
                .findAll())
                .stream()
                .map(this::convertToCompanyDto)
                .collect(Collectors.toList());
    }

    public BigDecimal getCompanyAverageSalary(Integer companyId) {
        return repository.findCompanyAverageSalary(companyId);
    }

    private CompanyDto convertToCompanyDto(Company company) {
        modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.LOOSE);
        return modelMapper.map(company, CompanyDto.class);
    }
}
