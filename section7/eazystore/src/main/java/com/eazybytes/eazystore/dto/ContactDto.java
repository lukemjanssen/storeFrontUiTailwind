package com.eazybytes.eazystore.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.Instant;

@Getter
@Setter
public class ContactDto {

    private Long contactId;
    private String name;
    private String email;
    private String mobileNumber;
    private String message;
    private Instant createdAt;

}
