package in.project.money_manager_backend.service.email;

public interface IEmailService {

	public void sendEmail(String to, String subject, String body);
}
