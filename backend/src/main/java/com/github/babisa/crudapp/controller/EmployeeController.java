package com.github.babisa.crudapp.controller;

import com.github.babisa.crudapp.dto.EmployeeDto;
import com.github.babisa.crudapp.model.Employee;
import com.github.babisa.crudapp.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;

import java.util.List;

@RestController
public class EmployeeController {

    private final EmployeeService employeeService;

    EmployeeController(EmployeeService employeeService) {
        this.employeeService = employeeService;
    }

    @GetMapping("/employees")
    public ResponseEntity<List<EmployeeDto>> getEmployees() {
        return ResponseEntity.ok(employeeService.getEmployees());
    }

    @GetMapping("/employee/{id}")
    public ResponseEntity<EmployeeDto> getEmployeeById(@PathVariable(required = true) Integer id) {
        return ResponseEntity.ok(employeeService.getEmployById(id));
    }

    @PostMapping("/employee")
    public ResponseEntity<EmployeeDto> postEmployees(@RequestBody EmployeeDto employeeDTO) {
        employeeService.add(employeeDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(employeeDTO);
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