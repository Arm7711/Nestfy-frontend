import React from 'react';
import { motion } from 'framer-motion';

export default function LocationsBlock({ item,onClick }) {
    return (
        <motion.div
            className='locations__item'
            initial={{ opacity: 0, y: 35, scale: 0.6 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.2, ease: 'linear' }}
            viewport={{ once: false, margin: '-20px' }}
            onClick={onClick}
        >
            <figure className='item__figure'>
                <img
                    className='item__logo'
                    src={item?.image || ''}
                    alt="Location Logo"
                />
            </figure>

            <div className='item__info'>
                <h1 className='item__info__title'>
                    {item?.title || 'Undefined'}
                </h1>
                <p className='item__info__description'>
                    {item?.description || 'Undefined'}
                </p>
            </div>
        </motion.div>
    );
}