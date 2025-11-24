package com.eazybytes.eazystore.service;

import com.eazybytes.eazystore.dto.ContactDto;

import java.util.List;

public interface IContactService {

    ContactDto saveContact(ContactDto contactDto);
    
    List<ContactDto> getAllContacts();
}
