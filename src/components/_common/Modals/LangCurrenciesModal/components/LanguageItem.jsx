import classNames from 'classnames';
import { motion } from 'framer-motion';

export default function LanguageItem({ language, isActive, onClick, index, langs = false }) {
    const { name, region, code } = language;
    return (
        <motion.div
            initial={langs ? {} : { opacity: 0, y: 35, scale: 0.98 }}
            animate={langs ? {} : { opacity: 1, y: 0, scale: 1 }}
            transition={{
                duration: 0.2,
                delay: index * 0.029,
                ease: "spring"
            }}
            whileTap={{ scale: 0.97 }}
            className={
                classNames('currency_grid__item', {
                    'currency_grid__item--active': isActive,
                })
            }
            onClick={() => onClick(language)}
        >
            <div className="language_grid__name">{name}</div>
            <div className="language_grid__region">{region}</div>
        </motion.div>
    );
}