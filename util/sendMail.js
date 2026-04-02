import nodemailer from "nodemailer";

// SMTP = > simple mail transfer protocol
export const sendEmail = async (options) => {
    console.log("line 0");
    
    try {
        console.log("line 1");
        
        const transporter = nodemailer.createTransport({
            service : process.env.SMTP_SERVICE,
            auth : {
                user : process.env.SMTP_MAIL,
                pass : process.env.SMTP_PASSWORD
            }
        })

        console.log("i m in mail transpoter");
        

        const emailoptions = {
            from : process.env.SMTP_MAIL,
            to : options.email,
            subject : options.subject,
            text : options.message
        }

        await transporter.sendMail(emailoptions)
    } catch (error) {
        console.log(error);
        
    }
}

// mvc => model, view, controller