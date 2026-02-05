package in.project.money_manager_backend.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import in.project.money_manager_backend.dto.CategoryDto;
import in.project.money_manager_backend.service.category.ICategoryService;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/categories")
public class CategoryController {

	private final ICategoryService categoryService;

	@PostMapping("/save")
	public ResponseEntity<CategoryDto> saveCategory(@RequestBody CategoryDto categoryDto) {
		CategoryDto saveCategory = categoryService.saveCategory(categoryDto);
		return ResponseEntity.status(HttpStatus.CREATED).body(saveCategory);
	}

	@GetMapping("/get")
	public ResponseEntity<List<CategoryDto>> getCategories() {
		List<CategoryDto> categories = categoryService.getCategoriesForCurrentUsers();
		return ResponseEntity.ok(categories);
	}

	@GetMapping("/{type}/get")
	public ResponseEntity<List<CategoryDto>> getCategortiesByTypeForCurrentUser(@PathVariable String type) {
		List<CategoryDto> categories = categoryService.getCategoriesByTypeForCurrentUsers(type);
		return ResponseEntity.ok(categories);
	}

	@PutMapping("/{categoryId}/update")
	public ResponseEntity<CategoryDto> updateCategory(@PathVariable Long categoryId, @RequestBody CategoryDto dto) {
		CategoryDto updateCategory = categoryService.updateCategory(categoryId, dto);
		return ResponseEntity.ok(updateCategory);
	}
}