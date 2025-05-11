package com.reborn.backend.dto.outbound;

import java.time.LocalDate;

import com.reborn.backend.model.Journal;

public class JournalResponse {
    private Long id;
    private String title;
    private LocalDate date;
    private String positives;
    private String negatives;

    public JournalResponse(Journal journal) {
        this.id = journal.getId();
        this.date = journal.getDate();
        this.positives = journal.getPositives();
        this.negatives = journal.getNegatives();
    }
    
    public Long getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public LocalDate getDate() {
        return date;
    }
    
    public String getPositives() {
        return positives;
    }

    public String getNegatives() {
        return negatives;
    }
}
