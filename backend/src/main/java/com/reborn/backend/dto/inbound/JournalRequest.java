package com.reborn.backend.dto.inbound;

public class JournalRequest {
    private Long id;
    private String positives;
    private String negatives;

    public Long getId() {
        return id;
    }

    public String getPositives() {
        return positives;
    }   

    public String getNegatives() {
        return negatives;
    }
}
