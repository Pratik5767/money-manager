package in.project.money_manager_backend.service;

public interface IEmailService {

	public void sendEmail(String to, String subject, String body);
}
