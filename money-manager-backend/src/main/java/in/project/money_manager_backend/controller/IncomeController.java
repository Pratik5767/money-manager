package in.project.money_manager_backend.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import in.project.money_manager_backend.dto.IncomeDto;
import in.project.money_manager_backend.service.income.IIncomeService;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/incomes")
public class IncomeController {

	private final IIncomeService incomeService;

	@PostMapping("/add")
	public ResponseEntity<IncomeDto> addIncome(@RequestBody IncomeDto dto) {
		IncomeDto savedIncome = incomeService.addIncome(dto);
		return ResponseEntity.status(HttpStatus.CREATED).body(savedIncome);
	}
	
	@GetMapping("/get")
	public ResponseEntity<List<IncomeDto>> getIncomes() {
		List<IncomeDto> incomes = incomeService.getCurrentMonthIncomesForCurrentUser();
		return ResponseEntity.ok(incomes);
	}
}
