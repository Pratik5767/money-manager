package in.project.money_manager_backend.service.category;

import java.util.List;

import org.springframework.stereotype.Service;

import in.project.money_manager_backend.dto.CategoryDto;
import in.project.money_manager_backend.entity.CategoryEntity;
import in.project.money_manager_backend.entity.ProfileEntity;
import in.project.money_manager_backend.repository.CategoryRepository;
import in.project.money_manager_backend.service.profile.IProfileService;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CategoryServiceImpl implements ICategoryService {

	private final IProfileService profileService;
	private final CategoryRepository categoryRepository;

	@Override
	public CategoryDto saveCategory(CategoryDto dto) {
		ProfileEntity profile = profileService.getCurrentProfile();

		if (categoryRepository.existsByNameAndProfileId(dto.getName(), profile.getId())) {
			throw new RuntimeException("Category with this name already exists");
		}

		CategoryEntity newCategory = convertToEntity(dto, profile);
		newCategory = categoryRepository.save(newCategory);
		return convertToDto(newCategory);
	}

	// Get categories for the current user
	@Override
	public List<CategoryDto> getCategoriesForCurrentUsers() {
		ProfileEntity profile = profileService.getCurrentProfile();
		List<CategoryEntity> categories = categoryRepository.findByProfileId(profile.getId());
		return categories.stream().map(this::convertToDto).toList();
	}

	// get category by id for current user
	@Override
	public List<CategoryDto> getCategoriesByTypeForCurrentUsers(String type) {
		ProfileEntity profile = profileService.getCurrentProfile();
		List<CategoryEntity> entities = categoryRepository.findByTypeAndProfileId(type, profile.getId());
		return entities.stream().map(this::convertToDto).toList();
	}

	@Override
	public CategoryDto updateCategory(Long categoryId, CategoryDto dto) {
		ProfileEntity profile = profileService.getCurrentProfile();
		
		CategoryEntity existingCategory = categoryRepository.findByIdAndProfileId(categoryId, profile.getId())
				.orElseThrow(() -> new RuntimeException("Category not found or not accessible"));
		
		existingCategory.setName(dto.getName());
		existingCategory.setIcon(dto.getIcon());
		existingCategory = categoryRepository.save(existingCategory);
		return convertToDto(existingCategory);
	}

	// helper methods
	private CategoryEntity convertToEntity(CategoryDto dto, ProfileEntity profile) {
		return CategoryEntity.builder().name(dto.getName()).icon(dto.getIcon()).profile(profile).type(dto.getType())
				.build();
	}

	private CategoryDto convertToDto(CategoryEntity entity) {
		return CategoryDto.builder().id(entity.getId())
				.profileId(entity.getProfile() != null ? entity.getProfile().getId() : null).name(entity.getName())
				.icon(entity.getIcon()).createdAt(entity.getCreatedAt()).updatedAt(entity.getUpdatedAt())
				.type(entity.getType()).build();
	}
}