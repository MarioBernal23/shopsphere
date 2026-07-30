package com.mario.shopsphere.service;

import com.mario.shopsphere.entity.Category;
import com.mario.shopsphere.exception.CategoryNotFoundException;
import com.mario.shopsphere.repository.CategoryRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryService {

    private final CategoryRepository categoryRepository;

    public CategoryService(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    public Category save(Category category) {
        return categoryRepository.save(category);
    }

    public List<Category> findAll() {
        return categoryRepository.findAll();
    }

    public Category findById(Long id){

        return categoryRepository.findById(id)
                .orElseThrow(() -> new CategoryNotFoundException("Category with id " + id + " not found"));
    }

    public void deleteById(Long id){
        if (categoryRepository.existsById(id)){
            categoryRepository.deleteById(id);
            return;
        }
        throw new CategoryNotFoundException("Category with id " + id + " not found");
    }

    public Category update(Long id, Category category){

        Category existingCategory = categoryRepository.findById(id).orElse(null);

        if (existingCategory == null){
            throw new CategoryNotFoundException("Category with id " + id + " not found");
        }

        existingCategory.setName(category.getName());
        existingCategory.setDescription(category.getDescription());

        return categoryRepository.save(existingCategory);
    }

}
