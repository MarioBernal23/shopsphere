package com.mario.shopsphere.service;

import com.mario.shopsphere.entity.Product;
import com.mario.shopsphere.repository.CategoryRepository;
import com.mario.shopsphere.repository.ProductRepository;
import org.springframework.stereotype.Service;

@Service
public class ProductService {

    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;

    public ProductService(ProductRepository productRepository, CategoryRepository categoryRepository) {
        this.productRepository = productRepository;
        this.categoryRepository = categoryRepository;
    }

    public Product save(Product product) {
        return productRepository.save(product);
    }
}
