import React, { useEffect, useRef, useState } from 'react';
import emailjs from '@emailjs/browser'
import { IoIosCall } from "react-icons/io";
import { FaLocationDot } from "react-icons/fa6";
import { MdOutlineEmail } from "react-icons/md";


const Contact = () => {
    const form = useRef();
    const [successMessage, setSuccessMessage] = useState(false)

    const sendEmail = (e) => {
        e.preventDefault();

        emailjs
            .sendForm('service_hvttafm', 'template_wtrys0h', form.current, {
                publicKey: 'eaDmEq2dlXB0zWQSz',
            })
            .then(
                () => {
                    setSuccessMessage(true)
                    console.log('SUCCESS!');
                },
                (error) => {
                    console.log('FAILED...', error.text);
                },
            );
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            setSuccessMessage(false);
        }, 3000);

        return () => clearTimeout(timer);
    }, [successMessage]);
    
    return (
        <div>
            <div className="contactUs">
                <div className="title">
                    <h2></h2>
                </div>
                <div className="box">
                    <div className="contact form">
                        <h3>Send a message</h3>
                        <form ref={form} onSubmit={sendEmail}>
                            <div className="formBox">
                                <div className="row50">
                                    <div className="inputBox">
                                        <span>Full Name</span>
                                        <input type="text" name="from_name" placeholder="Vu Duy Viet" />
                                    </div>
                                </div>
                                <div className="row50">
                                    <div className="inputBox">
                                        <span>Email</span>
                                        <input type="text" name="from_email" placeholder="viet@gmail.com" />
                                    </div>
                                </div>
                                <div className="row100">
                                    <div className="inputBox">
                                        <span>Message</span>
                                        <textarea placeholder="write your message here..." name="message"></textarea>
                                    </div>
                                </div>
                                <div className="row100">
                                    <div className="inputBox">
                                        <input className='' type="submit" value="Send" name="" id="" />
                                    </div>
                                </div>
                            </div>
                            {successMessage && (
                                <div className="alert alert-success fade show"> Sent successfully !</div>
                            )}
                        </form>
                    </div>
                    <div className="contact info">
                        <h3>Contact info</h3>
                        <div className="infoBox">
                            <div>
                                <span><FaLocationDot /></span>
                                <p>Minh Khai, Hoang Mai <br /> Ha Noi</p>
                            </div>
                            <div>
                                <span><MdOutlineEmail /></span>
                                <a href="vuduyviet280902@gmail.com">vuduyviet280902@gmail.com</a>
                            </div>
                            <div>
                                <span><IoIosCall /></span>
                                <a href="tel:0942782573">0942782573</a>
                            </div>
                            <ul className="sci">
                                <li><a href="#"><ion-icon name="logo-facebook"></ion-icon></a></li>
                                <li><a href="#"><ion-icon name="logo-instagram"></ion-icon></a></li>
                                <li><a href="#"><ion-icon name="logo-linkedin"></ion-icon></a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="contact map">
                        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.7335946191265!2d105.84074577510447!3d21.003313480639694!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ac773026b415%3A0x499b8b613889f78a!2zVHLGsOG7nW5nIMSQ4bqhaSBI4buNYyBYw6J5IEThu7FuZyBIw6AgTuG7mWkgLSBIVUNF!5e0!3m2!1svi!2s!4v1713676996673!5m2!1svi!2s" loading="lazy"></iframe>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Contact;
