package com.github.babisa.crudapp.controller;

import com.github.babisa.crudapp.dto.CompanyDto;
import com.github.babisa.crudapp.model.Company;
import com.github.babisa.crudapp.service.CompanyService;
import com.github.babisa.crudapp.service.EmployeeService;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;

@WebMvcTest
@RunWith(SpringRunner.class)
public class CompanyControllerTest {
    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private CompanyService companyService;

    @MockBean
    private EmployeeService employeeService;

    ModelMapper modelMapper = new ModelMapper();

    @Test
    public void getCompanies() throws Exception {
        List<CompanyDto> companies = new ArrayList<>();
        companies.add(modelMapper.map(Company.builder()
                .id(1)
                .name("Company 1")
                .build(), CompanyDto.class));

        companies.add(modelMapper.map(Company.builder()
                .id(2)
                .name("Company 2")
                .build(), CompanyDto.class));

        when(companyService.getCompanies()).thenReturn(companies);

        this.mockMvc
                .perform(get("/companies"))
                .andExpect(status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$.size()").value(2))
                .andExpect(MockMvcResultMatchers.jsonPath("$[0].name").value("Company 1"))
                .andExpect(MockMvcResultMatchers.jsonPath("$[0].id").value("1"))
                .andExpect(MockMvcResultMatchers.jsonPath("$[1].name").value("Company 2"))
                .andExpect(MockMvcResultMatchers.jsonPath("$[1].id").value("2"));
    }

    @Test
    public void getCompanyAverageSalary() throws Exception {
        when(companyService.getCompanyAverageSalary(1)).thenReturn(BigDecimal.valueOf(1900));
        this.mockMvc
                .perform(get("/company/avg/1"))
                .andExpect(status().isOk())
                .andExpect(content().string("1900"));
    }
}
