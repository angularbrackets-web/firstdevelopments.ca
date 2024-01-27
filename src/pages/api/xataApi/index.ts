import { getXataClient, XataClient, type Message } from "../../../xata"
import { sendEmail, type EmailTemplateParameters } from "../emailJS"
const XATA_API_KEY = (await import.meta.env.PUBLIC_XATA_API_KEY) as string
const XATA_BRANCH = (await import.meta.env.PUBLIC_XATA_BRANCH) as string

export type EmailJsMessage = {
    Name: string,
    Email: string,
    Phone: string,
    Message: string
}

export async function insertContact(messageRecord:EmailJsMessage){
    //const xata = getXataClient()
    const xataClient = new XataClient({
        apiKey: XATA_API_KEY,
        branch: XATA_BRANCH
      })
        
    const record = await xataClient.db.Message.create({
        Name: messageRecord.Name,
        Email: messageRecord.Email,
        Phone: messageRecord.Phone,
        Message: messageRecord.Message,
    })
    
    const emailParameters : EmailTemplateParameters = {
        sender : messageRecord.Email,
        to : "care@firstdevelopments.ca",
        subject : `Message from ${messageRecord.Name}`,
        message : `
        Name : ${messageRecord.Name}
        Email : ${messageRecord.Email}
        Phone : ${messageRecord.Phone}
        Message : ${messageRecord.Message}`
    }

    await sendEmail(emailParameters)
}