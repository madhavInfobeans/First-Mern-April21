import React, { useEffect, useState } from "react";

function Contact() {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const userContact = async () => {
    try {
      const res = await fetch("/getdata", {
        method: "GET",
        headers: {
          "Content-type": "application/json",
        },
      });
      const data = await res.json();
      console.log(data);
      setUserData({
        ...userData,
        name: data.name,
        email: data.email,
        phone: data.phone,
      });
      if (!res.status === 200) {
        const error = new Error(res.error);
        throw error;
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    userContact();
  }, []);

  const handleInputs = e => {
    const name = e.target.name;
    const value = e.target.value;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const contactForm = async e => {
    e.preventDefault();
    const { name, email, phone, message } = userData;
    const res = await fetch("/contact", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        phone,
        message,
      }),
    });
    const data = await res.json();
    if (!data) {
      console.log("message not send");
    } else {
      alert("Message send");
      setUserData({ ...userData, message: "" });
    }
  };
  return (
    <>
      <div className="contact_info">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-10 offset-lg-1 d-flex justifycontent-between"></div>
          </div>
        </div>
      </div>
      <div className="contact-form">
        <div className="container">
          <div className="row">
            <div className="col-lg-10 offset-lg-1">
              <div className="contact_form container py-5">
                <div className="contact_form_title">Get in Touch</div>
                <form method="POST" id="contact_form">
                  <div className="contact_form_name d-flex justify-content-between align-items-between">
                    <input
                      type="text"
                      id="contact_form_name"
                      name="name"
                      className="contact_form_name input_field"
                      placeholder="Name"
                      required="true"
                      value={userData.name}
                      onChange={handleInputs}
                    />
                    <input
                      type="email"
                      id="contact_form_email"
                      name="email"
                      className="contact_form_email input_field"
                      placeholder="Email"
                      required="true"
                      value={userData.email}
                      onChange={handleInputs}
                    />
                    <input
                      type="number"
                      id="contact_form_phone"
                      name="phone"
                      className="contact_form_phone input_field"
                      placeholder="Phone"
                      required="true"
                      value={userData.phone}
                      onChange={handleInputs}
                    />
                  </div>

                  <div className="contact_form_text mt-5">
                    <textarea
                      className="text_field contact_form_message"
                      name="message"
                      placeholder="Message"
                      value={userData.message}
                      onChange={handleInputs}
                      cols="30"
                      rows="10"
                    ></textarea>
                  </div>
                  <div className="contact_form_button">
                    <button
                      type="submit"
                      className="button contact_submit_buttton"
                      onClick={contactForm}
                    >
                      Send Message
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Contact;
