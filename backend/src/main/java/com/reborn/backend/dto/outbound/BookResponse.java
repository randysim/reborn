package com.reborn.backend.dto.outbound;

import java.time.LocalDateTime;

import com.reborn.backend.model.Book;

public class BookResponse {
    private Long id;
    private String title;
    private boolean read;
    private LocalDateTime createdAt;

    public BookResponse(Book book) {
        this.id = book.getId();
        this.title = book.getTitle();
        this.read = book.isRead();
        this.createdAt = book.getCreatedAt();
    }

    public Long getId() {
        return id;
    }
    
    public String getTitle() {
        return title;
    }

    public boolean isRead() {
        return read;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
}
