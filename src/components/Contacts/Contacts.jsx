import { useState } from "react";
import { FaEnvelope, FaLock, FaCommentDots, FaMapMarkerAlt } from "react-icons/fa";
import "./Contacts.css";

const API_BASE = '/api/contact';

const ContactUs = () => {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validate = () => {
    let tempErrors = {};
    if (!formData.name) tempErrors.name = "Name is required";
    if (!formData.email) {
      tempErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = "Email is invalid";
    }
    if (!formData.message) tempErrors.message = "Message is required";
    return tempErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setIsSubmitting(true);
      setErrors({});
      try {
        const payload = { ...formData };
        const response = await fetch(API_BASE, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        const result = await response.json();
        if (!response.ok || !result.success) throw new Error(result.message || "Failed to send message");
        setSubmitted(true);
        setFormData({ name: "", email: "", subject: "", message: "" });
      } catch (error) {
        console.error("Contact form submission failed:", error);
        setErrors({ submit: error.message || "Something went wrong while sending your message." });
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className="contContainer">
      <div className="contBgMap"></div>

      <div className="contContent">
        <aside className="contLeftPanel">
          <div className="connStatus">
            &gt;&gt; connection secured.
          </div>

          <div className="contLeftHead">
            <h1 className="glitchTitle" data-text="CONTACT US">CONTACT US</h1>
            <p className="contSubtitle">
              <span className="txtLight">WE'RE HERE.</span> <span className="txtGreen">DROP US A LINE.</span>
            </p>
          </div>

          <div className="contProgressBar"></div>

          <p className="contCopy">
            Have a question, proposal, or just want to<br/>
            say hi? We'll get back to you &mdash;<br/>
            securely and promptly.
          </p>

          <div className="contMtdSection">
            <h3 className="mtdHeading">&gt;_ OTHER WAYS TO REACH US</h3>

            <div className="contMtds">
              <div className="contMtd">
                <span className="mtdIcon"><FaEnvelope /></span>
                <div>
                  <p className="mtdLabel">EMAIL</p>
                  <p className="mtdVal">suentrabarofficial@gmail.com</p>
                </div>
              </div>

              <div className="contMtd">
                <span className="mtdIcon"><FaLock /></span>
                <div>
                  <p className="mtdLabel">ENCRYPTED PGP</p>
                  <p className="mtdVal">netrapersonal@gmail.com</p>
                </div>
              </div>

              <div className="contMtd">
                <span className="mtdIcon"><FaCommentDots /></span>
                <div>
                  <p className="mtdLabel">SECURE MESSAGE</p>
                  <p className="mtdVal">via Session ID: 05A7-F3C2-9E6D</p>
                </div>
              </div>

              <div className="contMtd">
                <span className="mtdIcon"><FaMapMarkerAlt /></span>
                <div>
                  <p className="mtdLabel">LOCATION</p>
                  <p className="mtdVal">Kalyani,Nadia</p>
                </div>
              </div>
            </div>
          </div>

          <div className="contQuotePanel">
            <p>We don't just build in the dark.<br/>We protect what matters.<br/><br/>&gt;_</p>
          </div>
        </aside>

        <section className="contRightPanel">
          <div className="contRightHead">
            <h3 className="rightHeading">&gt;_ SEND US A MESSAGE</h3>
          </div>

          {submitted && (
            <div className="successMsg">
              <p>[+] Transmission successful. Decrypting response queue...</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="contForm">
            <div className="frmGrp">
              <label htmlFor="name" className="frmLabel">NAME</label>
              <input
                type="text" id="name" name="name"
                value={formData.name} onChange={handleChange}
                className={`frmInput ${errors.name ? "error" : ""}`}
                placeholder="Your name"
              />
              {errors.name && <span className="errTxt">{errors.name}</span>}
            </div>

            <div className="frmGrp">
              <label htmlFor="email" className="frmLabel">EMAIL</label>
              <input
                type="email" id="email" name="email"
                value={formData.email} onChange={handleChange}
                className={`frmInput ${errors.email ? "error" : ""}`}
                placeholder="you@domain.com"
              />
              {errors.email && <span className="errTxt">{errors.email}</span>}
            </div>

            <div className="frmGrp">
              <label htmlFor="subject" className="frmLabel">SUBJECT</label>
              <input
                type="text" id="subject" name="subject"
                value={formData.subject} onChange={handleChange}
                className="frmInput"
                placeholder="How can we help?"
              />
            </div>

            <div className="frmGrp">
              <label htmlFor="message" className="frmLabel">MESSAGE</label>
              <textarea
                id="message" name="message"
                value={formData.message} onChange={handleChange}
                rows="5"
                className={`frmTextarea ${errors.message ? "error" : ""}`}
                placeholder="Type your message..."
              />
              {errors.message && <span className="errTxt">{errors.message}</span>}
            </div>

            {errors.submit && <span className="errTxt submitErr">{errors.submit}</span>}

            <div className="frmSubmitWrap">
              <button type="submit" className="submitBtn" disabled={isSubmitting}>
                {isSubmitting ? '>_ TRANSMITTING...' : '>_ SEND SECURELY'}
              </button>
            </div>
          </form>

          <div className="contFootnote">
            <FaLock className="footnoteIcon" />
            <p>Your message is encrypted end-to-end.<br/>We take privacy seriously.</p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ContactUs;
