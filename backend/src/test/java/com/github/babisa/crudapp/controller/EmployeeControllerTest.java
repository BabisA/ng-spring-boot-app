package com.github.babisa.crudapp.controller;

import com.github.babisa.crudapp.dto.EmployeeDto;
import com.github.babisa.crudapp.model.Employee;
import com.github.babisa.crudapp.service.CompanyService;
import com.github.babisa.crudapp.service.EmployeeService;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectWriter;

@WebMvcTest
@RunWith(SpringRunner.class)
public class EmployeeControllerTest {
    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private CompanyService companyService;

    @MockBean
    private EmployeeService employeeService;

    ModelMapper modelMapper = new ModelMapper();

    @Test
    public void getEmployees() throws Exception {
        List<EmployeeDto> employees = new ArrayList<>();
        employees.add(modelMapper.map(Employee.builder()
                .id(1)
                .name("Jack")
                .surname("Jones")
                .address("Test Street 15")
                .email("JJones@Company1.com")
                .salary(BigDecimal.valueOf(2900))
                .companyId(1)
                .build(), EmployeeDto.class));

        when(employeeService.getEmployees(1)).thenReturn(employees);

        this.mockMvc
            .perform(get("/employees?companyId=1"))
            .andExpect(status().isOk())
            .andExpect(MockMvcResultMatchers.jsonPath("$.size()").value(1))
            .andExpect(MockMvcResultMatchers.jsonPath("$[0].name").value("Jack"))
            .andExpect(MockMvcResultMatchers.jsonPath("$[0].surname").value("Jones"));
    }

    @Test
    public void getEmployeeById() throws Exception {
        EmployeeDto employee = modelMapper.map(Employee.builder()
                .id(1)
                .name("Jack")
                .surname("Jones")
                .address("Test Street 15")
                .email("JJones@Company1.com")
                .salary(BigDecimal.valueOf(2900))
                .companyId(1)
                .build(), EmployeeDto.class);

        when(employeeService.getEmployById(1, 1)).thenReturn(employee);

        this.mockMvc
                .perform(get("/employee/1?companyId=1"))
                .andExpect(status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$.name").value("Jack"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.surname").value("Jones"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.id").value("1"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.companyId").value("1"));

    }

    @Test
    public void postEmployees() throws Exception {
        EmployeeDto employee = modelMapper.map(Employee.builder()
                .name("Jack")
                .surname("Jones")
                .address("Test Street 15")
                .email("JJones@Company1.com")
                .salary(BigDecimal.valueOf(2900))
                .companyId(1)
                .build(), EmployeeDto.class);

        ObjectWriter ow = new ObjectMapper().writer().withDefaultPrettyPrinter();
        String employeeJson = ow.writeValueAsString(employee);
        when(employeeService.add(employee)).thenReturn(employee);

        this.mockMvc
                .perform(post("/employee")
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(employeeJson))
                .andExpect(status().isCreated());
    }

    @Test
    public void updateEmployees() throws Exception {
        EmployeeDto employee = modelMapper.map(Employee.builder()
                .id(1)
                .name("Jack")
                .surname("Jones")
                .address("Test Street 15")
                .email("JJones@Company1.com")
                .salary(BigDecimal.valueOf(2900))
                .companyId(1)
                .build(), EmployeeDto.class);

        ObjectWriter ow = new ObjectMapper().writer().withDefaultPrettyPrinter();
        String employeeJson = ow.writeValueAsString(employee);

        when(employeeService.add(employee)).thenReturn(employee);

        this.mockMvc
                .perform(put("/employee/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(employeeJson))
                .andExpect(status().isAccepted());
    }

    @Test
    public void deleteEmployee() throws Exception {
        this.mockMvc.perform(delete("/employee/1"))
                .andExpect(status().isAccepted());
    }
}
