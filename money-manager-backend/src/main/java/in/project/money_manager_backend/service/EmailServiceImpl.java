package in.project.money_manager_backend.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class EmailServiceImpl implements IEmailService {

	private final JavaMailSender mailSender;

	@Value("${spring.mail.properties.mail.smtp.from}")
	private String fromEmail;
	
	@Override
	public void sendEmail(String to, String subject, String body) {
		try {
			SimpleMailMessage message = new SimpleMailMessage();
			message.setFrom(fromEmail);
			message.setTo(to);
			message.setSubject(subject);
			message.setText(body);
			mailSender.send(message);
		} catch (Exception e) {
			throw new RuntimeException(e.getMessage());
		}
		
	}
}
