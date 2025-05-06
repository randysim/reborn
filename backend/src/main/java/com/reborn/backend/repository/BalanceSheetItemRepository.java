package com.reborn.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.reborn.backend.model.BalanceSheetItem;

@Repository
public interface BalanceSheetItemRepository extends JpaRepository<BalanceSheetItem, Long> {
} 