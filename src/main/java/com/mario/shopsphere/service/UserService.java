package com.mario.shopsphere.service;

import com.mario.shopsphere.entity.User;
import com.mario.shopsphere.exception.EmailAlreadyExistsException;
import com.mario.shopsphere.exception.UserNotFoundException;
import com.mario.shopsphere.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder){
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public User save(User user){

        if (userRepository.existsByEmail(user.getEmail())){
            throw new EmailAlreadyExistsException("Email is already registered");
        }
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    public List<User> findAll(){
        return userRepository.findAll();
    }

    public User findById(Long id){
        return userRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException("User with id " + id + " not found"));
    }

    public void delete(Long id){
        if (userRepository.existsById(id)){
            userRepository.deleteById(id);
            return;
        }
        throw new UserNotFoundException("User with id " + id + " not found");
    }

    public User update(Long id, User user){

        User existingUser = userRepository.findById(id).orElse(null);

        if (existingUser == null){
            throw new UserNotFoundException("User with id " + id + " not found");
        }

        if (!existingUser.getEmail().equals(user.getEmail())
                && userRepository.existsByEmail(user.getEmail())) {
            throw new EmailAlreadyExistsException("Email is already registered");
        }

        existingUser.setName(user.getName());
        existingUser.setEmail(user.getEmail());
        existingUser.setPassword(passwordEncoder.encode(user.getPassword()));
        existingUser.setRole(user.getRole());
        return userRepository.save(existingUser);
    }
}
