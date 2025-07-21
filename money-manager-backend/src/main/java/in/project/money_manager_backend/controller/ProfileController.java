package in.project.money_manager_backend.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import in.project.money_manager_backend.dto.ProfileDto;
import in.project.money_manager_backend.service.IProfileService;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class ProfileController {

	private final IProfileService profileService;
	
	@PostMapping("/register")
	public ResponseEntity<ProfileDto> registerProfile(@RequestBody ProfileDto profileDto) {
		ProfileDto registerProfile = profileService.registerProfile(profileDto);
		return ResponseEntity.status(HttpStatus.CREATED).body(registerProfile);
	}
}
