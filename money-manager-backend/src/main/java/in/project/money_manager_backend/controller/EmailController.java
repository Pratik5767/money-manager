package in.project.money_manager_backend.controller;

import java.io.ByteArrayOutputStream;
import java.io.IOException;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import in.project.money_manager_backend.entity.ProfileEntity;
import in.project.money_manager_backend.service.excel.IExcelService;
import in.project.money_manager_backend.service.expense.IExpenseService;
import in.project.money_manager_backend.service.income.IIncomeService;
import in.project.money_manager_backend.service.mail.EmailService;
import in.project.money_manager_backend.service.profile.IProfileService;
import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/email")
@RequiredArgsConstructor
public class EmailController {

	private final IExcelService excelService;
	private final IIncomeService incomeService;
	private final IExpenseService expenseService;
	private final EmailService emailService;
	private final IProfileService profileService;

	@GetMapping("/income-excel")
	public ResponseEntity<Void> emailIncomeExcel() throws IOException, MessagingException {
		ProfileEntity profile = profileService.getCurrentProfile();
		ByteArrayOutputStream baos = new ByteArrayOutputStream();
		excelService.writeIncomeToExcel(baos, incomeService.getCurrentMonthIncomesForCurrentUser());
		emailService.sendEmailWithAttachment(
				profile.getEmail(), 
				"Your Income Excel Report",
				"Please find attached your income report", 
				baos.toByteArray(), 
				"income.xlsx");
		return ResponseEntity.ok(null);
	}
	
	@GetMapping("/expense-excel")
	public ResponseEntity<Void> emailExpenseExcel() throws IOException, MessagingException {
		ProfileEntity profile = profileService.getCurrentProfile();
		ByteArrayOutputStream baos = new ByteArrayOutputStream();
		excelService.writeExpenseToExcel(baos, expenseService.getCurrentMonthExpensesForCurrentUser());
		emailService.sendEmailWithAttachment(
				profile.getEmail(), 
				"Your Income Excel Report",
				"Please find attached your income report", 
				baos.toByteArray(), 
				"income.xlsx");
		return ResponseEntity.ok(null);
	}

}
