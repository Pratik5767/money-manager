package in.project.money_manager_backend.dto;

import java.time.LocalDate;

import lombok.Data;

@Data
public class FilterDto {

	private String type;
	private LocalDate startDate;
	private LocalDate endDate;
	private String keyword;
	private String sortField; // data, amount, name
	private String sortOrder; // aesc or desc
}
