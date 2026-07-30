package com.mario.shopsphere.service;

import com.mario.shopsphere.entity.Category;
import com.mario.shopsphere.entity.Product;
import com.mario.shopsphere.exception.CategoryNotFoundException;
import com.mario.shopsphere.exception.ProductNotFoundException;
import com.mario.shopsphere.repository.CategoryRepository;
import com.mario.shopsphere.repository.ProductRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {

    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;

    public ProductService(ProductRepository productRepository, CategoryRepository categoryRepository) {
        this.productRepository = productRepository;
        this.categoryRepository = categoryRepository;
    }

    public Product save(Product product) {

        if (categoryRepository.existsById(product.getCategory().getId())) {
            return productRepository.save(product);
        }
        throw new CategoryNotFoundException("Category with id " + product.getCategory().getId() + " not found");
    }

    public List<Product> findAll() {
        return productRepository.findAll();
    }

    public Product findById(Long id){
        return productRepository.findById(id)
                .orElseThrow(() -> new ProductNotFoundException("Product with id " + id + " not found"));

    }

    public void deleteById(Long id){
        if(productRepository.existsById(id)) {
            productRepository.deleteById(id);
            return;
        }
        throw new ProductNotFoundException("Product with id " + id + " not found");
    }

    public Product update(Long id, Product product){

        Product existingProduct = productRepository.findById(id).orElse(null);

        if (existingProduct == null){
            throw new ProductNotFoundException("Product with id " + id + " not found");
        }

        if (!categoryRepository.existsById(product.getCategory().getId())){
            throw new CategoryNotFoundException("Category with id " + product.getCategory().getId() + " not found");
        }

        existingProduct.setName(product.getName());
        existingProduct.setDescription(product.getDescription());
        existingProduct.setPrice(product.getPrice());
        existingProduct.setImage(product.getImage());
        existingProduct.setStock(product.getStock());
        existingProduct.setCategory(product.getCategory());

        return productRepository.save(existingProduct);
    }
}
