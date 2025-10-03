package in.project.money_manager_backend.service.profile;

import java.util.Map;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import in.project.money_manager_backend.dto.AuthDto;
import in.project.money_manager_backend.dto.ProfileDto;
import in.project.money_manager_backend.entity.ProfileEntity;
import in.project.money_manager_backend.repository.ProfileRepository;
import in.project.money_manager_backend.service.mail.EmailService;
import in.project.money_manager_backend.util.JwtUtils;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ProfileServiceImpl implements IProfileService {

	private final ProfileRepository profileRepository;
	private final EmailService emailService;
	private final PasswordEncoder passwordEncoder;
	private final AuthenticationManager authenticationManager;
	private final JwtUtils jwtUtils;

	@Value("${app.activation.url}")
	private String activationURL;

	@Override
	public ProfileDto registerProfile(ProfileDto profileDto) {
		ProfileEntity newProfile = convertToEntity(profileDto);
		newProfile.setActivationToken(UUID.randomUUID().toString());
		newProfile = profileRepository.save(newProfile);
		// send activation email
		String activationLink = activationURL + "/api/v1/activate?token=" + newProfile.getActivationToken();
		String subject = "Activate your Money Manager account";
		String body = "Click on the following link to activate your account: " + activationLink;
		emailService.sendEmail(newProfile.getEmail(), subject, body);
		return convertToDto(newProfile);
	}

	@Override
	public boolean activateProfile(String activationToken) {
		return profileRepository.findByActivationToken(activationToken).map(profile -> {
			profile.setIsActive(true);
			profileRepository.save(profile);
			return true;
		}).orElse(false);
	}

	@Override
	public boolean isAccountActive(String email) {
		return profileRepository.findByEmail(email).map(ProfileEntity::getIsActive).orElse(false);
	}

	@Override
	public ProfileEntity getCurrentProfile() {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		return profileRepository.findByEmail(authentication.getName()).orElseThrow(
				() -> new UsernameNotFoundException("Profile not found with the email: " + authentication.getName()));
	}

	@Override
	public ProfileDto getPublicProfile(String email) {
		ProfileEntity currentUser = null;
		if (email == null) {
			currentUser = getCurrentProfile();
		} else {
			currentUser = profileRepository.findByEmail(email)
					.orElseThrow(() -> new UsernameNotFoundException("Profile not found with the email:" + email));
		}
		return convertToDto(currentUser);
	}

	@Override
	public Map<String, Object> authenticateAndGenerateToken(AuthDto authDto) {
		try {
			authenticationManager
					.authenticate(new UsernamePasswordAuthenticationToken(authDto.getEmail(), authDto.getPassword()));
			// Generate JWT token
			String token = jwtUtils.generateToken(authDto.getEmail());
			return Map.of("token", token, "user", getPublicProfile(authDto.getEmail()));
		} catch (Exception e) {
			throw new RuntimeException("Invalid email or password");
		}
	}

	private ProfileDto convertToDto(ProfileEntity profileEntity) {
		return ProfileDto.builder().id(profileEntity.getId()).fullName(profileEntity.getFullName())
				.email(profileEntity.getEmail()).profileImageUrl(profileEntity.getProfileImageUrl())
				.createdAt(profileEntity.getCreatedAt()).updatedAt(profileEntity.getUpdatedAt()).build();
	}

	private ProfileEntity convertToEntity(ProfileDto profileDto) {
		return ProfileEntity.builder().id(profileDto.getId()).fullName(profileDto.getFullName())
				.email(profileDto.getEmail()).password(passwordEncoder.encode(profileDto.getPassword()))
				.profileImageUrl(profileDto.getProfileImageUrl()).createdAt(profileDto.getCreatedAt())
				.updatedAt(profileDto.getUpdatedAt()).build();
	}
}