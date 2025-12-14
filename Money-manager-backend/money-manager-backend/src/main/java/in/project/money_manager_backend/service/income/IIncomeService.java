package in.project.money_manager_backend.service.income;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

import org.springframework.data.domain.Sort;

import in.project.money_manager_backend.dto.IncomeDto;

public interface IIncomeService {

	IncomeDto addIncome(IncomeDto dto);

	public List<IncomeDto> getCurrentMonthIncomesForCurrentUser();

	public void deleteIncome(Long incomeId);

	List<IncomeDto> getLatest5IncomeForCurrentUser();

	BigDecimal getTotalIncomeForCurrentUser();
	
	List<IncomeDto> filterIncomes(LocalDate startDate, LocalDate endDate, String keyword, Sort sort);
}
