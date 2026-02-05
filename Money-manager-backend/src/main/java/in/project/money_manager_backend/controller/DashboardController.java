package in.project.money_manager_backend.controller;

import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import in.project.money_manager_backend.service.dashboard.IDashboardService;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/dashboard")
@RequiredArgsConstructor
public class DashboardController {

	private final IDashboardService dashboardService;

	@GetMapping
	public ResponseEntity<Map<String, Object>> getDashboardData() {
		Map<String, Object> dashboardData = dashboardService.getDashboardData();
		return ResponseEntity.ok(dashboardData);
	}
}
