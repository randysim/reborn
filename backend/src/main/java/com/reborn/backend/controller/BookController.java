package com.reborn.backend.controller;

import com.reborn.backend.service.BookService;
import com.reborn.backend.service.UserService;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import com.reborn.backend.dto.inbound.BookRequest;
import com.reborn.backend.security.GoogleOAuth2User;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import com.reborn.backend.model.Book;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import com.reborn.backend.dto.outbound.SuccessResponse;
import java.util.List;
import org.springframework.web.bind.annotation.GetMapping;
import com.reborn.backend.dto.inbound.BookReadRequest;
import com.reborn.backend.dto.outbound.BookResponse;

@RestController
@RequestMapping("/api/books")
public class BookController {
    private final BookService bookService;
    private final UserService userService;

    public BookController(BookService bookService, UserService userService) {
        this.bookService = bookService;
        this.userService = userService;
    }
    
    @PostMapping
    public BookResponse createBook(@RequestBody BookRequest bookRequest, @AuthenticationPrincipal GoogleOAuth2User googleOAuth2User) {
        return new BookResponse(
            bookService.createBook(bookRequest, userService.getAuthenticatedUser(googleOAuth2User))
        );
    }

    @PutMapping
    public BookResponse updateBook(@RequestBody BookRequest bookRequest, @AuthenticationPrincipal GoogleOAuth2User googleOAuth2User) {
        return new BookResponse(
            bookService.updateBook(bookRequest, userService.getAuthenticatedUser(googleOAuth2User))
        );
    }

    @DeleteMapping("/{id}")
    public SuccessResponse deleteBook(@PathVariable Long id, @AuthenticationPrincipal GoogleOAuth2User googleOAuth2User) {
        bookService.deleteBook(id, userService.getAuthenticatedUser(googleOAuth2User));
        return new SuccessResponse(true);
    }

    @PutMapping("/{id}/read")
    public void readBook(
        @PathVariable Long id, 
        @RequestBody BookReadRequest bookReadRequest, 
        @AuthenticationPrincipal GoogleOAuth2User googleOAuth2User
    ) {
        bookService.readBook(
            id, 
            bookReadRequest.isRead(), 
            userService.getAuthenticatedUser(googleOAuth2User)
        );
    }

    @GetMapping
    public List<Book> getBooks(@AuthenticationPrincipal GoogleOAuth2User googleOAuth2User) {
        return bookService.getBooks(userService.getAuthenticatedUser(googleOAuth2User));
    }
    
}
