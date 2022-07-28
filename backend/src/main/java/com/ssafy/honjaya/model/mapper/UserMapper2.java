package com.ssafy.honjaya.model.mapper;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ssafy.honjaya.model.entity.User;

public interface UserMapper2 extends JpaRepository<User, Integer> {
}
