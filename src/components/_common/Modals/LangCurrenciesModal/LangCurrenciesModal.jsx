import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import classNames from 'classnames';
import { motion, AnimatePresence } from 'framer-motion';

import useScrollLock from '../../../../hooks/useScroll';
import CloseSvg from '../../../svg/CloseSvg';
import LanguageTab from './components/LanguageTab';
import CurrencyTab from './components/CurrencyTab';

export default function LangCurrenciesModal({
  isOpen,
  onClose,
  onSave,
}) {
  const [activeTab, setActiveTab] = useState('language');
  const [selectedLang, setSelectedLang] = useState({
    name: 'English',
    region: 'United States',
    code: 'en'
  });
  const [selectedCurr, setSelectedCurr] = useState('United States dollar');

  const modalRoot = document.getElementById('modal-root');

  useScrollLock(isOpen);

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e) => {
      if (e.key === 'Escape') onClose?.();
    };
    window.addEventListener('keydown', onKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  const handleSave = () => {
    onSave?.({
      language: selectedLang.name,
      region: selectedLang.region,
      languageCode: selectedLang.code,
      currency: selectedCurr
    });
    onClose?.();
  };

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="modal_overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
        >
          <motion.div
            className="language__and__curr__modal"
            initial={{ opacity: 0, y: 80 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 80 }}
            transition={{ duration: 0.1 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="language__and__curr__modal__header">
              <button className="language__and__curr__modal__close" onClick={onClose}>
                <CloseSvg />
              </button>
            </div>

            <div className="language__and__curr__modal__tabs">
              <button
                className={classNames('language__and__curr__modal__tab', {
                  'language__and__curr__modal__tab--active': activeTab === 'language',
                })}
                onClick={() => setActiveTab('language')}
                style={{ position: 'relative' }}
              >
                <p className="text">Language and region</p>
                {activeTab === 'language' && (
                  <motion.span
                    layoutId="modal-tab-indicator"
                    className="modal__tab__indicator"
                    transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                  />
                )}
              </button>

              <button
                className={classNames('language__and__curr__modal__tab', {
                  'language__and__curr__modal__tab--active': activeTab === 'currency',
                })}
                onClick={() => setActiveTab('currency')}
                style={{ position: 'relative' }}
              >
                <p className="text">Currency</p>
                {activeTab === 'currency' && (
                  <motion.span
                    layoutId="modal-tab-indicator"
                    className="modal__tab__indicator"
                    transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                  />
                )}
              </button>
            </div>

            <div className="language__and__curr__modal__body">
              {activeTab === 'language' ? (
                <LanguageTab selectedLang={selectedLang} onSelect={setSelectedLang} />
              ) : (
                <CurrencyTab selectedCurr={selectedCurr} onSelect={setSelectedCurr} />
              )}
            </div>

            <div className="language__and__curr__modal__footer">
              <button className="save_btn" onClick={handleSave}>
                Save
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    modalRoot
  );
}