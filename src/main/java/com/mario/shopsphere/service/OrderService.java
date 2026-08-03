package com.mario.shopsphere.service;

import com.mario.shopsphere.dto.OrderItemResponse;
import com.mario.shopsphere.dto.OrderResponse;
import com.mario.shopsphere.entity.*;
import com.mario.shopsphere.exception.CartIsEmptyException;
import com.mario.shopsphere.exception.OrderNotFoundException;
import com.mario.shopsphere.repository.OrderRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class OrderService {

    private final OrderRepository orderRepository;
    private final CartService cartService;

    public OrderService(OrderRepository orderRepository,
                        CartService cartService) {
        this.orderRepository = orderRepository;
        this.cartService = cartService;
    }

    @Transactional
    public OrderResponse createOrder(User user) {
        Cart cart = cartService.getCart(user);

        if (cart.getItems().isEmpty()) {
            throw new CartIsEmptyException("Cart is empty");
        }

        Order order = new Order();

        for (CartItem cartItem : cart.getItems()) {
            OrderItem orderItem = new OrderItem();

            orderItem.setOrder(order);
            orderItem.setProduct(cartItem.getProduct());
            orderItem.setQuantity(cartItem.getQuantity());
            orderItem.setPrice(cartItem.getProduct().getPrice());

            order.getItems().add(orderItem);
        }

        order.setUser(user);
        order.setCreatedAt(LocalDateTime.now());
        order.setStatus(OrderStatus.PENDING);
        order.setTotal(cartService.calculateTotal(cart));

        Order savedOrder = orderRepository.save(order);

        cartService.clearCart(user);

        return toResponse(savedOrder);

    }

    public List<OrderResponse> getOrders(User user) {
        List<Order> orders = orderRepository.findByUserId(user.getId());
        List<OrderResponse> responses = new ArrayList<>();

        for (Order order : orders) {
            responses.add(toResponse(order));
        }

        return responses;
    }

    public OrderResponse getOrderById(User user, Long orderId) {
        return toResponse(getOrder(user, orderId));
    }

    private Order getOrder(User user, Long orderId) {
        return orderRepository.findByIdAndUserId(orderId, user.getId())
                .orElseThrow(() -> new OrderNotFoundException(("Order with id " + orderId + " not found")));

    }

    private OrderResponse toResponse(Order order) {

        List<OrderItemResponse> items = new ArrayList<>();

        for (OrderItem orderItem : order.getItems()) {
            items.add(toResponse(orderItem));
        }
        return new OrderResponse(
                order.getId(),
                items,
                order.getTotal(),
                order.getCreatedAt(),
                order.getStatus()
        );
    }

    private OrderItemResponse toResponse(OrderItem orderItem) {
        BigDecimal subtotal = orderItem.getPrice()
                .multiply(BigDecimal.valueOf(orderItem.getQuantity()));

        return new OrderItemResponse(
                orderItem.getProduct().getId(),
                orderItem.getProduct().getName(),
                orderItem.getPrice(),
                orderItem.getQuantity(),
                subtotal
        );
    }
}
