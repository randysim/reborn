package com.reborn.backend.util;

import java.util.ArrayList;
import java.util.List;
import java.util.function.Consumer;

import com.reborn.backend.model.User;

public class ShopData {
    public static class ShopItem {
        private final String name;
        private final Long price;
        private final Consumer<User> effect;

        public ShopItem(String name, Long price, Consumer<User> effect) {
            this.name = name;
            this.price = price;
            this.effect = effect;
        }

        public String getName() { return name; }
        public Long getPrice() { return price; }
        public Consumer<User> getEffect() { return effect; }
    }

    private static final List<ShopItem> shopItems = new ArrayList<>();

    static {
        // Strength training
        shopItems.add(new ShopItem(
            "Cheat Day",
            100L,
            user -> user.setCheatDays(user.getCheatDays() + 1)
        ));
    }

    public static List<ShopItem> getShopItems() {
        return shopItems;
    }

    public static ShopItem getShopItem(String name) {
        return shopItems.stream()
            .filter(item -> item.getName().equals(name))
            .findFirst()
            .orElse(null);
    }

    public static boolean purchaseItem(User user, String itemName) {
        ShopItem item = shopItems.stream()
            .filter(i -> i.getName().equals(itemName))
            .findFirst()
            .orElse(null);

        if (item == null || user.getCoins() < item.getPrice()) {
            return false;
        }

        user.setCoins(user.getCoins() - item.getPrice());
        item.getEffect().accept(user);
        return true;
    }
}
