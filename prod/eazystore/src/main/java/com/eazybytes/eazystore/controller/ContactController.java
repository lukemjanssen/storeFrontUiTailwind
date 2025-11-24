package com.eazybytes.eazystore.controller;

import com.eazybytes.eazystore.dto.ContactDto;
import com.eazybytes.eazystore.service.IContactService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/contacts")
@RequiredArgsConstructor
// @CrossOrigin(origins = "http://localhost:5173")
public class ContactController {

    private final IContactService iContactService;

    @PostMapping
    public ResponseEntity<ContactDto> createContact(@RequestBody ContactDto contactDto) {
        ContactDto savedContact = iContactService.saveContact(contactDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedContact);
    }

    @GetMapping
    public ResponseEntity<List<ContactDto>> getAllContacts() {
        List<ContactDto> contacts = iContactService.getAllContacts();
        return ResponseEntity.ok(contacts);
    }

}
