import React, { useEffect, useRef, useState } from "react";
import "./homepage.scss";
import Fade from "react-reveal/Fade";

//import img
import AboutImg from "../../../assets/images/home/about.png";
import HomeImg from "../../../assets/images/home/data.gif";
import PopularImg2 from "../../../assets/images/home/data-mining.gif";
import ImexpharmImg from "../../../assets/images/home/imexpharm.png";
import IndustryImg from "../../../assets/images/home/industry-sectors.png";
import PopularImg3 from "../../../assets/images/home/infographic.gif";
import KidsplazaImg from "../../../assets/images/home/kidsplaza.png";
import PopularImg1 from "../../../assets/images/home/stats.gif";
import Footer from "../../components/footer/Footer";
import TopBar from "../../components/topBar/TopBar";

const allSection = ["home", "about", "services", "industry", "project"];

export default function Home() {
  const ref = useRef(null);

  const [section, setSection] = useState([...allSection.slice(0, 5)]);

  return (
    <>
      {/* <TopBar /> */}
      <main className="main">
        <div className="box-nav">
          <ul ref={ref}>
            {section.map((section) => (
              <li key={section}>
                <a href={"#" + section}>
                  <span>{section}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* HOME SECTION  */}
        <section className="home section" id="home">
          <div className="home__container container grid">
            <Fade top cascade>
              <img src={HomeImg} alt="home image" className="home__img" />
            </Fade>

            <Fade bottom cascade>
              <div className="home__data">
                <h1 className="home__title">
                  Data mining with
                  <div>minimal resources &</div>
                  <div>maximum efficiency</div>
                </h1>
                <p className="home__description">
                  Giúp doanh nghiệp và tổ chức khai thác sức mạnh của dữ liệu để
                  đưa ra quyết định thông minh.
                </p>

                <a href="#contact" className="button">
                  Contact Now <i className="ri-arrow-right-line"></i>
                </a>
              </div>
            </Fade>
          </div>
        </section>

        {/* ABOUT US SECTION  */}
        <section className="about section" id="about">
          <div className="about__container container grid">
            <Fade right cascade>
              <div className="about__data">
                <span className="section__subtitle">About Us</span>
                <h2 className="section__title about__tile">
                  <div>Our goals & vision</div>
                </h2>
                <p className="about__description">
                  Thành lập năm 2022 và khởi sướng bởi các chuyên gia trong lĩnh
                  vực CNTT và có nhiều năm kinh nghiệm làm tư vấn phân tích dữ
                  liệu tại các doanh nghiệp lớn ở Việt Nam. Sứ mệnh của chúng
                  tôi là:
                </p>
                <ul className="about__list">
                  <li>
                    Tổ chức khai thác sức mạnh của dữ liệu để đưa ra quyết định
                    thông minh
                  </li>
                  <li>
                    Cung cấp các giải pháp phân tích dữ liệu để tối ưu hóa hiệu
                    suất, dự đoán xu hướng, và tối ưu hóa chiến lược kinh doanh
                  </li>
                  <li>
                    Đảm nhiệm chức năng và nhiệm vụ về phân tích dữ liệu như
                    người “trong nhà” của doanh nghiệp
                  </li>
                </ul>
              </div>
            </Fade>

            <Fade left cascade>
              <img src={AboutImg} alt="about image" className="about__img" />
            </Fade>
          </div>
        </section>
        {/* POPULAR SECTION  */}
        <section className="popular section" id="services">
          <span className="section__subtitle">SERVICES</span>
          <h2 className="section__title">Explore Our Data Services</h2>

          <Fade top cascade>
            <div className="popular__container contianer grid">
              <article className="popular__card">
                <img src={PopularImg1} alt="" className="popular__img" />
                <h3 className="popular__name">Data analytics</h3>

                <span className="popular__price">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.{" "}
                </span>
              </article>

              <article className="popular__card">
                <img src={PopularImg2} alt="" className="popular__img" />

                <h3 className="popular__name">Data mining</h3>

                <span className="popular__price">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.{" "}
                </span>
              </article>

              <article className="popular__card">
                <img src={PopularImg3} alt="" className="popular__img" />

                <h3 className="popular__name">Data storytelling</h3>

                <span className="popular__price">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.{" "}
                </span>
              </article>
            </div>
          </Fade>
        </section>
        {/* INDUSTRY SECTION  */}
        <section className="industry section" id="industry">
          <div className="industry__container ">
            <div className="industry__content grid">
              <Fade bottom cascade>
                <div className="industry__data">
                  <span className="section__subtitle">Industry Sectors</span>
                  <h2 className="section__title">Our Industry Sectors</h2>

                  <p className="industry__description">
                    Với kinh nghiệm từ các chuyên gia và nhân sự của mình, chúng
                    tôi tự tin về khả năng tư vấn và làm việc chuyên sâu tới các
                    dữ liệu nghiệp vụ của những lĩnh vực kinh doanh có tốc độ
                    biến đổi nhanh theo thị trường.
                  </p>

                  <div className="industry__steps grid">
                    <div className="industry__block">
                      <div className="industry__detail">
                        <h3>Pharma</h3>
                        <p>
                          Hệ thống giải pháp và phân tích dữ liệu đặc thù cho
                          ngành dược phẩm và phân phối thuốc
                        </p>
                      </div>
                    </div>
                    <div className="industry__block">
                      <div className="industry__detail">
                        <h3>Retail</h3>
                        <p>
                          Mô hình dữ liệu sẵn có và hệ thống báo cáo trực quan
                          hóa cho các doanh nghiệp bán lẻ.
                        </p>
                      </div>
                    </div>
                    <div className="industry__block">
                      <div className="industry__detail">
                        <h3>Manufacturing</h3>
                        <p>
                          Giải pháp phân tích dữ liệu về tính hiệu quả cho các
                          doanh nghiệp sản xuất.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Fade>
              <img
                src={IndustryImg}
                alt="industry image"
                className="industry__img"
              />
            </div>
          </div>
        </section>

        {/* CUSTOMERs SECTION  */}
        <section className="customer section" id="project">
          <div className="customer__container">
            <div className="customer__content grid">
              <div className="customer__data">
                <span className="span section__subtitle">Project</span>
                <h2 className="section__title">Our customers</h2>

                <div className="customer__steps grid">
                  <Fade right cascade>
                    <div className="customer__block customer__block--1">
                      <img
                        src={ImexpharmImg}
                        className="customer__avatar"
                        alt="customer image"
                      />
                      <div className="customer__detail">
                        <h3>
                          Một trong những dự án đầu tiên của DataMind với kỳ
                          vọng từ ban lãnh đạo và các nhà đầu tư SK, DataMind đã
                          từng bước triển khai đáp ứng yêu cầu khắt khe của dự
                          án.
                        </h3>
                        <span>
                          Imexpharm | Công Ty Cổ Phần Dược Phẩm Imexpharm
                        </span>
                      </div>
                    </div>
                  </Fade>
                  <Fade left cascade>
                    <div className="customer__block customer__block--2">
                      <img
                        src={KidsplazaImg}
                        className="customer__avatar"
                        alt="customer image"
                      />
                      <div className="customer__detail">
                        <h3>
                          Dự án cho doanh nghiệp bán lẻ luôn bao hàm những khó
                          khăn nhưng không phải là trở ngại với DataMind
                        </h3>
                        <span>
                          Kids Plaza | Hệ thống cửa hàng Mẹ Bầu và Em Bé
                        </span>
                      </div>
                    </div>
                  </Fade>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* CONTACT SECTION  */}
        <section className="contact section" id="contact">
          <div className="contact__container">
            <div className="contact__content grid">
              <Fade bottom cascade>
                <div className="contact__data">
                  <div className="contact__block">
                    <div className="contact__detail align-items-end">
                      <label htmlFor="phone">Phone</label>
                      <a href="tel:+" id="phone">
                        +966 201 188
                      </a>
                    </div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="48"
                      height="48"
                      viewBox="0 0 48 48"
                      fill="none"
                    >
                      <circle cx="24" cy="24" r="24" fill="#0189D0" />
                      <path
                        d="M23.9999 37C23.5355 37 23.1063 36.7523 22.8741 36.3501C22.6419 35.948 22.6419 35.4522 22.8741 35.05C23.1063 34.6478 23.5355 34.4001 23.9999 34.4001C25.7238 34.4001 27.3771 33.7153 28.5961 32.4963C29.8151 31.2773 30.5 29.6239 30.5 27.9001V20.1001C30.5 17.7779 29.261 15.6321 27.2498 14.4707C25.2389 13.3096 22.7609 13.3096 20.7502 14.4707C18.739 15.6318 17.5001 17.7776 17.5001 20.1001V24.0001C17.5001 24.4645 17.2524 24.8937 16.8502 25.1259C16.448 25.3581 15.9523 25.3581 15.5501 25.1259C15.1479 24.8937 14.9002 24.4645 14.9002 24.0001V20.1001C14.9002 16.849 16.6345 13.845 19.4501 12.2193C22.2656 10.5936 25.7346 10.5936 28.5504 12.2193C31.3659 13.8448 33.1003 16.849 33.1003 20.1001V27.9001C33.1003 30.3136 32.1416 32.6282 30.4349 34.3345C28.7284 36.0412 26.4139 36.9999 24.0005 36.9999L23.9999 37Z"
                        fill="white"
                      />
                      <path
                        d="M33.0997 29.2H31.7998C31.4551 29.2 31.1243 29.0631 30.8805 28.8194C30.6368 28.5756 30.4999 28.2448 30.4999 27.9001V20.1001C30.4999 19.7554 30.6368 19.4246 30.8805 19.1808C31.1243 18.9371 31.455 18.8002 31.7998 18.8002H33.0997C34.1341 18.8002 35.1261 19.2111 35.8576 19.9423C36.5888 20.6738 36.9997 21.6658 36.9997 22.7002V25.3002V25.3C36.9997 26.3344 36.5888 27.3264 35.8576 28.0579C35.1261 28.7891 34.1341 29.2 33.0997 29.2V29.2ZM33.0997 21.4V26.6002C33.4447 26.6002 33.7753 26.4631 34.019 26.2193C34.2628 25.9756 34.3999 25.645 34.3999 25.3V22.7002C34.3999 22.3552 34.2628 22.0246 34.019 21.7809C33.7753 21.5371 33.4447 21.4 33.0997 21.4V21.4Z"
                        fill="white"
                      />
                      <path
                        d="M16.1999 29.2H14.9C13.8656 29.2 12.8736 28.7891 12.1421 28.0579C11.4109 27.3264 11 26.3344 11 25.3V22.7002C11 21.6658 11.4109 20.6738 12.1421 19.9423C12.8736 19.2111 13.8656 18.8002 14.9 18.8002H16.1999C16.5447 18.8002 16.8755 18.9371 17.1192 19.1808C17.363 19.4246 17.4998 19.7553 17.4998 20.1001V27.9001C17.4998 28.2448 17.363 28.5756 17.1192 28.8194C16.8755 29.0631 16.5447 29.2 16.1999 29.2ZM14.9 21.4C14.555 21.4 14.2245 21.5371 13.9807 21.7809C13.737 22.0246 13.5999 22.3552 13.5999 22.7002V25.3002V25.3C13.5999 25.645 13.737 25.9756 13.9807 26.2193C14.2245 26.4631 14.5551 26.6002 14.9 26.6002V21.4Z"
                        fill="white"
                      />
                    </svg>
                  </div>
                  <hr />
                  <div className="contact__block">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="48"
                      height="48"
                      viewBox="0 0 48 48"
                      fill="none"
                    >
                      <path
                        d="M24 0C17.6347 0 11.5304 2.52855 7.02955 7.02955C2.52855 11.5302 0 17.6349 0 24C0 30.3651 2.52855 36.4696 7.02955 40.9704C11.5302 45.4714 17.6349 48 24 48C30.3651 48 36.4696 45.4714 40.9704 40.9704C45.4714 36.4698 48 30.3651 48 24C48 17.6349 45.4714 11.5304 40.9704 7.02955C36.4698 2.52855 30.3651 0 24 0ZM12.0532 16.3679C12.142 15.9417 12.3348 15.5442 12.6147 15.2111C12.9311 14.8137 13.4126 14.584 13.9201 14.587H18.1536H33.7681C34.2864 14.5686 34.794 14.7383 35.1971 15.0648C35.5999 15.3912 35.8718 15.8523 35.9615 16.3629V16.4205C36.0576 17.213 35.8574 18.0129 35.4 18.6671C34.8934 19.4279 34.2409 20.0804 33.4802 20.587C31.2576 22.0799 29.0401 23.6301 26.837 25.1807C26.2257 25.6555 25.5661 26.064 24.869 26.3998C24.3068 26.6683 23.6509 26.6576 23.0978 26.371C22.4887 26.0489 21.8988 25.6917 21.3313 25.3006C19.4433 24.0206 17.565 22.7165 15.6963 21.3886C14.8304 20.8559 14.0256 20.2297 13.2963 19.5216C12.7623 18.9976 12.3609 18.3545 12.1251 17.6447C12.0003 17.2308 11.9758 16.7932 12.0532 16.368L12.0532 16.3679ZM33.7971 33.4369H17.0263H14.18C13.5981 33.4329 13.0417 33.1982 12.6328 32.784C12.2243 32.3702 11.997 31.8107 12.0007 31.2287V23.9615V20.6016C12.9847 21.6911 14.2038 22.3343 15.3174 23.1168C17.2134 24.4608 19.1189 25.7857 21.0196 27.1249C21.6086 27.5381 22.2558 27.8615 22.9398 28.0848C23.6382 28.3021 24.3879 28.2921 25.0807 28.056C25.8203 27.8096 26.5167 27.4484 27.1445 26.9857C29.6118 25.2577 32.0981 23.5487 34.5651 21.8161C35.0452 21.4752 35.4868 21.0768 35.9667 20.6881V22.2048C35.9667 25.2145 35.9426 28.2239 35.9667 31.2287H35.967C35.9586 31.8053 35.7286 32.356 35.3245 32.7672C34.9204 33.1784 34.3736 33.4181 33.7974 33.4368L33.7971 33.4369Z"
                        fill="#0189D0"
                      />
                    </svg>
                    <div className="contact__detail">
                      <a href="mailto:">anh@datamind.vn</a>
                      <a href="mailto:">son@datamind.vn</a>
                    </div>
                  </div>
                </div>
              </Fade>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      {/* SCROLL UP */}
      <a href="#" className="scrollup" id="scroll-up">
        <i className="ri-arrow-up-line"></i>
      </a>
    </>
  );
}
