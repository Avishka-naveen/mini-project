import nodemailer from 'nodemailer';

const transporter=nodemailer.createTransport({
    host:'smtp.gmail.com',
    port:465,
    auth:{
        user:'quickhiresupport@gmail.com',
        pass:'slfsosckqbivdsyr',
    }



});

export default transporter;

