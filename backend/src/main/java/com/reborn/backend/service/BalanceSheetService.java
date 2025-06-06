package com.reborn.backend.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.reborn.backend.dto.inbound.BalanceSheetItemBulkRequest;
import com.reborn.backend.dto.inbound.BalanceSheetItemRequest;
import com.reborn.backend.model.BalanceSheetItem;   
import com.reborn.backend.model.User;
import com.reborn.backend.repository.BalanceSheetItemRepository;
import com.reborn.backend.repository.UserRepository;
import java.util.stream.Collectors;

@Service
public class BalanceSheetService {
    private final BalanceSheetItemRepository balanceSheetItemRepository;
    private final UserRepository userRepository;

    public BalanceSheetService(
        BalanceSheetItemRepository balanceSheetItemRepository, 
        UserRepository userRepository
    ) {
        this.balanceSheetItemRepository = balanceSheetItemRepository;
        this.userRepository = userRepository;
    }

    public BalanceSheetItem getBalanceSheetItem(Long id, User user) {
        Optional<BalanceSheetItem> balanceSheetItemOptional = balanceSheetItemRepository.findById(id);
        if (balanceSheetItemOptional.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Balance sheet item not found.");
        }

        BalanceSheetItem balanceSheetItem = balanceSheetItemOptional.get();
        if (!balanceSheetItem.getUser().equals(user)) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "You are not allowed to access this balance sheet item");
        }

        return balanceSheetItem;
    }

    public List<BalanceSheetItem> getBalanceSheetItems(User user) {
        return balanceSheetItemRepository.findByUser(user);
    }

    public BalanceSheetItem createBalanceSheetItem(BalanceSheetItemRequest balanceSheetItemRequest, User user) {
        BalanceSheetItem balanceSheetItem = new BalanceSheetItem(balanceSheetItemRequest.getType(), balanceSheetItemRequest.getAmount(), user);
        updateUserWealth(user, balanceSheetItemRequest.getAmount(), balanceSheetItemRequest.getType());
        balanceSheetItemRepository.save(balanceSheetItem);

        return balanceSheetItem;
    }

    public BalanceSheetItem updateBalanceSheetItem(BalanceSheetItemRequest balanceSheetItemRequest, User user) {
        BalanceSheetItem existingBalanceSheetItem = getBalanceSheetItem(balanceSheetItemRequest.getId(), user);

        // offset old amount from wealth
        updateUserWealth(user, existingBalanceSheetItem.getAmount() * -1, existingBalanceSheetItem.getType());

        existingBalanceSheetItem.setType(balanceSheetItemRequest.getType());
        existingBalanceSheetItem.setAmount(balanceSheetItemRequest.getAmount());
        existingBalanceSheetItem.setUser(user);
        existingBalanceSheetItem.setUpdatedAt(LocalDateTime.now());

        // add new amount to wealth
        updateUserWealth(user, balanceSheetItemRequest.getAmount(), balanceSheetItemRequest.getType());
        
        balanceSheetItemRepository.save(existingBalanceSheetItem);

        return existingBalanceSheetItem;
    }

    public List<BalanceSheetItem> updateOrCreateBalanceSheetItems(BalanceSheetItemBulkRequest balanceSheetItemRequests, User user) {
        List<BalanceSheetItem> balanceSheetItems = balanceSheetItemRequests.getItems().stream()
            .map(request -> request.getId() == null 
                ? createBalanceSheetItem(request, user)
                : updateBalanceSheetItem(request, user))
            .collect(Collectors.toList());

        return balanceSheetItems;
    }
 
    public void deleteBalanceSheetItems(List<Long> ids, User user) {
        List<BalanceSheetItem> balanceSheetItems = balanceSheetItemRepository.findAllById(ids);
        balanceSheetItems.forEach(item -> {
            if (!item.getUser().equals(user)) {
                throw new ResponseStatusException(HttpStatus.FORBIDDEN, "You are not allowed to delete this balance sheet item");
            }

            updateUserWealth(user, item.getAmount() * -1, item.getType());
        });
        balanceSheetItemRepository.deleteAllById(ids);
    }

    private void updateUserWealth(User user, Long amount, BalanceSheetItem.ItemType type) {
        int multiplier = type == BalanceSheetItem.ItemType.ASSET ? 1 : -1;
        user.setWealth(user.getWealth() + amount * multiplier);
        userRepository.save(user);
    }
}
