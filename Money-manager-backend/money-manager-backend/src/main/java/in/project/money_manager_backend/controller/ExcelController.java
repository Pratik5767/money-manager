package in.project.money_manager_backend.controller;

import java.io.IOException;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import in.project.money_manager_backend.service.excel.IExcelService;
import in.project.money_manager_backend.service.expense.IExpenseService;
import in.project.money_manager_backend.service.income.IIncomeService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/excel")
@RequiredArgsConstructor
public class ExcelController {

	private final IExcelService excelService;
	private final IIncomeService incomeService;
	private final IExpenseService expenseService;

	@GetMapping("/download/income")
	public void downloadIncomeExcel(HttpServletResponse response, HttpServletRequest request) throws IOException {
		response.setContentType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
		response.setHeader("Content-Disposition", "attachment; filename=income.xlsx");
		excelService.writeIncomeToExcel(response.getOutputStream(),
				incomeService.getCurrentMonthIncomesForCurrentUser());
	}

	@GetMapping("/download/expense")
	public void downloadExpenseExcel(HttpServletResponse response, HttpServletRequest request) throws IOException {
		response.setContentType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
		response.setHeader("Content-Disposition", "attachment; filename=income.xlsx");
		excelService.writeExpenseToExcel(response.getOutputStream(),
				expenseService.getCurrentMonthExpensesForCurrentUser());
	}

}
