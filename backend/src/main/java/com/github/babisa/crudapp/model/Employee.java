package com.github.babisa.crudapp.model;

import javax.persistence.*;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.Builder;
import lombok.Data;
import java.math.BigDecimal;

@Entity
@Table(name="employee")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Employee {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name="name")
    private String name;

    @Column(name="surname")
    private String surname;

    @Column(name="email")
    private String email;

    @Column(name="address")
    private String address;

    @Column(name="salary")
    private BigDecimal salary;

    @Column(name="company_id")
    private Integer companyId;
}
