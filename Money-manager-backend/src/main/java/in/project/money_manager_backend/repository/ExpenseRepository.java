package in.project.money_manager_backend.repository;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import in.project.money_manager_backend.entity.ExpenseEntity;

@Repository
public interface ExpenseRepository extends JpaRepository<ExpenseEntity, Long> {

	// Select * from tbl_expenses Where profileId = ? Order By date DESC
	List<ExpenseEntity> findByProfileIdOrderByDateDesc(Long profileId);

	// Select * from tbl_expenses Where profileId = ? Order By date DESC limit 5
	List<ExpenseEntity> findTop5ByProfileIdOrderByDateDesc(Long profileId);

	@Query("SELECT SUM(e.amount) FROM ExpenseEntity e WHERE e.profile.id = :profileId")
	BigDecimal findTotalExpenseByProfileId(@Param("profileId") Long profileId);

	// Select * from tbl_expenses Where profileId = ? and date between ? and ? and
	// name LIKE %?4%
	List<ExpenseEntity> findByProfileIdAndDateBetweenAndNameContainingIgnoreCase(Long profileId, LocalDate startDate,
			LocalDate endDate, String keyword, Sort sort);

	// Select * from tbl_expenses Where profile_id = ? and data between ? and ?
	List<ExpenseEntity> findByProfileIdAndDateBetween(Long profileId, LocalDate startDate, LocalDate endDate);

	// Select * from  tb1_expenses Where profile_id = ? and date = ?
	List<ExpenseEntity> findByProfileIdAndDate(Long profileId, LocalDate date);
}