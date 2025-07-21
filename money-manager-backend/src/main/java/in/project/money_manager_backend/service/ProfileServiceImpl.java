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

	@Override
	public ProfileDto registerProfile(ProfileDto profileDto) {
		ProfileEntity newProfile = convertToEntity(profileDto);
		newProfile.setActivcationToken(UUID.randomUUID().toString());
		newProfile = profileRepository.save(newProfile);
		return convertToDto(newProfile);
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
