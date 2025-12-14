package in.project.money_manager_backend.service.expense;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

import org.springframework.data.domain.Sort;

import in.project.money_manager_backend.dto.ExpenseDto;

public interface IExpenseService {

	ExpenseDto addExpense(ExpenseDto dto);

	List<ExpenseDto> getCurrentMonthExpensesForCurrentUser();

	void deleteExpense(Long expenseId);

	List<ExpenseDto> getLatest5ExpensesForCurrentUser();

	BigDecimal getTotelExpenseForCurrentUser();

	List<ExpenseDto> filterExpenses(LocalDate startDate, LocalDate endDate, String keyword, Sort sort);

	List<ExpenseDto> getExpensesForUserOnDate(Long profileId, LocalDate date);
}
