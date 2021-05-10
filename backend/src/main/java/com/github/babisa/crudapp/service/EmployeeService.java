package com.github.babisa.crudapp.service;

import com.github.babisa.crudapp.dto.EmployeeDto;
import com.github.babisa.crudapp.model.Employee;
import com.github.babisa.crudapp.repository.EmployeesRepository;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class EmployeeService {
    private final EmployeesRepository repository;
    ModelMapper modelMapper = new ModelMapper();

    EmployeeService(EmployeesRepository repository) {
        this.repository = repository;
    }

    public void add(EmployeeDto dto) {
        repository.save(modelMapper.map(dto, Employee.class));
    }

    public void delete(Integer id) {
        repository.deleteById(id);
    }

    public List<EmployeeDto> getEmployees(Integer companyId) {
        return repository
                .findAllByCompanyId(companyId)
                .stream()
                .map(this::convertToEmployeeDto)
                .collect(Collectors.toList());
    }

    public EmployeeDto getEmployById(Integer id, Integer companyId) {
        Optional<Employee> employee = repository.findByIdAndCompanyId(id, companyId);
        return employee.map(value -> modelMapper.map(value, EmployeeDto.class)).orElse(null);
    }

    private EmployeeDto convertToEmployeeDto(Employee employee) {
        modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.LOOSE);
        return modelMapper.map(employee, EmployeeDto.class);
    }
}