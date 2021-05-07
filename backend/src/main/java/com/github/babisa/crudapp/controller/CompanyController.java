package com.github.babisa.crudapp.controller;

import com.github.babisa.crudapp.dto.CompanyDto;
import com.github.babisa.crudapp.service.CompanyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;

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

//    @GetMapping("/company/{id}")
//    public ResponseEntity<CompanyDto> getCompanyById(@PathVariable(required = true) Integer id) {
//        return ResponseEntity.ok(companyService.getCompanyById(id));
//    }
//
//    @PostMapping("/company")
//    public ResponseEntity<CompanyDto> postCompanies(@RequestBody CompanyDto companyDTO) {
//        companyService.add(companyDTO);
//        return ResponseEntity.status(HttpStatus.CREATED).body(companyDTO);
//    }
//
//    @PutMapping("/company/{id}")
//    public ResponseEntity<CompanyDto> updateCompany(@RequestBody CompanyDto companyDTO) {
//        companyService.add(companyDTO);
//        return ResponseEntity.status(HttpStatus.ACCEPTED).body(companyDTO);
//    }
//
//    @DeleteMapping("/company/{id}")
//    public ResponseEntity deleteCompany(@PathVariable(required = true) Integer id) {
//        companyService.delete(id);
//        return ResponseEntity.status(HttpStatus.ACCEPTED).build();
//    }
}