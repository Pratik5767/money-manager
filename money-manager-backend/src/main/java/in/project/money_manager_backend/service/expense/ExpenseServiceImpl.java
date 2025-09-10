package in.project.money_manager_backend.service.expense;

import java.time.LocalDate;
import java.util.List;

import org.springframework.stereotype.Service;

import in.project.money_manager_backend.dto.ExpenseDto;
import in.project.money_manager_backend.entity.CategoryEntity;
import in.project.money_manager_backend.entity.ExpenseEntity;
import in.project.money_manager_backend.entity.ProfileEntity;
import in.project.money_manager_backend.repository.CategoryRepository;
import in.project.money_manager_backend.repository.ExpenseRepository;
import in.project.money_manager_backend.service.profile.IProfileService;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ExpenseServiceImpl implements IExpenseService {

	private final CategoryRepository categoryRepository;
	private final IProfileService profileService;
	private final ExpenseRepository expenseRepository;

	// Add a new expense to the database
	@Override
	public ExpenseDto addExpense(ExpenseDto dto) {
		ProfileEntity profile = profileService.getCurrentProfile();
		CategoryEntity category = categoryRepository.findById(dto.getCategoryId())
				.orElseThrow(() -> new RuntimeException("Category not found"));
		ExpenseEntity newExpense = convertToEntity(dto, profile, category);
		newExpense = expenseRepository.save(newExpense);
		return convertToDto(newExpense);
	}

	// Retrieve all the expenses for the current month or based on the start date
	// and end date
	@Override
	public List<ExpenseDto> getCurrentMonthExpensesForCurrentUser() {
		ProfileEntity profile = profileService.getCurrentProfile();
		LocalDate now = LocalDate.now();
		LocalDate startDate = now.withDayOfMonth(1);
		LocalDate endDate = now.withDayOfMonth(now.lengthOfMonth());
		List<ExpenseEntity> expenseList = expenseRepository.findByProfileIdAndDateBetween(profile.getId(), startDate,
				endDate);
		return expenseList.stream().map(this::convertToDto).toList();
	}

	private ExpenseEntity convertToEntity(ExpenseDto dto, ProfileEntity profile, CategoryEntity category) {
		return ExpenseEntity.builder().name(dto.getName()).icon(dto.getIcon()).amount(dto.getAmount())
				.date(dto.getDate()).profile(profile).category(category).build();
	}

	private ExpenseDto convertToDto(ExpenseEntity entity) {
		return ExpenseDto.builder().id(entity.getId()).name(entity.getName()).icon(entity.getIcon())
				.categoryId(entity.getCategory() != null ? entity.getCategory().getId() : null)
				.categoryName(entity.getCategory() != null ? entity.getCategory().getName() : "N/A")
				.amount(entity.getAmount()).date(entity.getDate()).createdAt(entity.getCreatedAt())
				.updatedAt(entity.getUpdatedAt()).build();
	}
}
