import { inject, injectable } from "tsyringe";
import { IMailProvider } from "./IMailProvider";
import nodeMailer, { Transporter } from "nodemailer";

@injectable()
class EtherealMailProvider implements IMailProvider {
  private client: Transporter
  constructor() {
    nodeMailer.createTestAccount().then(account => {
      const transporter = nodeMailer.createTransport({
        host: account.smtp.host,
        port: account.smtp.port,
        secure: account.smtp.secure,
        auth: {
          user: account.user,
          pass: account.pass
        }
      })
      this.client = transporter
    })
    .catch(err => console.log(err))
    
  }

  async sendMail(to: string, subject: string, body: string): Promise<void> {
    const message = await this.client.sendMail({
      to,
      from: "Rentex <noreply@rentex.com.br>",
      subject,
      text: body,
      html: body
    })
    console.log("Message sent: %s", message.messageId)
    console.log("Preview URL: %s", nodeMailer.getTestMessageUrl(message))
  }

}

export { EtherealMailProvider };