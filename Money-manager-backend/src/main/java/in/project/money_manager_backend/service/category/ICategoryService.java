package in.project.money_manager_backend.service.category;

import java.util.List;

import in.project.money_manager_backend.dto.CategoryDto;

public interface ICategoryService {

	CategoryDto saveCategory(CategoryDto dto);
	
	List<CategoryDto> getCategoriesForCurrentUsers();

	List<CategoryDto> getCategoriesByTypeForCurrentUsers(String type);
	
	CategoryDto updateCategory(Long categoryId, CategoryDto dto);
}