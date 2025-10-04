package in.project.money_manager_backend.controller;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import in.project.money_manager_backend.dto.ExpenseDto;
import in.project.money_manager_backend.dto.FilterDto;
import in.project.money_manager_backend.dto.IncomeDto;
import in.project.money_manager_backend.service.expense.IExpenseService;
import in.project.money_manager_backend.service.income.IIncomeService;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/filters")
@RequiredArgsConstructor
public class FilterController {

	private final IExpenseService expenseService;
	private final IIncomeService incomeService;

	@PostMapping
	public ResponseEntity<?> filterTransactions(@RequestBody FilterDto filter) {
		// preparing the data or validation
		LocalDate startDate = filter.getStartDate() != null ? filter.getStartDate() : LocalDate.MIN;
		LocalDate endDate = filter.getEndDate() != null ? filter.getEndDate() : LocalDate.now();
		String keyword = filter.getKeyword() != null ? filter.getKeyword() : "";
		String sortField = filter.getSortField() != null ? filter.getSortField() : "date";
		Sort.Direction direction = "desc".equalsIgnoreCase(filter.getSortOrder()) ? Sort.Direction.DESC
				: Sort.Direction.ASC;
		Sort sort = Sort.by(direction, sortField);

		if ("income".equals(filter.getType())) {
			List<IncomeDto> incomes = incomeService.filterIncomes(startDate, endDate, keyword, sort);
			return ResponseEntity.ok(incomes);
		} else if ("expense".equals(filter.getType())) {
			List<ExpenseDto> expenses = expenseService.filterExpenses(startDate, endDate, keyword, sort);
			return ResponseEntity.ok(expenses);
		} else {
			return ResponseEntity.badRequest().body("Invalid Type. must be 'income' or 'expense'");
		}
	}

}
