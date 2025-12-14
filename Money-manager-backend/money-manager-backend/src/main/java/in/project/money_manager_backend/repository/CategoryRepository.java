package in.project.money_manager_backend.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import in.project.money_manager_backend.entity.CategoryEntity;

@Repository
public interface CategoryRepository extends JpaRepository<CategoryEntity, Long> {

	// Select * from tbl_categories where profile_id = ?
	List<CategoryEntity> findByProfileId(Long profileId);
	
	// Select * from tbl_categories where id = ? and profile_id = ?
	Optional<CategoryEntity> findByIdAndProfileId(Long id, Long profileId);

	// Select * from tbl_categories where type = ? and profile_id = ?
	List<CategoryEntity> findByTypeAndProfileId(String type, Long profileId);
	
	// Select * from tbl_categories where name = ? and profile_id = ?
	Boolean existsByNameAndProfileId(String name, Long profileId);
}