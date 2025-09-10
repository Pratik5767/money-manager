package in.project.money_manager_backend.service.expense;

import java.util.List;

import in.project.money_manager_backend.dto.ExpenseDto;

public interface IExpenseService {

	ExpenseDto addExpense(ExpenseDto dto);
	
	List<ExpenseDto> getCurrentMonthExpensesForCurrentUser();
	
	void deleteExpense(Long expenseId);
}
