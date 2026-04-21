import classNames from 'classnames';
import { motion } from 'framer-motion';

export default function CurrencyItem({ name, code, isActive, onClick, index }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 35, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
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
            onClick={onClick}
        >
            <div className="currency_grid__name">{name}</div>
            <div className="currency_grid__code">{code}</div>
        </motion.div >
    );
}