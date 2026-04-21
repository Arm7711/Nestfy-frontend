import React, { useEffect, useState, useRef } from 'react';
import { createPortal } from 'react-dom';
import { NavLink, useParams } from 'react-router';
import classNames from 'classnames'
import { useQueryParams } from '../../hooks/useQueryParams'
import Button from '../_common/Button/Button';

import CameraSvg from '../svg/CameraSvg';
import EarthSvg from '../svg/EarthSvg';
import WorkSvg from '../svg/WorkSvg';
import LampSvg from '../svg/LampSvg';
import MessLangSvg from '../svg/MessLangSvg';

import TelegramSvg from '../../assets/images/icons/telegram-svg.svg?react';
import FacebookSvg from '../../assets/images/icons/facebook-svg.svg?react';
import InstagramSvg from '../../assets/images/icons/instagram-svg.svg?react';
import WebsiteSvg from '../../assets/images/icons/website-svg.svg?react';
import LinkedinSvg from '../../assets/images/icons/linkedin-svg.svg?react';

import { userInfoEdit, userInfoEditSocial } from '../../data/editProfileData';
import Footer from '../layout/Footer/Footer';

export default function EditUserProfile() {
    const { lang } = useParams()
    const { get, remove } = useQueryParams();
    const editModeFromUrl = get('editMode');
    const [isEditMode, setIsEditMode] = useState(editModeFromUrl);
    const userData = JSON.parse(localStorage.getItem("userData") || null);

    const triggerRef = useRef(null);
    const [hideBlock, setHideBlock] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            setHideBlock(entry.isIntersecting);
        }, {
            threshold: 0.1
        });

        const el = triggerRef.current;
        if (el) observer.observe(el);

        return () => {
            if (el) observer.unobserve(el);
            observer.disconnect();
        };
    }, []);

    useEffect(() => {
        setIsEditMode(editModeFromUrl);
    }, [editModeFromUrl]);

    return createPortal(
        <div className={classNames('edit__user__profile', { active__mode: isEditMode })}>
            <div className={classNames('edit__user__profile__done__container', { hidden: hideBlock })}>
                <div className='container'>
                    <Button min={true} onClick={() => remove('editMode')}>
                        Done
                    </Button>
                </div>
            </div>

            <div className='profile__main__content'>
                <div className='user__profile__avatar__container'>
                    <div className='avatar'>
                        {userData?.avatar
                            ?
                            <figure className='avatar__figure'>
                                <img src={userData?.avatar} className='user__avatar__image' draggable='false' alt="User profile image" />

                                <label className='edit__image' htmlFor='input__user__avatar'>
                                    <CameraSvg />
                                    <p className='text'>Edit</p>
                                </label>

                                <input type="file" id='input__user__avatar' hidden readOnly />
                            </figure>
                            :
                            <div className='user'>
                                <label className='add__image' htmlFor='input__user__avatar'>
                                    <CameraSvg />
                                    <p className='text'>Add</p>
                                </label>
                                <input type="file" id='input__user__avatar' hidden readOnly />
                                <p className='letter'>{userData?.name[0] || 'U'}</p>
                            </div>
                        }
                    </div>
                </div>

                <div className='user__profile__edit__container'>
                    <div className='user__information'>
                        <h1 className='title'>My profile</h1>

                        <p className='desc'>
                            Hosts and guests can see your profile and it may appear across Airbnb to help us build trust in our community.
                            <NavLink to={`/${lang}/learn-more`} className='link'>Learn more</NavLink>
                        </p>
                    </div>

                    <div className='profile__edits__label'>
                        {userInfoEdit?.map(({ title, labelName }) => (
                            <button className='label'>
                                {
                                    (labelName === 'travel' && <EarthSvg />) ||
                                    (labelName === 'work' && <WorkSvg />) ||
                                    (labelName === 'lamp' && <LampSvg />) ||
                                    (labelName === 'speak' && <MessLangSvg />) ||
                                    (labelName === 'live' && <EarthSvg />)
                                }

                                <p className='label__text'>{title}</p>
                            </button>
                        ))}
                    </div>

                    <div className='user__about__me__container'>
                        <h1 className='title'>About me</h1>

                        <div className='box__about'>
                            <h3 className='subtitle'>Write something fun and punchy.</h3>
                            <p className='intro' role='button'>Add intro</p>
                        </div>
                    </div>

                    <div className='user__social__media__links__container'>
                        <div className='info'>
                            <h1 className='title'>Social Medias Links</h1>
                            <p className='desc'>Select the social networks that will be displayed on your profile.</p>
                        </div>

                        <div className='social__links__container'>
                            {userInfoEditSocial.map(({ title, social }) => (
                                <div className='social__item'>
                                    {
                                        (social === 'telegram' && <TelegramSvg className='icon cls-2' />) ||
                                        (social === 'facebook' && <FacebookSvg className='icon cls-3' />) ||
                                        (social === 'linkedin' && <LinkedinSvg className='icon cls-4' />) ||
                                        (social === 'website' && <WebsiteSvg className='icon cls-5' />) ||
                                        (social === 'instagram' && <InstagramSvg className='icon cls-6' />)
                                    }
                                </div>
                            ))}
                        </div>

                    </div>

                    <div className='done__button__container' ref={triggerRef}>
                        <Button min={true} onClick={() => remove('editMode')}>Done</Button>
                    </div>
                </div>
            </div>

        </div>
        , document.getElementById('modal-root'));
}
