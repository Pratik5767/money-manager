package in.project.money_manager_backend.service.income;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import in.project.money_manager_backend.dto.IncomeDto;
import in.project.money_manager_backend.entity.CategoryEntity;
import in.project.money_manager_backend.entity.IncomeEntity;
import in.project.money_manager_backend.entity.ProfileEntity;
import in.project.money_manager_backend.repository.CategoryRepository;
import in.project.money_manager_backend.repository.IncomeRepository;
import in.project.money_manager_backend.service.profile.IProfileService;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class IncomeServiceImpl implements IIncomeService {

	private final CategoryRepository categoryRepository;
	private final IProfileService profileService;
	private final IncomeRepository incomeRepository;

	// Add a new income to the database
	@Override
	public IncomeDto addIncome(IncomeDto dto) {
		ProfileEntity profile = profileService.getCurrentProfile();
		CategoryEntity category = categoryRepository.findById(dto.getCategoryId())
				.orElseThrow(() -> new RuntimeException("Category not found"));
		IncomeEntity newIncome = convertToEntity(dto, profile, category);
		newIncome = incomeRepository.save(newIncome);
		return convertToDto(newIncome);
	}

	// Retrieve all the expenses for the current month or based on the start date
	// and end date
	@Override
	public List<IncomeDto> getCurrentMonthIncomesForCurrentUser() {
		ProfileEntity profile = profileService.getCurrentProfile();
		LocalDate now = LocalDate.now();
		LocalDate startDate = now.withDayOfMonth(1);
		LocalDate endDate = now.withDayOfMonth(now.lengthOfMonth());
		List<IncomeEntity> incomeList = incomeRepository.findByProfileIdAndDateBetween(profile.getId(), startDate,
				endDate);
		return incomeList.stream().map(this::convertToDto).toList();
	}

	// delete income by id for current user
	@Override
	public void deleteIncome(Long incomeId) {
		ProfileEntity profile = profileService.getCurrentProfile();
		IncomeEntity entity = incomeRepository.findById(incomeId)
				.orElseThrow(() -> new RuntimeException("Income not found"));
		if (!entity.getProfile().getId().equals(profile.getId())) {
			throw new RuntimeException("Unauthorized to delete this expense");
		}
		incomeRepository.delete(entity);
	}

	// Get latest 5 incomes for the current user
	@Override
	public List<IncomeDto> getLatest5IncomeForCurrentUser() {
		ProfileEntity profile = profileService.getCurrentProfile();
		List<IncomeEntity> incomes = incomeRepository.findTop5ByProfileIdOrderByDateDesc(profile.getId());
		return incomes.stream().map(this::convertToDto).toList();
	}

	// Get total incomes of the current user
	@Override
	public BigDecimal getTotalIncomeForCurrentUser() {
		ProfileEntity profile = profileService.getCurrentProfile();
		BigDecimal totalIncome = incomeRepository.findTotalIncomeByProfileId(profile.getId());
		return totalIncome != null ? totalIncome : BigDecimal.ZERO;
	}

	// Filter Expenses
	@Override
	public List<IncomeDto> filterIncomes(LocalDate startDate, LocalDate endDate, String keyword, Sort sort) {
		ProfileEntity profile = profileService.getCurrentProfile();
		List<IncomeEntity> incomes = incomeRepository.findByProfileIdAndDateBetweenAndNameContainingIgnoreCase(
				profile.getId(), startDate, endDate, keyword, sort);
		return incomes.stream().map(this::convertToDto).toList();
	}

	private IncomeEntity convertToEntity(IncomeDto dto, ProfileEntity profile, CategoryEntity category) {
		return IncomeEntity.builder().name(dto.getName()).icon(dto.getIcon()).amount(dto.getAmount())
				.date(dto.getDate()).profile(profile).category(category).build();
	}

	private IncomeDto convertToDto(IncomeEntity entity) {
		return IncomeDto.builder().id(entity.getId()).name(entity.getName()).icon(entity.getIcon())
				.categoryId(entity.getCategory() != null ? entity.getCategory().getId() : null)
				.categoryName(entity.getCategory() != null ? entity.getCategory().getName() : "N/A")
				.amount(entity.getAmount()).date(entity.getDate()).createdAt(entity.getCreatedAt())
				.updatedAt(entity.getUpdatedAt()).build();
	}

}
