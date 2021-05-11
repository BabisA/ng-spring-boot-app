package com.github.babisa.crudapp.controller;

import com.github.babisa.crudapp.dto.CompanyDto;
import com.github.babisa.crudapp.service.CompanyService;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;

import java.math.BigDecimal;
import java.util.List;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
public class CompanyController {

    private final CompanyService companyService;

    CompanyController(CompanyService companyService) {
        this.companyService = companyService;
    }

    @GetMapping("/companies")
    public ResponseEntity<List<CompanyDto>> getCompanies() {
        return ResponseEntity.ok(companyService.getCompanies());
    }

    @GetMapping("/company/avg/{id}")
    public ResponseEntity<BigDecimal> getCompanyAverageSalary(@PathVariable(required = true) Integer id) {
        return ResponseEntity.ok(companyService.getCompanyAverageSalary(id));
    }
}