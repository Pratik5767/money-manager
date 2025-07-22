package in.project.money_manager_backend.service;

import java.util.UUID;

import org.springframework.stereotype.Service;

import in.project.money_manager_backend.dto.ProfileDto;
import in.project.money_manager_backend.entity.ProfileEntity;
import in.project.money_manager_backend.repository.ProfileRepository;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ProfileServiceImpl implements IProfileService {

	private final ProfileRepository profileRepository;
	private final IEmailService emailService;
	
	@Override
	public ProfileDto registerProfile(ProfileDto profileDto) {
		ProfileEntity newProfile = convertToEntity(profileDto);
		newProfile.setActivationToken(UUID.randomUUID().toString());
		newProfile = profileRepository.save(newProfile);
		//send activation email
		String activationLink = "http://localhost:8080/api/v1/activate?token=" + newProfile.getActivationToken();
		String subject = "Activate your Money Manager account";
		String body = "Click on the following link to activate your account: " + activationLink;
		emailService.sendEmail(newProfile.getEmail(), subject, body);
		return convertToDto(newProfile);
	}
	
	@Override
	public boolean activateProfile(String activationToken) {
		return profileRepository.findByActivationToken(activationToken)
				.map(profile -> {
					profile.setIsActive(true);
					profileRepository.save(profile);
					return true;
				}).orElse(false);
	}
	
	private ProfileDto convertToDto(ProfileEntity profileEntity) {
		return ProfileDto.builder()
				.id(profileEntity.getId())
				.fullName(profileEntity.getFullName())
				.email(profileEntity.getEmail())
				.profileImageUrl(profileEntity.getProfileImageUrl())
				.createdAt(profileEntity.getCreatedAt())
				.updatedAt(profileEntity.getUpdatedAt())
				.build();
	}

	private ProfileEntity convertToEntity(ProfileDto profileDto) {
		return ProfileEntity.builder()
				.id(profileDto.getId())
				.fullName(profileDto.getFullName())
				.email(profileDto.getEmail())
				.password(profileDto.getPassword())
				.profileImageUrl(profileDto.getProfileImageUrl())
				.createdAt(profileDto.getCreatedAt())
				.updatedAt(profileDto.getUpdatedAt())
				.build();
	}

}