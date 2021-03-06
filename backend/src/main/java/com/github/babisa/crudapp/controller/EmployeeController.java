package com.github.babisa.crudapp.controller;

import com.github.babisa.crudapp.dto.EmployeeDto;
import com.github.babisa.crudapp.service.EmployeeService;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;

import java.util.List;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
public class EmployeeController {

    private final EmployeeService employeeService;

    EmployeeController(EmployeeService employeeService) {
        this.employeeService = employeeService;
    }

    @GetMapping("/employees")
    public ResponseEntity<List<EmployeeDto>> getEmployees(@RequestParam Integer companyId) {
        return ResponseEntity.ok(employeeService.getEmployees(companyId));
    }

    @GetMapping("/employee/{id}")
    public ResponseEntity<EmployeeDto> getEmployeeById(@PathVariable(required = true) Integer id,
                                                       @RequestParam Integer companyId) {
        return ResponseEntity.ok(employeeService.getEmployById(id, companyId));
    }

    @PostMapping("/employee")
    public ResponseEntity<EmployeeDto> postEmployees(@RequestBody EmployeeDto employeeDTO) {
        EmployeeDto empDto = employeeService.add(employeeDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(empDto);
    }

    @PutMapping("/employee/{id}")
    public ResponseEntity<EmployeeDto> updateEmployees(@RequestBody EmployeeDto employeeDTO) {
        employeeService.add(employeeDTO);
        return ResponseEntity.status(HttpStatus.ACCEPTED).body(employeeDTO);
    }

    @DeleteMapping("/employee/{id}")
    public ResponseEntity deleteEmployee(@PathVariable(required = true) Integer id) {
        employeeService.delete(id);
        return ResponseEntity.status(HttpStatus.ACCEPTED).build();
    }
}