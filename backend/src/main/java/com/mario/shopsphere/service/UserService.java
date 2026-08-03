package com.mario.shopsphere.service;

import com.mario.shopsphere.dto.UserResponse;
import com.mario.shopsphere.entity.User;
import com.mario.shopsphere.exception.EmailAlreadyExistsException;
import com.mario.shopsphere.exception.UserNotFoundException;
import com.mario.shopsphere.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder){
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public UserResponse save(User user){

        if (userRepository.existsByEmail(user.getEmail())){
            throw new EmailAlreadyExistsException("Email is already registered");
        }
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        User userSaved =  userRepository.save(user);
        return toResponse(userSaved);
    }

    public List<UserResponse> findAll(){
        List<User> users =  userRepository.findAll();
        List<UserResponse> responses = new ArrayList<>();

        for(User user : users) {
            responses.add(toResponse(user));
        }
        return responses;
    }

    public UserResponse findById(Long id){
        return  toResponse(getUser(id));
    }

    public void delete(Long id){
        User user = getUser(id);
        userRepository.delete(user);
    }

    public UserResponse update(Long id, User user){

        User existingUser = getUser(id);

        if (!existingUser.getEmail().equals(user.getEmail())
                && userRepository.existsByEmail(user.getEmail())) {
            throw new EmailAlreadyExistsException("Email is already registered");
        }

        existingUser.setName(user.getName());
        existingUser.setEmail(user.getEmail());
        existingUser.setPassword(passwordEncoder.encode(user.getPassword()));
        existingUser.setRole(user.getRole());

        User userSaved = userRepository.save(existingUser);
        return toResponse(userSaved);
    }

    private User getUser(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() ->
                        new UserNotFoundException("User with id " + id + " not found"));
    }

    private UserResponse toResponse(User user) {
        return new UserResponse(
                user.getId(),
                user.getName(),
                user.getEmail(),
                user.getRole()
        );
    }
}
