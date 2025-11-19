package com.eazybytes.eazystore.service.impl;

import com.eazybytes.eazystore.dto.ContactDto;
import com.eazybytes.eazystore.entity.Contact;
import com.eazybytes.eazystore.repository.ContactRepository;
import com.eazybytes.eazystore.service.IContactService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ContactServiceImpl implements IContactService {

    private final ContactRepository contactRepository;

    @Override
    public ContactDto saveContact(ContactDto contactDto) {
        Contact contact = new Contact();
        BeanUtils.copyProperties(contactDto, contact);
        
        // Set audit fields for new contact
        Instant now = Instant.now();
        contact.setCreatedAt(now);
        contact.setCreatedBy("ANONYMOUS"); // You can replace this with actual user from security context
        contact.setUpdatedAt(now);
        contact.setUpdatedBy("ANONYMOUS");
        
        Contact savedContact = contactRepository.save(contact);
        return transformToDTO(savedContact);
    }

    @Override
    public List<ContactDto> getAllContacts() {
        return contactRepository.findAll()
                .stream()
                .map(this::transformToDTO)
                .collect(Collectors.toList());
    }

    private ContactDto transformToDTO(Contact contact) {
        ContactDto contactDto = new ContactDto();
        BeanUtils.copyProperties(contact, contactDto);
        contactDto.setContactId(contact.getId());
        return contactDto;
    }
}
