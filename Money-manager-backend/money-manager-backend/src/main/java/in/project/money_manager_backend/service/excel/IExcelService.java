package in.project.money_manager_backend.service.excel;

import java.io.IOException;
import java.io.OutputStream;
import java.util.List;

import in.project.money_manager_backend.dto.ExpenseDto;
import in.project.money_manager_backend.dto.IncomeDto;

public interface IExcelService {

	void writeIncomeToExcel(OutputStream os, List<IncomeDto> incomes) throws IOException;

	public void writeExpenseToExcel(OutputStream os, List<ExpenseDto> expenses) throws IOException;

}
