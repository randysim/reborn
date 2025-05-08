package com.reborn.backend.service;

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

    public BalanceSheetItem getBalanceSheetItem(Long id) {
        Optional<BalanceSheetItem> balanceSheetItemOptional = balanceSheetItemRepository.findById(id);
        if (balanceSheetItemOptional.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Balance sheet item not found.");
        }
        return balanceSheetItemOptional.get();
    }

    public List<BalanceSheetItem> getBalanceSheetItems(User user) {
        return balanceSheetItemRepository.findByUser(user);
    }

    public void createBalanceSheetItem(BalanceSheetItemRequest balanceSheetItemRequest, User user) {
        BalanceSheetItem balanceSheetItem = new BalanceSheetItem(balanceSheetItemRequest.getType(), balanceSheetItemRequest.getAmount(), user);
        updateUserWealth(user, balanceSheetItemRequest.getAmount(), balanceSheetItemRequest.getType());
        balanceSheetItemRepository.save(balanceSheetItem);
    }

    public void updateBalanceSheetItem(BalanceSheetItemRequest balanceSheetItemRequest, User user) {
        BalanceSheetItem existingBalanceSheetItem = getBalanceSheetItem(balanceSheetItemRequest.getId());

        if (!existingBalanceSheetItem.getUser().equals(user)) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "You are not allowed to update this balance sheet item");
        }

        // offset old amount from wealth
        updateUserWealth(user, existingBalanceSheetItem.getAmount() * -1, existingBalanceSheetItem.getType());

        existingBalanceSheetItem.setType(balanceSheetItemRequest.getType());
        existingBalanceSheetItem.setAmount(balanceSheetItemRequest.getAmount());
        existingBalanceSheetItem.setUser(user);

        // add new amount to wealth
        updateUserWealth(user, balanceSheetItemRequest.getAmount(), balanceSheetItemRequest.getType());
        
        balanceSheetItemRepository.save(existingBalanceSheetItem);
    }

    public void updateOrCreateBalanceSheetItems(BalanceSheetItemBulkRequest balanceSheetItemRequests, User user) {
        balanceSheetItemRequests.getItems().stream()
            .forEach(request -> {
                if (request.getId() == null) {
                    createBalanceSheetItem(request, user);
                } else {
                    updateBalanceSheetItem(request, user);
                }
            });
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
