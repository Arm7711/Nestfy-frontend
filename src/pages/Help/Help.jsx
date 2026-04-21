import React, { useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { motion } from "framer-motion";
import { helpTabs, helpContent } from '../../data/helpData.js';
import AuthModal from '../../components/_common/Modals/AuthModal';

const Help = () => {
  const { lang } = useParams();
  const [activeTab, setActiveTab] = useState('Guest');
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const currentContent = helpContent[activeTab];

  return (
    <div className="help-page">
      <div className="help-container">
        <header className="help-header">
          <h1>Hi, how can we help?</h1>

          <div className="search-bar">
            <input type="text" placeholder="Search how-tos and more" />
            <button aria-label="Search">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="11" cy="11" r="7"></circle>
                <line x1="16.65" y1="16.65" x2="21" y2="21"></line>
              </svg>
            </button>
          </div>

          <nav className="help-tabs">
            {helpTabs.map((tab) => {
              const isActive = activeTab === tab;

              return (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                  className={isActive ? "active" : ""}
                  style={{ position: "relative" }}
                >
                  {tab}

                  {isActive && (
                    <motion.span
                      layoutId="help-tab-indicator"
                      className="help-tab-indicator"
                      transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 30
                      }}
                    />
                  )}
                </button>
              );
            })}
          </nav>
        </header>

        <section className="login-card">
          <div className="login-card__text">
            <h2>We’re here for you</h2>
            <p>Log in to get help with your reservations, account, and more.</p>
          </div>
          <button
            className="primary-btn"
            onClick={() => setIsAuthModalOpen(true)}
          >
            Log in or sign up
          </button>
        </section>

        <section className="section">
          <div className="section-head">
            <h3>Guides for getting started</h3>
            <NavLink to={`/${lang}/help-center/topics`}>Browse all topics</NavLink>
          </div>

          <div className="guides-grid">
            {currentContent.guides.map((guide, index) => (
              <NavLink to={`/${lang}/${guide.link}`} className="guide-card" style={{ animationDelay: 0.1 * index }} key={index}>
                <div
                  className={`guide-card__image ${guide.dark ? 'dark' : ''}`}
                  style={{ backgroundImage: `url(${guide.image})` }}
                >
                  {guide.label && (
                    <span className="guide-card__label">{guide.label}</span>
                  )}
                </div>
                <p>{guide.title}</p>
              </NavLink>
            ))}
          </div>
        </section>

        <section className="section">
          <h3>Top articles</h3>
          <div className="articles-grid">
            {currentContent.articles.map((article, index) => (
              <NavLink to={`/${lang}/${article.link}`} className="article-card" style={{ animationDelay: 0.1 * index }} key={index}>
                <h4>{article.title}</h4>
                <p>{article.desc}</p>
              </NavLink>
            ))}
          </div>
        </section>

        <section className="section">
          <h3>Explore more</h3>
          <div className="explore-grid">
            <div className="explore-cards">
              {currentContent.exploreCards.map((card, index) => (
                <NavLink to={`/${lang}/${card.link}`} className="explore-card" key={index}>
                  <div
                    className="explore-card__image"
                    style={{ backgroundImage: `url(${card.image})` }}
                  >
                    {card.badge && <div className="check-badge">✓</div>}
                  </div>
                  <div className="explore-card__content">
                    <h4>{card.title}</h4>
                    <p>{card.subtitle}</p>
                  </div>
                </NavLink>
              ))}
            </div>

            <div className="contact-card">
              <h4>Need to get in touch?</h4>
              <p>
                We’ll start with some questions and get you to the right place.
              </p>
              <button className="outline-btn">Contact us</button>
              <span>
                You can also <NavLink to="/feedback">give us feedback.</NavLink>
              </span>
            </div>
          </div>
        </section>
      </div>
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </div>
  );
};

export default Help;