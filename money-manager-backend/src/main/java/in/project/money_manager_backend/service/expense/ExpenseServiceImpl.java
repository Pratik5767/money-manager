package in.project.money_manager_backend.service.expense;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

import org.springframework.data.domain.Sort;
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

	// delete expense by id for current user
	@Override
	public void deleteExpense(Long expenseId) {
		ProfileEntity profile = profileService.getCurrentProfile();
		ExpenseEntity entity = expenseRepository.findById(expenseId)
				.orElseThrow(() -> new RuntimeException("Expense not found"));
		if (!entity.getProfile().getId().equals(profile.getId())) {
			throw new RuntimeException("Unauthorized to delete this expense");
		}
		expenseRepository.delete(entity);
	}

	// Get latest 5 expenses for the current user
	@Override
	public List<ExpenseDto> getLatest5ExpensesForCurrentUser() {
		ProfileEntity profile = profileService.getCurrentProfile();
		List<ExpenseEntity> expenses = expenseRepository.findTop5ByProfileIdOrderByDateDesc(profile.getId());
		return expenses.stream().map(this::convertToDto).toList();
	}

	// Get total expenses of the current user
	@Override
	public BigDecimal getTotelExpenseForCurrentUser() {
		ProfileEntity profile = profileService.getCurrentProfile();
		BigDecimal totalExpense = expenseRepository.findTotalExpenseByProfileId(profile.getId());
		return totalExpense != null ? totalExpense : BigDecimal.ZERO;
	}

	// Filter Expenses
	@Override
	public List<ExpenseDto> filterExpenses(LocalDate startDate, LocalDate endDate, String keyword, Sort sort) {
		ProfileEntity profile = profileService.getCurrentProfile();
		List<ExpenseEntity> expenses = expenseRepository.findByProfileIdAndDateBetweenAndNameContainingIgnoreCase(
				profile.getId(), startDate, endDate, keyword, sort);
		return expenses.stream().map(this::convertToDto).toList();
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
