package com.pfizer.sacchonapi.model;

import com.pfizer.sacchonapi.security.Role;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class ApplicationUser{
    @Id
    private String username;
    private String password;
    @Enumerated(EnumType.STRING)
    private Role role;
    private String firstName;
    private String lastName;
    private String email;
    private String address;
    private String city;
    private String zipCode;
    private String phoneNumber;
    private Date dob;
    private Date creationDate;
    private boolean active;

    @OneToOne(mappedBy = "applicationUser")
    private Patient patient;

    @OneToOne(mappedBy = "applicationUser")
    private Doctor doctor;
}