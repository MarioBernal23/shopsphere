package com.mario.shopsphere.service;

import com.mario.shopsphere.entity.Category;
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
        return categoryRepository.findById(id).orElse(null);
    }

    public void deleteById(Long id){
        categoryRepository.deleteById(id);
    }

    public Category update(Long id, Category category){

        Category existingCategory = categoryRepository.findById(id).orElse(null);

        if (existingCategory == null){
            return null;
        }

        existingCategory.setName(category.getName());
        existingCategory.setDescription(category.getDescription());

        return categoryRepository.save(existingCategory);
    }

}
