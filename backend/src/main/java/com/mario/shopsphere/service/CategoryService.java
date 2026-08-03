package com.mario.shopsphere.service;

import com.mario.shopsphere.dto.CategoryResponse;
import com.mario.shopsphere.entity.Category;
import com.mario.shopsphere.exception.CategoryNotFoundException;
import com.mario.shopsphere.repository.CategoryRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class CategoryService {

    private final CategoryRepository categoryRepository;

    public CategoryService(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    public CategoryResponse save(Category category) {
        Category saved = categoryRepository.save(category);
        return toResponse(saved);
    }

    public List<CategoryResponse> findAll() {

        List<Category> categories = categoryRepository.findAll();
        List<CategoryResponse> responses = new ArrayList<>();

        for (Category category : categories) {
            responses.add(toResponse(category));
        }

        return responses;
    }

    public CategoryResponse findById(Long id) {
        return toResponse(getCategory(id));
    }

    public void deleteById(Long id) {
        Category category = getCategory(id);
        categoryRepository.delete(category);
    }

    public CategoryResponse update(Long id, Category category) {

        Category existingCategory = getCategory(id);

        existingCategory.setName(category.getName());
        existingCategory.setDescription(category.getDescription());

        return toResponse(categoryRepository.save(existingCategory));
    }

    private Category getCategory(Long id) {
        return categoryRepository.findById(id)
                .orElseThrow(() ->
                        new CategoryNotFoundException("Category with id " + id + " not found"));
    }

    private CategoryResponse toResponse(Category category) {
        return new CategoryResponse(
                category.getId(),
                category.getName(),
                category.getDescription()
        );
    }

}
