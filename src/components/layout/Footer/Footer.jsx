import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import "../../../assets/styles/layout/_footer.scss";
import {inspirationTabs,inspirationByTab,footerLinkColumns,footerBottom,} from "../../../data/footerData.js";
import { FiGlobe, FiChevronDown } from "react-icons/fi";
import { FaFacebookF, FaInstagram, FaXTwitter } from "react-icons/fa6";
import { HiCurrencyDollar } from "react-icons/hi2";
import { slugify } from "./FooterDetailes.jsx";

const makeHref = (group, label) => `/footer/${slugify(group)}/${slugify(label)}`;

const Footer = () => {
  const [activeTab, setActiveTab] = useState(inspirationTabs[0]);

  const inspirationItems = useMemo(() => {
    return inspirationByTab[activeTab] || [];
  }, [activeTab]);

  return (
    <footer className="footer">
      <div className="footer__inner">
        <section className="footer__inspiration" aria-label="Inspiration">
          <h2 className="footer__title">Inspiration for future getaways</h2>

          <div
            className="footer__tabs"
            role="tablist"
            aria-label="Inspiration tabs"
          >
            {inspirationTabs.map((tab) => {
              const isActive = tab === activeTab;
              return (
                <button
                  key={tab}
                  type="button"
                  className={`footer__tab ${isActive ? "is-active" : ""}`}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </button>
              );
            })}
          </div>

          <div className="footer__divider" />

          <div className="footer__places" role="list">
            {inspirationItems.map((item, idx) => {
              const isAction = Boolean(item.isAction);
              const to = makeHref(activeTab, item.title);

              return (
                <Link
                  key={`${item.title}-${idx}`}
                  className={`footer__place ${isAction ? "is-action" : ""}`}
                  to={to}
                  role="listitem"
                >
                  <div className="footer__placeTitle">
                    {item.title}
                    {isAction && (
                      <FiChevronDown
                        className="footer__chev"
                        aria-hidden="true"
                      />
                    )}
                  </div>

                  {item.subtitle ? (
                    <div className="footer__placeSub">{item.subtitle}</div>
                  ) : null}
                </Link>
              );
            })}
          </div>
        </section>

        <section className="footer__links" aria-label="Footer links">
          <div className="footer__linkGrid">
            {footerLinkColumns.map((col) => (
              <div key={col.heading} className="footer__col">
                <h3 className="footer__colTitle">{col.heading}</h3>
                <ul className="footer__colList">
                  {col.links.map((l) => (
                    <li key={l.label} className="footer__colItem">
                      <Link
                        className="footer__colLink"
                        to={makeHref(col.heading, l.label)}
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <div className="footer__bottom" aria-label="Footer bottom bar">
          <div className="footer__bottomLeft">
            {footerBottom.leftLinks.map((l, i) => (
              <React.Fragment key={l.label}>
                <Link className="footer__bottomLink" to={makeHref("bottom", l.label)}>
                  {l.label}
                </Link>
                
                {i !== footerBottom.leftLinks.length - 1 && (
                  <span className="footer__dot" aria-hidden="true">
                    ·
                  </span>
                )}
              </React.Fragment>
            ))}
          </div>

          <div className="footer__bottomRight">
            <Link className="footer__pill" to={makeHref("locale", footerBottom.locale.label)}>
              <FiGlobe className="footer__icon" aria-hidden="true" />
              {footerBottom.locale.label}
            </Link>

            <Link className="footer__pill" to={makeHref("currency", footerBottom.currency.label)}>
              <HiCurrencyDollar className="footer__currency" aria-hidden="true" />
              {footerBottom.currency.label}
            </Link>

            <div className="footer__social" aria-label="Social links">
              {footerBottom.social.map((s) => {
                let Icon = FaInstagram;
                if (s.label === "Facebook") Icon = FaFacebookF;
                if (s.label === "X") Icon = FaXTwitter;
                if (s.label === "Instagram") Icon = FaInstagram;

                return (
                  <Link
                    key={s.label}
                    className="footer__socialLink"
                    to={makeHref("social", s.label)}
                    aria-label={s.label}
                  >
                    <Icon aria-hidden="true" />
                    <span className="sr-only">{s.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;