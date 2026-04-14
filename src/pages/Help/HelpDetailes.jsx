import React from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { helpContent } from '../../data/helpData';
import '../../assets/styles/pages/_help.scss';
import BackArrowSvg from '../../components/svg/BackArrowSvg';

const slugify = (value) =>
  value
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');

const HelpDetails = () => {
  const { tabSlug, section, itemSlug, lang } = useParams();

  const matchedTab = Object.keys(helpContent).find(
    (tab) => slugify(tab) === tabSlug
  );

  if (!matchedTab) {
    return <div className="help-details__status">Tab not found</div>;
  }

  const tabContent = helpContent[matchedTab];
  const allowedSections = ['guides', 'articles', 'explore'];

  if (!allowedSections.includes(section)) {
    return <div className="help-details__status">Section not found</div>;
  }

  const sectionKey = section === 'explore' ? 'exploreCards' : section;
  const items = tabContent[sectionKey] || [];
  const item = items.find((entry) => slugify(entry.title) === itemSlug);

  if (!item) {
    return <div className="help-details__status">Article not found</div>;
  }

  return (
    <div className="help-details">
      <div className="help-details__container">
        <div className="help-details__main">
          <NavLink to={`/${lang}/help-center`} className="help-details__back">
            <BackArrowSvg />
            Back to Help
          </NavLink>

          <article className="help-details__card">
            {item.image && (
              <div className="help-details__image-wrapper">
                <img
                  src={item.image}
                  alt={item.title}
                  className="help-details__image"
                />
              </div>
            )}

            <div className="help-details__content">
              <div className="help-details__meta">
                <span className="help-details__badge">{matchedTab}</span>
                <span className="help-details__badge help-details__badge--light">
                  {sectionKey}
                </span>
              </div>

              <h1 className="help-details__title">{item.title}</h1>

              {item.subtitle && (
                <p className="help-details__subtitle">{item.subtitle}</p>
              )}

              <div className="help-details__text">
                {item.desc && <p>{item.desc}</p>}
                {item.content && <p>{item.content}</p>}
              </div>
            </div>
          </article>
        </div>

        <aside className="help-details__sidebar">
          <div className="help-details__support-card">
            <p className="help-details__support-text">
              Get help with bookings, your account, and more.
            </p>
            <button className="help-details__support-button">
              Login or register
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default HelpDetails;