package in.project.money_manager_backend.service.profile;

import java.util.Map;

import in.project.money_manager_backend.dto.AuthDto;
import in.project.money_manager_backend.dto.ProfileDto;
import in.project.money_manager_backend.entity.ProfileEntity;

public interface IProfileService {

	ProfileDto registerProfile(ProfileDto profileDto);
	
	boolean activateProfile(String activationToken);
	
	boolean isAccountActive(String email);
	
	ProfileEntity getCurrentProfile();
	
	ProfileDto getPublicProfile(String email);

	Map<String, Object> authenticateAndGenerateToken(AuthDto authDto);
}
