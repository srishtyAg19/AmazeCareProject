package com.hexaware.AmazeCare.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.hexaware.AmazeCare.model.User;
@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);
    boolean existsByEmail(String email);
	Optional<User> findByUsernameOrEmail(String usernameOrEmail, String usernameOrEmail2);
}
