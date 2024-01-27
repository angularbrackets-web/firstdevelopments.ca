const SERVICE_ID = (await import.meta.env.PUBLIC_EMAILJS_SERVICE_ID) as string
const TEMPLATE_ID = (await import.meta.env.PUBLIC_EMAILJS_TEMPLATE_ID) as string
const USER_ID = (await import.meta.env.PUBLIC_EMAILJS_USER_ID) as string
const ACCESS_TOKEN = (await import.meta.env.PUBLIC_EMAILJS_ACCESS_TOKEN) as string

export type EmailTemplateParameters = {
    subject:string,
    message:string,
    to:string,
    sender:string
}

export type EmailModel = {
    service_id : string,
    template_id : string,
    user_id : string,
    accessToken : string,
    template_params : EmailTemplateParameters
}

// var templateParams : EmailTemplateParameters = {
//         "subject": "Test Email",
//         "message": "This is a test email 333",
//         "to":"ibrahim_na@outlook.com",
//         "sender":"info@oiacedmonton.ca"
//     }



export const sendEmail = async (templateParams : EmailTemplateParameters) => {
    let emailModel : EmailModel = {
        service_id: SERVICE_ID,
        template_id: TEMPLATE_ID,
        user_id: USER_ID,
        accessToken : ACCESS_TOKEN,
        template_params : templateParams
    }
    
    await fetch('https://api.emailjs.com/api/v1.0/email/send',{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify(emailModel)
    })
    .then(res => res.json())
    .then(data => {
        
        console.log('EMAIL SUCCESS => ', JSON.stringify(data))
    })
    .catch(error => {
        
        console.error('EMAIL ERROR => ', JSON.stringify(error))
    })
}


