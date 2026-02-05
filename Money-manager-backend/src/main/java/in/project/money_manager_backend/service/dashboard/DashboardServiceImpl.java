package in.project.money_manager_backend.service.dashboard;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import org.springframework.stereotype.Service;

import in.project.money_manager_backend.dto.ExpenseDto;
import in.project.money_manager_backend.dto.IncomeDto;
import in.project.money_manager_backend.dto.RecentTransactionDto;
import in.project.money_manager_backend.entity.ProfileEntity;
import in.project.money_manager_backend.service.expense.IExpenseService;
import in.project.money_manager_backend.service.income.IIncomeService;
import in.project.money_manager_backend.service.profile.IProfileService;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class DashboardServiceImpl implements IDashboardService {

	private final IIncomeService incomeService;
	private final IExpenseService expenseService;
	private final IProfileService profileService;

	@Override
	public Map<String, Object> getDashboardData() {
		ProfileEntity profile = profileService.getCurrentProfile();
		Map<String, Object> returnValue = new LinkedHashMap<>();

		List<IncomeDto> latestIncomes = incomeService.getLatest5IncomeForCurrentUser();
		List<ExpenseDto> latestExpenses = expenseService.getLatest5ExpensesForCurrentUser();

		List<RecentTransactionDto> recentTransaction = Stream.concat(latestIncomes.stream()
				.map(income -> RecentTransactionDto.builder().id(income.getId()).profileId(profile.getId())
						.icon(income.getIcon()).name(income.getName()).amount(income.getAmount()).date(income.getDate())
						.createdAt(income.getCreatedAt()).updatedAt(income.getUpdatedAt()).type("income").build()),
				latestExpenses.stream()
						.map(expense -> RecentTransactionDto.builder().id(expense.getId()).profileId(profile.getId())
								.icon(expense.getIcon()).name(expense.getName()).amount(expense.getAmount())
								.date(expense.getDate()).createdAt(expense.getCreatedAt())
								.updatedAt(expense.getUpdatedAt()).type("expense").build()))
				.sorted((a, b) -> {
					int cmp = b.getDate().compareTo(a.getDate());
					if (cmp == 0 && a.getCreatedAt() != null && b.getCreatedAt() != null) {
						return b.getCreatedAt().compareTo(a.getCreatedAt());
					}
					return cmp;
				}).collect(Collectors.toList());
		returnValue.put("totalBalance",
				incomeService.getTotalIncomeForCurrentUser().subtract(expenseService.getTotelExpenseForCurrentUser()));
		returnValue.put("totalIncome", incomeService.getTotalIncomeForCurrentUser());
		returnValue.put("totalExpense", expenseService.getTotelExpenseForCurrentUser());
		returnValue.put("recent5Expenses", latestExpenses);
		returnValue.put("recent5Incomes", latestIncomes);
		returnValue.put("recentTransaction", recentTransaction);
		return returnValue;
	}

}
