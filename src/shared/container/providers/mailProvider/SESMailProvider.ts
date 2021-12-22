import { injectable } from "tsyringe";
import { SES } from "aws-sdk";
import { IMailProvider } from "./IMailProvider";
import nodeMailer, { Transporter } from "nodemailer";
import handlebars from "handlebars";
import fs from "fs";

@injectable()
class SESMailProvider implements IMailProvider {
  private client: Transporter;
  constructor() {
    this.client = nodeMailer.createTransport({
      SES: new SES({
        apiVersion: "2010-12-01",
        region: process.env.AWS_REGION,
      }),
    });
  }

  async sendMail(
    to: string,
    subject: string,
    variables: any,
    path: string
  ): Promise<void> {
    const templateFileContent = fs.readFileSync(path).toString("utf-8");

    const templateParse = handlebars.compile(templateFileContent);

    const templateHtml = templateParse(variables);

    await this.client.sendMail({
      to,
      from: "Rentex <inseriremailvalid@aqui.com.br>",
      subject,
      html: templateHtml,
    });
  }
}

export { SESMailProvider };
