package com.mario.shopsphere.controller;

import com.mario.shopsphere.dto.CartResponse;
import com.mario.shopsphere.entity.User;
import com.mario.shopsphere.service.CartService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/cart")
public class CartController {

    private final CartService cartService;

    public CartController(CartService cartService) {
        this.cartService = cartService;
    }

    @GetMapping
    public ResponseEntity<CartResponse> getCart() {
        return ResponseEntity.ok(cartService.getCartByUserId(getAuthenticatedUser()));
    }

    @PostMapping("/products/{productId}")
    public ResponseEntity<CartResponse> addProductToCart(@PathVariable Long productId) {
        return ResponseEntity.ok(cartService.addProductToCart(getAuthenticatedUser(), productId));
    }

    @PutMapping("/products/{productId}")
    public ResponseEntity<CartResponse> updateProductQuantity(
            @PathVariable Long productId,
            @RequestParam Integer quantity) {
        return ResponseEntity.ok(cartService.updateProductQuantity(getAuthenticatedUser(), productId, quantity));
    }

    @DeleteMapping("/products/{productId}")
    public ResponseEntity<CartResponse> removeProductFromCart(@PathVariable Long productId) {
        return ResponseEntity.ok(cartService.removeProductFromCart(getAuthenticatedUser(), productId));
    }

    @DeleteMapping
    public ResponseEntity<CartResponse> clearCart() {
        return ResponseEntity.ok(cartService.clearCart(getAuthenticatedUser()));
    }

    private User getAuthenticatedUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return (User) authentication.getPrincipal();
    }
}
