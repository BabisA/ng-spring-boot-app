package com.github.babisa.crudapp.service;

import com.github.babisa.crudapp.dto.CompanyDto;
import com.github.babisa.crudapp.model.Company;
import com.github.babisa.crudapp.repository.CompaniesRepository;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class CompanyService {
    private final CompaniesRepository repository;
    ModelMapper modelMapper = new ModelMapper();

    CompanyService(CompaniesRepository repository) {
        this.repository = repository;
    }

    public void add(CompanyDto dto) {
        repository.save(modelMapper.map(dto, Company.class));
    }

    public void delete(Integer id) {
        repository.deleteById(id);
    }

    public List<CompanyDto> getCompanies() {
        return ((List<Company>) repository
                .findAll())
                .stream()
                .map(this::convertToCompanyDto)
                .collect(Collectors.toList());
    }

    public CompanyDto getCompanyById(Integer id) {
        Optional<Company> company = repository.findById(id);
        return company.map(value -> modelMapper.map(value, CompanyDto.class)).orElse(null);
    }

    private CompanyDto convertToCompanyDto(Company company) {
        modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.LOOSE);
        return modelMapper.map(company, CompanyDto.class);
    }


}
