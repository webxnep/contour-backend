import { NextFunction, Request, Response } from "express";
import AppError from "../utils/appError";
var colors = require("colors");
import nodemailer from "nodemailer";
import { CreateMailInput } from "../schema/mail.schema";


const FRONTEND_URL="https://epeakexpedition.com"
export async function sendMailHandler(req: Request<{}, {}, CreateMailInput["body"]>, res: Response, next: NextFunction) {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: "info@epeakexpedition.com",
        pass: "xefj njrz wifl utzh",
      },
    });

    console.log(req.body);

    const info = await transporter.sendMail({
      from: "Epeak Expedition",
      to: req.body.email,
      subject: req.body.subject,
      html: `<div>
      <div class="container">
       <div class="content">
           <p class="heading">${req.body.message}</p>
           
       </div>
       <div class="footer">
           <p>Thanks and Regards, Epeak Expedition .</p>
           <p>For any queries contact us here:</p>
          <p>
          <p>Please, visit our Website: 
          <a  href="${FRONTEND_URL}"> epeakexpedition.com</a>
          </p>
           <p>Phone: +977 9761725425</p>     
   </div>
   </div>
     </div>`,
    });

    return res.status(200).json({
      status: "success",
      msg: "Reply has been sent",
    });
  } catch (error: any) {
    console.error(colors.red("msg:", error.message));
    next(new AppError("Internal server error", 500));
  }
}
