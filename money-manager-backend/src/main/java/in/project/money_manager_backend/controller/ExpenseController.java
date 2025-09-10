package in.project.money_manager_backend.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import in.project.money_manager_backend.dto.ExpenseDto;
import in.project.money_manager_backend.service.expense.IExpenseService;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/expenses")
public class ExpenseController {

	private final IExpenseService expenseService;

	@PostMapping("/add")
	public ResponseEntity<ExpenseDto> addExpense(@RequestBody ExpenseDto dto) {
		ExpenseDto savedExpense = expenseService.addExpense(dto);
		return ResponseEntity.status(HttpStatus.CREATED).body(savedExpense);
	}

	@GetMapping
	public ResponseEntity<List<ExpenseDto>> getExpenses() {
		List<ExpenseDto> expenses = expenseService.getCurrentMonthExpensesForCurrentUser();
		return ResponseEntity.ok(expenses);
	}
}
