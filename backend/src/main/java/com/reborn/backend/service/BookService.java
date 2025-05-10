package com.reborn.backend.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.reborn.backend.dto.inbound.BookRequest;
import com.reborn.backend.model.Book;
import com.reborn.backend.model.User;
import com.reborn.backend.repository.BookRepository;

@Service
public class BookService {
    private final BookRepository bookRepository;

    public BookService(BookRepository bookRepository) {
        this.bookRepository = bookRepository;
    }

    public void readBook(Long id, boolean read, User user) {
        Book book = bookRepository.findById(id)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Book not found"));
        book.setRead(read);
        book.setDateRead(LocalDateTime.now());
        bookRepository.save(book);
    }

    public Book createBook(BookRequest bookRequest, User user) {
        Book book = new Book(bookRequest.getTitle(), user);
        return bookRepository.save(book);
    }

    public Book updateBook(BookRequest bookRequest, User user) {
        if (bookRequest.getId() == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Book ID is required");
        }

        Book book = bookRepository.findById(bookRequest.getId())
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Book not found"));

        if (!book.getUser().equals(user)) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "You are not allowed to update this book");
        }

        book.setTitle(bookRequest.getTitle());
        return bookRepository.save(book);
    }

    public void deleteBook(Long id, User user) {
        Book book = bookRepository.findById(id)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Book not found"));

        if (!book.getUser().equals(user)) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "You are not allowed to delete this book");
        }
        
        bookRepository.deleteById(id);
    }

    public List<Book> getBooks(User user) {
        return bookRepository.findByUser(user);
    }
}
