package com.mario.shopsphere.service;

import com.mario.shopsphere.entity.Category;
import com.mario.shopsphere.entity.Product;
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
        return null;
    }

    public List<Product> findAll() {
        return productRepository.findAll();
    }

    public Product findById(Long id){
        return productRepository.findById(id).orElse(null);
    }

    public void deleteById(Long id){
        if(productRepository.existsById(id))
        {
            productRepository.deleteById(id);
        }
    }

    public Product update(Long id, Product product){

        Product existingProduct = productRepository.findById(id).orElse(null);

        if (existingProduct == null){
            return null;
        }

        if (!categoryRepository.existsById(product.getCategory().getId())){
            return null;
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
