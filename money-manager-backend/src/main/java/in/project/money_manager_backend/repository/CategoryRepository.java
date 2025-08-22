package in.project.money_manager_backend.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import in.project.money_manager_backend.entity.CategoryEntitiy;

@Repository
public interface CategoryRepository extends JpaRepository<CategoryEntitiy, Long> {

	// Select * from tbl_profiles where profile_id = ?
	List<CategoryEntitiy> findByProfileId(Long profileId);
	
	// select * from tbl_categories where id = ? and profile_id = ?
	Optional<CategoryEntitiy> findByIdAndProfileId(Long id, Long profileId);

	// select * from tbl_categories where type = ? and profile_id = ?
	List<CategoryEntitiy> findByTypeAndProfileId(String type, Long profileId);
	
	// select * from tbl_categories where name = ? and profileId = ?
	Boolean existsByNameAndProfileId(String name, Long profileId);
}