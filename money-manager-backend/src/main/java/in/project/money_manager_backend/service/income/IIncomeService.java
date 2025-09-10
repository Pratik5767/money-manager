package in.project.money_manager_backend.service.income;

import java.util.List;

import in.project.money_manager_backend.dto.IncomeDto;

public interface IIncomeService {
	
	IncomeDto addIncome(IncomeDto dto);
	
	public List<IncomeDto> getCurrentMonthIncomesForCurrentUser();
	
	public void deleteIncome(Long incomeId);
}
