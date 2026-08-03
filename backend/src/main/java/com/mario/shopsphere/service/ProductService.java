package com.mario.shopsphere.service;

import com.mario.shopsphere.dto.ProductResponse;
import com.mario.shopsphere.entity.Category;
import com.mario.shopsphere.entity.Product;
import com.mario.shopsphere.exception.CategoryNotFoundException;
import com.mario.shopsphere.exception.ProductNotFoundException;
import com.mario.shopsphere.repository.CategoryRepository;
import com.mario.shopsphere.repository.ProductRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ProductService {

    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;

    public ProductService(ProductRepository productRepository, CategoryRepository categoryRepository) {
        this.productRepository = productRepository;
        this.categoryRepository = categoryRepository;
    }

    public ProductResponse save(Product product) {

        Category category = getCategory(product.getCategory().getId());

        product.setCategory(category);

        Product saved = productRepository.save(product);
        return toResponse(saved);
    }

    public List<ProductResponse> findAll() {
        List<Product> products =  productRepository.findAll();
        List<ProductResponse> responses = new ArrayList<>();

        for(Product product : products) {
            responses.add(toResponse(product));
        }
        return responses;
    }

    public ProductResponse findById(Long id){
        return toResponse(getProduct(id));

    }

    public void deleteById(Long id){
        Product product = getProduct(id);
        productRepository.delete(product);
    }

    public ProductResponse update(Long id, Product product){

        Product existingProduct = getProduct(id);
        Category category = getCategory(product.getCategory().getId());

        existingProduct.setName(product.getName());
        existingProduct.setDescription(product.getDescription());
        existingProduct.setPrice(product.getPrice());
        existingProduct.setImage(product.getImage());
        existingProduct.setStock(product.getStock());
        existingProduct.setCategory(category);

        return toResponse(productRepository.save(existingProduct));
    }

    private ProductResponse toResponse(Product product) {
        return new ProductResponse(
                product.getId(),
                product.getName(),
                product.getDescription(),
                product.getPrice(),
                product.getImage(),
                product.getStock(),
                product.getCategory().getName()
        );
    }

    private Product getProduct(Long id) {
        return productRepository.findById(id)
                .orElseThrow(() -> new ProductNotFoundException("Product with id " + id + " not found"));
    }

    private Category getCategory(Long id) {
        return categoryRepository.findById(id)
                .orElseThrow(() ->
                        new CategoryNotFoundException("Category with id " + id + " not found"));
    }
}
