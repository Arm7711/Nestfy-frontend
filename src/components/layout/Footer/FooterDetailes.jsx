import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import "../../../assets/styles/layout/_footer.scss";

export const slugify = (str = "") => {
  const s = String(str)
    .trim()
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/['"’`]/g, "")
    .replace(/[^a-z0-9а-яё]+/gi, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");

  return encodeURIComponent(s);
};

const makeHref = (group, label) => `/footer/${slugify(group)}/${slugify(label)}`;

const SERVICES = [
  { label: "Catering", img: "https://a0.muscache.com/im/pictures/canvas/Canvas-1745435097487/original/53e2886b-a9fc-483d-9fda-1a2c66f943fa.jpeg?im_w=480" },
  { label: "Chef", img: "https://a0.muscache.com/im/pictures/canvas/Canvas-1745602639670/original/17becbb3-ff07-486a-9edf-3b5380b2073d.jpeg?im_w=480"},
  { label: "Hair styling", img: "https://a0.muscache.com/im/pictures/canvas/Canvas-1745435218016/original/e5e3039f-3d1d-4dd8-be35-b963256f7e3b.jpeg?im_w=480" },
  { label: "Makeup", img: "https://a0.muscache.com/im/pictures/canvas/Canvas-1745435252376/original/d7a62b38-4c80-4c91-b06e-2be7189d13b9.jpeg?im_w=480" },
  { label: "Massage", img: "https://a0.muscache.com/im/pictures/canvas/Canvas-1745435276618/original/3c38f63a-8d5a-4265-9e32-58f103cbea61.jpeg?im_w=480" },
  { label: "Nails", img:"https://a0.muscache.com/im/pictures/canvas/Canvas-1745435312596/original/dc365357-da21-4d83-b24f-5233835a8275.jpeg?im_w=480" },
  { label: "Personal training", img: "https://a0.muscache.com/im/pictures/canvas/Canvas-1745435335977/original/92f00797-2318-45c3-a425-829a8bafa48f.jpeg?im_w=480" },
  { label: "Photography", img: "https://a0.muscache.com/im/pictures/canvas/Canvas-1745435391001/original/927b4c14-55db-41d5-9093-adf6f419aba0.jpeg?im_w=480"},
  { label: "Prepared meals", img:"https://a0.muscache.com/im/pictures/canvas/Canvas-1745435412233/original/a11425d2-5a1a-4da2-ac92-1bd246300cad.jpeg?im_w=480" },
  { label: "Spa treatments", img:"https://a0.muscache.com/im/pictures/canvas/Canvas-1745435442988/original/025a928a-4e57-4000-90a9-6142f101e85c.jpeg?im_w=480" },
];

const FAQ = [
  {
    title: "Top questions",
    items: [
      `Is my service right for Nestfy?
Nestfy Services is a marketplace for high-quality services that make a guest’s stay even better. Services include catering, chefs, hair styling, makeup, massage, nails, personal training, photography, prepared meals, and spa treatments. Learn more about Nestfy Services standards.`,
`How do I apply?
It’s easy to get started. First, share a little about yourself and the service you offer. Then, add photos, set your pricing, and submit your listing for review. We may get back to you with suggested changes, requests to upload licenses, or to ask for proof of insurance. Once your listing is approved, you can publish it and start offering your service to customers immediately. Get started.`,
`What are Nestfy’s fees?
It’s free to create and submit a listing for review. Nestfy automatically deducts a 15% service fee from the payout of every service booked.`
    ],
  },
  {
    title: "Hosting basics",
    items: [`Do I need to have an existing business?
It’s usually not necessary to be an established business. Depending on local regulations and the type of service you provide, we may ask for a business license. Learn more about Services quality standards.`,
`How will guests discover my service?
Services have a dedicated tab on Nestfy, and can appear at multiple phases of a guest’s trip—from search results and planning recommendations to emails and notifications.
`,
`How quickly do I get paid?
Depending on the service you offer, what payout method you set up in your Nestfy profile, and your financial institution, you’ll typically get paid the day after providing a service.
`],
  },
  {
    title: "Application process",
    items: [`What does the review process look like?
After you submit your listing, you’ll receive an email confirmation with any next steps. Every service is reviewed by a real person on our team to ensure it meets our standards.`,
`How are services evaluated?
Services on Nestfy are vetted for quality, taking into account things like years of experience, education, certifications, awards, strong portfolios, creative offerings, and positive past feedback from guests.,
`,
`How long does the review process take?
The review process typically takes a few weeks. However, in high-demand areas, it may take longer and you could be placed on a waitlist.`],
  },
];

const Accordion = ({ groups }) => {
  const [openKey, setOpenKey] = useState(null);

  return (
    <div className="asFaq">
      {groups.map((g) => {
        const isOpen = openKey === g.title;
        return (
          <div key={g.title} className="asFaq__group">
            <button
              type="button"
              className="asFaq__head"
              onClick={() => setOpenKey(isOpen ? null : g.title)}
              aria-expanded={isOpen}
            >
              <p className="asFaq__title">{g.title}</p>
              <p className="asFaq__chev" aria-hidden="true">
                {isOpen ? "–" : "+"}
              </p>
            </button>

            {isOpen && (
              <p className="asFaq__list">
                {g.items.map((it) => (
                  <p key={it} className="asFaq__item">
                    <Link className="asFaq__link" to={makeHref("faq", it)}>
                      {it}
                    </Link>
                  </p>
                ))}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
};

const FooterDetailes = () => {
  const stats = useMemo(
    () => [
      { value: "390 million guests", sub: "NestFy in 2024" },
      { value: "$81 billion", sub: "Spent on NestFy in 2024" },
    ],
    []
  );

  return (
    <main className="asLanding" aria-label="NestFy Services landing">
      <section className="asSection asHero">
        <div className="asHero__inner">
          <div className="asHero__copy">
            <h1 className="asH1">Give your business a new home</h1>
            <p className="asLead">
              Now your service can reach millions of people on NestFy.
            </p>

            <div className="asHero__cta">
              <Link className="asBtn asBtn--primary" to={makeHref("cta", "get started")}>
                Get started
              </Link>
              <Link className="asBtn asBtn--ghost" to={makeHref("cta", "learn more")}>
                Learn more
              </Link>
            </div>
          </div>

          <div className="asHero__media" aria-label="App preview">
  <div className="asPhoneMedia">
    <video
      className="asPhoneVideo"
      aria-label="Phone app preview animation"
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      poster="https://a0.muscache.com/im/mux/Y6COYfUMLQ5WycjA6M7aqaCvv4CWQ6UceNO5d9qZTMg/thumbnail.jpg?time=0.0&im_w=1200"
    >
      <source
        src="https://stream.media.muscache.com/mp4/Y6COYfUMLQ5WycjA6M7aqaCvv4CWQ6UceNO5d9qZTMg.mp4?v_res=1440p"
        type="video/mp4"
      />
    </video>
  </div>
</div> 
        </div>
      </section>

      <section className="asSection asServices">
        <div className="asContainer">
          <h2 className="asH2">Offer what you do best <br /> with NestFy Services</h2>
          <p className="asText">
            NestFy is for more than homes. <br /> Now it’s for businesses like yours.
          </p>

          <div className="asServices__grid" role="list">
            {SERVICES.map((s) => (
              <Link
                key={s.label}
                className="asServiceCard"
                to={makeHref("services", s.label)}
                role="listitem"
              >
                <img src={s.img} className="asServiceCard__icon" aria-hidden="true"
                />
                <div className="asServiceCard__label">{s.label}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <section className="asSection asWelcome">
        <div className="asContainer asWelcome__inner">
          <h2 className="asH2">Welcome a world <br /> of new customers</h2>
          <p className="asText">
            Reach millions of people traveling and living near you on NestFy.
          </p>

          <div className="asFaces" aria-label="Customer avatars">

            <img src="https://a0.muscache.com/im/pictures/canvas/Canvas-1745865232412/original/83c8a738-fc17-4a1c-8b05-cc4d40766912.jpeg?im_w=320" className="asFace" />
            <img src="https://a0.muscache.com/im/pictures/canvas/Canvas-1745865281942/original/9750528b-5630-4ef3-ba59-4dd229f8c675.jpeg?im_w=320&im_q=medq" className="asFace" />
            <img src="https://a0.muscache.com/im/pictures/canvas/Canvas-1745865314510/original/193f0ed8-2156-4238-94a9-af766b60a9f6.jpeg?im_w=2560&im_q=medq" className="asFace asFace--big" />
<img src="https://a0.muscache.com/im/pictures/canvas/Canvas-1745865341318/original/f666738c-7d59-4b81-9369-f06e62f4120e.jpeg?im_w=320&im_q=medq" className="asFace" />
<img src="https://a0.muscache.com/im/pictures/canvas/Canvas-1745865370833/original/6aab0543-5cfe-43c0-a811-c088bbdf9315.jpeg?im_w=320&im_q=medq" className="asFace" />
          </div>

          <div className="asStats" role="list">
            {stats.map((st) => (
              <div key={st.value} className="asStat" role="listitem">
                <div className="asStat__value">{st.value}</div>
                <div className="asStat__sub">{st.sub}</div>
              </div>
            ))}
          </div>

          <p className="asNote">
            390M includes new and returning guests. <br />
$81B in gross bookings for stays and experiences.
          </p>
        </div>
      </section>


      <section className="asSection asShowUp">
        <div className="asContainer asSplit">
          <div className="asSplit__copy">
            <h2 className="asH2">Show up beautifully. Get booked instantly.</h2>
            <p className="asText">
              Create a standout listing and fill your calendar with instant booking.
            </p>
            <Link className="asBtn asBtn--primary" to={makeHref("product", "create listing")}>
              Create your listing
            </Link>
          </div>

          <div className="asSplit__media" aria-label="Listing preview">
  <video
    className="asPhoneVideo"
    src="https://stream.media.muscache.com/mp4/1qVr6Fl5SSI43rR013KQHQJRXvnvbVsH3qEv5Tnjk2T4.mp4?v_res=480p"
    autoPlay
    loop
    muted
  />
</div>
        </div>
      </section>

  
      <section className="asSection asReach">
        <div className="asContainer">
          <h2 className="asH2">Reach more people <br /> in more ways</h2>
          <p className="asText">
            We put services like yours in front of guests who are planning and traveling.
          </p>

          <div className="asTwoUp">
            <div className="asMiniCard">
            
              <video
  src="https://stream.media.muscache.com/mp4/OpY00Y00h00DDD7i4UKH1NgMo01qU3qaXkCsAvn1dNC5BZY.mp4?v_res=480p"
  className="asMiniCard__imgMock"
  autoPlay
  muted
  loop
  playsInline
/>
              <p className="asMiniCard__caption">
                Get discovered when guests plan your service on their trip.
              </p>
            </div>

            <div className="asMiniCard">
             
              <video
  src="https://stream.media.muscache.com/mp4/huMcdYjdI9ZfS5YsalQitzESSvzBgbveKgAusC00ivzA.mp4?v_res=480p"
  className="asMiniCard__imgMock"
  autoPlay
  muted
  loop
  playsInline
/>
              <p className="asMiniCard__caption">
                Get suggested as guests travel and look for nearby experiences.
              </p>
            </div>
          </div>
        </div>
      </section>

     
      <section className="asSection asTools">
        <div className="asContainer">
          <h2 className="asH2">World-class tools for your local business</h2>
          <p className="asText">
            Your bookings, calendar, messages, and payments — all in the NestFy app.
          </p>

          <div className="asTools__grid">
            {[
              { title: "Manage reservations", desc: "Stay on top of new and upcoming bookings.", img: "https://a0.muscache.com/im/pictures/canvas/Canvas-1746032047253/original/d3e1e715-dba7-4204-a97c-0411ae057162.jpeg?im_w=1920" },
              { title: "Simplify scheduling", desc: "Set availability, cancellations, and lead time.", img: "https://a0.muscache.com/im/pictures/canvas/Canvas-1746045379652/original/5fd263f2-0c34-4376-8d17-15e79c670ea2.jpeg?im_w=1920" },
              { title: "Message with guests", desc: "Send updates, details, and reminders.", img: "https://a0.muscache.com/im/pictures/canvas/Canvas-1746033327601/original/574fe408-18f4-452f-8669-06810d1af17f.jpeg?im_w=1920" },
              { title: "Get paid quickly", desc: "Receive payouts securely and on time.", img: "https://a0.muscache.com/im/pictures/canvas/Canvas-1746031822617/original/68f4d76c-b245-42bf-8632-8396b3a52ac1.jpeg?im_w=1920" },
            ].map((t) => (
              <div key={t.title} className="asToolCard">
             
                <img src={t.img} className="asMiniCard__imgMock" />
                <div className="asToolCard__title">{t.title}</div>
                <div className="asToolCard__desc">{t.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="asSection asQuestions">
        <div className="asContainer">
          <h2 className="asH2">Your questions, answered</h2>
          <Accordion groups={FAQ} />
        </div>
      </section>
    </main>
  );
};

export default FooterDetailes;