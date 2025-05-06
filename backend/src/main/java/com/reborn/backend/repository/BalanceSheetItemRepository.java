package com.reborn.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.reborn.backend.model.BalanceSheetItem;
import com.reborn.backend.model.User;

@Repository
public interface BalanceSheetItemRepository extends JpaRepository<BalanceSheetItem, Long> {
    List<BalanceSheetItem> findByUser(User user);
} 