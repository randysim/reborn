package com.reborn.backend.model;

import java.time.LocalDate;
import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;
    
    @Column(name = "username")
    private String username;
    
    @Column(name = "email")
    private String email;
    
    @Column(name = "picture")
    private String picture;
    
    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "birth_date")
    private LocalDate birthDate;

    @Column(name = "onboarded")
    private boolean onboarded;

    @Column(name = "timezone")
    private String timezone;

    // Stats
    @Column(name = "strength")
    private Long strength;
    @Column(name = "wealth")
    private Long wealth;
    @Column(name = "intelligence")
    private Long intelligence;
    @Column(name = "aura")
    private Long aura;
    @Column(name = "coins")
    private Long coins;
    @Column(name = "cheat_days")
    private Long cheatDays;

    @Column(name = "fitness_schedule")
    private Long[] fitnessSchedule = new Long[7];
    
    @Column(name = "fitness_schedule_completed")
    private boolean[] fitnessScheduleCompleted = new boolean[7];
    
    public User() {}
    public User(String username, String email) {
        this.username = username;
        this.email = email;
        this.createdAt = LocalDateTime.now();
        this.picture = "";
        this.coins = 0L;
        this.cheatDays = 5L;
        this.onboarded = false;
    }
    public User(String username, String email, String picture) {
        this.username = username;
        this.email = email;
        this.picture = picture;
        this.createdAt = LocalDateTime.now();
        this.coins = 0L;
        this.cheatDays = 5L;
        this.onboarded = false;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public String getPicture() { return picture; }

    public void setPicture(String picture) { this.picture = picture; }

    public Long getStrength() { return strength; }

    public void setStrength(Long strength) { this.strength = strength; }

    public Long getWealth() { return wealth; }

    public void setWealth(Long wealth) { this.wealth = wealth; }

    public Long getIntelligence() { return intelligence; }

    public void setIntelligence(Long intelligence) { this.intelligence = intelligence; }

    public Long getAura() { return aura; }

    public void setAura(Long aura) { this.aura = aura; }

    public Long[] getFitnessSchedule() {
        return fitnessSchedule;
    }

    public void setFitnessSchedule(Long[] fitnessSchedule) {
        this.fitnessSchedule = fitnessSchedule;
    }

    public boolean[] getFitnessScheduleCompleted() {
        return fitnessScheduleCompleted;
    }

    public void setFitnessScheduleCompleted(boolean[] fitnessScheduleCompleted) {
        this.fitnessScheduleCompleted = fitnessScheduleCompleted;
    }

    public Long getCoins() { return coins; }

    public void setCoins(Long coins) { this.coins = coins; }

    public Long getCheatDays() { return cheatDays; }

    public void setCheatDays(Long cheatDays) { this.cheatDays = cheatDays; }

    public LocalDate getBirthDate() { return birthDate; }

    public void setBirthDate(LocalDate birthDate) { this.birthDate = birthDate; }

    public boolean isOnboarded() { return onboarded; }

    public void setOnboarded(boolean onboarded) { this.onboarded = onboarded; }

    public String getTimezone() { return timezone; }

    public void setTimezone(String timezone) { this.timezone = timezone; }
}
