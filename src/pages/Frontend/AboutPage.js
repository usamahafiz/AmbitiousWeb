import React from "react";
import "../../assets/css/aboutpage.css";
import AboutImg from "../../assets/images/AboutImg.png";
import CEO from "../../assets/images/ceoo.jpg";
import img1 from "../../assets/images/stu5.png";
import img2 from "../../assets/images/stu5.png";
import img3 from "../../assets/images/stu5.png";

const AboutSection = () => {
  return (
    <section className="about-container">
         {/* About Hero Section */}
       <div className="about-section">
         <img src={AboutImg} alt="About Us" className="background-image" />
         <div className="overlay"></div>
         <div className="content">
           <h2>About Us</h2>
           <p>
             We are dedicated to providing the best services with a focus on quality and innovation.
           </p>
           <button className="learn-more">Learn More</button>
         </div>
       </div>
      <h2 className="about-title mt-5 text-dark">Preparing Students to Achieve Success</h2>
      <div className="title-underline"></div>
      <div className="about-content">
        {/* Section 1 */}
        <div className="about-row">
          <div className="about-text">
            <h3>Empowering Minds, Transforming Futures</h3>
            <p>
            We provide students with cutting-edge knowledge, critical thinking skills, and the confidence to navigate the challenges of the modern world. Our holistic approach ensures a strong foundation for lifelong success.
            </p>
            <button className="about-btn">View More</button>
          </div>
          <div className="about-image-wrapper">
            <div className="about-image-bg"></div>
            <img src={img1} alt="Confident Learners" className="about-image" />
          </div>
        </div>

        {/* Section 2 */}
        <div className="about-row about-reverse">
         
          <div className="about-text">
            <h3>Innovative Learning, Limitless Possibilities</h3>
            <p>
            Our dynamic classrooms foster curiosity and creativity, encouraging students to explore, experiment, and excel. With interactive experiences and real-world applications, learning becomes an exciting journey.
            </p>
            <button className="about-btn">View More</button>
          </div>
          <div className="about-image-wrapper">
            <div className="about-image-bg"></div>
            <img src={img2} alt="Unique Classroom" className="about-image" />
          </div>
        </div>

        {/* Section 3 */}
        <div className="about-row">
          <div className="about-text">
            <h3>Mentors Who Inspire, Guide, and Elevate</h3>
            <p>
            Our passionate educators go beyond teaching—they mentor, motivate, and shape future leaders. With personalized attention and unwavering support, every student receives the guidance they need to reach their full potential.


            </p>
            <button className="about-btn">View More</button>
          </div>
          <div className="about-image-wrapper">
            <div className="about-image-bg"></div>
            <img src={img3} alt="Passionate Teachers" className="about-image" />
          </div>
        </div>
      </div>


             {/* Our Mission Section */}
       <div className="container " style={{ paddingTop: "50px", paddingBottom: "100px" }}>
         <div className="row">
           <div className="col-md-6 d-flex justify-content-center align-items-center flex-column align-items-md-start">
             <h3 style={{ fontFamily: "Playfair Display", fontSize: "50px", color : 'black' }} className="mb-3">
             Message from Our CEO
             </h3>
             <p className="mt-3 mb-4" style={{ fontSize: "20px" }}>
             We are committed to redefining the way education is experienced. Our mission is to empower learners with the knowledge, skills, and confidence they need to thrive in an ever-evolving world. Education is not just about acquiring information—it’s about inspiring change, fostering creativity, and unlocking potential.
               <br /><br />
               We believe that learning should be limitless, accessible, and engaging. Whether you're a student preparing for a bright future, a professional striving for career growth, our platform is here to support your journey. Through innovative resources, expert guidance, and a vibrant learning community, we are dedicated to helping you achieve your goals and dreams.
             </p>
             <button className="learn-more mb-2">Learn More</button>
           </div>
           <div className="col-md-6">
             <img src={CEO} alt="Our Mission" style={{ width: "80%", height: "400px" , marginTop : '30px' , borderRadius : '6px' }} />
           </div>
         </div>
      </div>
    </section>
  );
};

export default AboutSection;











