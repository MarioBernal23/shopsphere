package com.mario.shopsphere.service;

import com.mario.shopsphere.dto.CartItemResponse;
import com.mario.shopsphere.dto.CartResponse;
import com.mario.shopsphere.entity.Cart;
import com.mario.shopsphere.entity.CartItem;
import com.mario.shopsphere.entity.Product;
import com.mario.shopsphere.entity.User;
import com.mario.shopsphere.exception.CartItemNotFoundException;
import com.mario.shopsphere.exception.CartNotFoundException;
import com.mario.shopsphere.exception.ProductNotFoundException;
import com.mario.shopsphere.repository.CartItemRepository;
import com.mario.shopsphere.repository.CartRepository;
import com.mario.shopsphere.repository.ProductRepository;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class CartService {

    private final CartRepository cartRepository;
    private final CartItemRepository cartItemRepository;
    private final ProductRepository productRepository;

    public CartService(CartRepository cartRepository, CartItemRepository cartItemRepository, ProductRepository productRepository) {
        this.cartRepository = cartRepository;
        this.cartItemRepository = cartItemRepository;
        this.productRepository = productRepository;
    }

    public CartResponse getCartByUserId(User user) {
        return toResponse(getOrCreateCart(user));
    }

    public CartResponse addProductToCart(User user, Long productId) {

        Cart cart = getOrCreateCart(user);
        Product product = getProduct(productId);

        Optional<CartItem> existingItem = cartItemRepository.findByCartIdAndProductId(
                cart.getId(),
                product.getId()
        );

        if (existingItem.isPresent()) {

            CartItem cartItem = existingItem.get();
            cartItem.setQuantity(cartItem.getQuantity() + 1);

            cartItemRepository.save(cartItem);

        } else {

            CartItem cartItem = new CartItem();

            cartItem.setCart(cart);
            cartItem.setProduct(product);
            cartItem.setQuantity(1);

            cart.getItems().add(cartItem);
            cartItemRepository.save(cartItem);
        }

        return toResponse(cart);
    }

    public CartResponse removeProductFromCart(User user, Long productId) {
        Cart cart = getOrCreateCart(user);
        Product product = getProduct(productId);
        CartItem cartItem = getCartItem(cart, product);

        cart.getItems().remove(cartItem);
        cartItemRepository.delete(cartItem);

        return toResponse(cart);
    }

    public CartResponse updateProductQuantity(User user, Long productId, Integer quantity) {
        Cart cart = getOrCreateCart(user);
        Product product = getProduct(productId);
        CartItem cartItem = getCartItem(cart, product);

        if (quantity <= 0) {
            return removeProductFromCart(user, productId);
        }

        cartItem.setQuantity(quantity);
        cartItemRepository.save(cartItem);

        return toResponse(cart);
    }

    public CartResponse clearCart(User user) {
        Cart cart = getOrCreateCart(user);

        cartItemRepository.deleteByCartId(cart.getId());
        cart.getItems().clear();

        return toResponse(cart);
    }

    private BigDecimal calculateTotal(Cart cart) {
        BigDecimal total = BigDecimal.ZERO;

        for(CartItem cartItem : cart.getItems()) {

            BigDecimal subtotal = cartItem.getProduct()
                    .getPrice()
                    .multiply(BigDecimal.valueOf(cartItem.getQuantity()));

            total = total.add(subtotal);
        }
        return total;
    }

    private Cart createCart(User user) {
        Cart cart = new Cart();
        cart.setUser(user);
        return cartRepository.save(cart);

    }

    private CartItem getCartItem(Cart cart, Product product) {
        return cartItemRepository.findByCartIdAndProductId(
                cart.getId(),
                product.getId()
        ).orElseThrow(() ->
                new CartItemNotFoundException("Product not found in cart"));
    }

    private Product getProduct(Long productId) {
        return productRepository.findById(productId)
                .orElseThrow(() ->
                        new ProductNotFoundException("Product not found"));
    }

    private Cart getOrCreateCart(User user) {
        return cartRepository.findByUserId(user.getId())
                .orElseGet(() -> createCart(user));
    }

    private CartResponse toResponse(Cart cart) {

        List<CartItemResponse> items = new ArrayList<>();

        for (CartItem cartItem : cart.getItems()) {
            items.add(toResponse(cartItem));
        }

        return new CartResponse(
                cart.getId(),
                items,
                calculateTotal(cart)
        );
    }

    private CartItemResponse toResponse(CartItem cartItem) {
        BigDecimal subtotal = cartItem.getProduct()
                .getPrice()
                .multiply(BigDecimal.valueOf(cartItem.getQuantity()));

        return new CartItemResponse(
                cartItem.getProduct().getId(),
                cartItem.getProduct().getName(),
                cartItem.getProduct().getPrice(),
                cartItem.getQuantity(),
                subtotal
        );
    }

}
