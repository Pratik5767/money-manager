package in.project.money_manager_backend.repository;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import in.project.money_manager_backend.entity.IncomeEntity;

@Repository
public interface IncomeRepository extends JpaRepository<IncomeEntity, Long> {

	// Select * from tbl_incomes Where profileId = ? Order By date DESC
	List<IncomeEntity> findByProfileIdOrderByDateDesc(Long profileId);

	// Select * from tbl_incomes Where profileId = ? Order By date DESC limit 5
	List<IncomeEntity> findTop5ByProfileIdOrderByDateDesc(Long profileId);

	@Query("SELECT SUM(e.amount) FROM IncomeEntity e WHERE e.profile.id = :profileId")
	BigDecimal findTotalExpenseByProfileId(@Param("profileId") Long profileId);

	// Select * from tbl_incomes Where profileId = ? and date between ? and ? and
	// name LIKE %?4%
	List<IncomeEntity> findByProfileIdAndDateBetweenAndNameContainingIgnoreCase(Long profileId, LocalDate startDate,
			LocalDate endDate, String keyword, Sort sort);

	// Select * from tbl_incomes Where profile_id = ? and data between ? and ?
	List<IncomeEntity> findByProfileIdAndDateBetween(Long profileId, LocalDate startDate, LocalDate endDate);

}