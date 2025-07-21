package in.project.money_manager_backend.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import in.project.money_manager_backend.entity.ProfileEntity;

@Repository
public interface ProfileRepository extends JpaRepository<ProfileEntity, Long> {

	// SELECT * FROM tbl_profiles WHERE email = ?
	Optional<ProfileEntity> findByEmail(String email);
}
