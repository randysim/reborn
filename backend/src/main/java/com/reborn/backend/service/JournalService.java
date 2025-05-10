package com.reborn.backend.service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.reborn.backend.dto.inbound.JournalRequest;
import com.reborn.backend.model.Journal;
import com.reborn.backend.model.User;
import com.reborn.backend.repository.JournalRepository;

// journals are created on demand when needed by client
@Service
public class JournalService {
    private final JournalRepository journalRepository;

    public JournalService(JournalRepository journalRepository) {
        this.journalRepository = journalRepository;
    }
    
    public Journal createJournal(User user) {
        Optional<Journal> journalOptional = journalRepository.findByDateAndUser(LocalDate.now(), user);
        if (journalOptional.isPresent()) {
            return journalOptional.get();
        }

        Journal journal = new Journal(LocalDate.now(), user, "", "");
        return journalRepository.save(journal);
    }

    public Journal getJournal(Long id, User user) {
        Journal journal = journalRepository.findById(id)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Journal not found"));

        if (!journal.getUser().equals(user)) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "You are not allowed to view this journal");
        }

        return journal;
    }

    public Journal getJournalByDate(LocalDate date, User user) {
        Journal journal = journalRepository.findByDateAndUser(date, user)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Journal not found"));

        return journal;
    }

    public List<Journal> getJournals(User user) {
        return journalRepository.findByUser(user);
    }

    public Journal updateJournal(Long id,JournalRequest journalRequest, User user) {
        Journal journal = getJournal(id, user);
        journal.setPositives(journalRequest.getPositives());
        journal.setNegatives(journalRequest.getNegatives());
        return journalRepository.save(journal);
    }

    public void deleteJournal(Long id, User user) {
        Journal journal = getJournal(id, user);
        journalRepository.delete(journal);
    }
}
