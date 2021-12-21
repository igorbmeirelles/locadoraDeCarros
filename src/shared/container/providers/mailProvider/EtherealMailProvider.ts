import { inject, injectable } from "tsyringe";
import { IMailProvider } from "./IMailProvider";
import nodeMailer, { Transporter } from "nodemailer";
import handlebars from "handlebars"
import fs from "fs";

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

  async sendMail(to: string, subject: string, variables: any, path: string): Promise<void> {

    const templateFileContent = fs.readFileSync(path).toString("utf-8")

    const templateParse = handlebars.compile(templateFileContent)

    const templateHtml = templateParse(variables)

    const message = await this.client.sendMail({
      to,
      from: "Rentex <noreply@rentex.com.br>",
      subject,
      html: templateHtml
    })
    console.log("Message sent: %s", message.messageId)
    console.log("Preview URL: %s", nodeMailer.getTestMessageUrl(message))
  }

}

export { EtherealMailProvider };