import React, { useEffect, useState, useRef } from 'react';
import { createPortal } from 'react-dom';
import { NavLink, useParams } from 'react-router';
import classNames from 'classnames';
import { AnimatePresence } from 'framer-motion';
import { useQueryParams } from '../../hooks/useQueryParams';
import Button from '../_common/Button/Button';
import Api from '../../api/Api';

import CameraSvg from '../svg/CameraSvg';
import EarthSvg from '../svg/EarthSvg';
import WorkSvg from '../svg/WorkSvg';
import LampSvg from '../svg/LampSvg';
import MessLangSvg from '../svg/MessLangSvg';
import ChevronRightSvg from '../svg/ChevronRightSvg';

import TelegramSvg from '../../assets/images/icons/telegram-svg.svg?react';
import FacebookSvg from '../../assets/images/icons/facebook-svg.svg?react';
import InstagramSvg from '../../assets/images/icons/instagram-svg.svg?react';
import WebsiteSvg from '../../assets/images/icons/website-svg.svg?react';
import LinkedinSvg from '../../assets/images/icons/linkedin-svg.svg?react';

import { userInfoEdit, userInfoEditSocial } from '../../data/editProfileData';
import CommonModal from '../_common/Modals/CommonModal/CommonModal';
import TextareaCounter from '../_common/TextareaCounter/TextareaCounter';
import LoadingDot from '../_common/Loaders/LoadingDot';
import ImageSkeleton from '../_common/Skeletions/ImageSkeletion';

// ─── Photo Upload Modal ────────────────────────────────────────────────────────
import PhotoUploadModal from './components/PhotoUploadModal';

const LABEL_CONFIG = {
    travel: { field: 'travel', maxLength: 40, title: 'Where have you always wanted to travel?', desc: "Whether it's on your bucket list or your shortlist, tell us a place you can't wait to visit.", placeholder: "Where I've always wanted to go:" },
    work: { field: 'work', maxLength: 60, title: 'What do you do for work?', desc: 'Tell guests and hosts a little about your professional life.', placeholder: 'My work:' },
    lamp: { field: 'passion', maxLength: 60, title: "What's your claim to fame?", desc: 'Share a fun or quirky fact that defines you.', placeholder: 'I spend too much time on:' },
    speak: { field: 'languages', maxLength: 60, title: 'What languages do you speak?', desc: 'Let people know which languages you can communicate in.', placeholder: 'Languages I speak:' },
    live: { field: 'city', maxLength: 40, title: 'Where do you live?', desc: 'Tell the community where you call home.', placeholder: 'Where I live:' },
};

export default function EditUserProfile() {
    const { lang } = useParams();
    const { get, remove } = useQueryParams();
    const editModeFromUrl = get('editMode');

    const [isEditMode, setIsEditMode] = useState(editModeFromUrl);
    const [userData, setUserData] = useState(JSON.parse(localStorage.getItem('userData') || null));

    const [isOpenBioModal, setIsOpenBioModal] = useState(false);
    const [bioValue, setBioValue] = useState(userData?.bio || '');
    const [bioError, setBioError] = useState('');

    const [activeLabelName, setActiveLabelName] = useState(null);
    const [labelInputValue, setLabelInputValue] = useState('');
    const [labelInputError, setLabelInputError] = useState('');

    const [isLoading, setIsLoading] = useState(false);
    const [avatarLoading, setAvatarLoading] = useState(false);

    // ── Photo upload modal state ───────────────────────────────────────────────
    const [photoModalOpen, setPhotoModalOpen] = useState(false);
    const [pendingImageSrc, setPendingImageSrc] = useState(null);  // base64 превью
    const [pendingFile, setPendingFile] = useState(null);   // оригинальный File объект
    // ──────────────────────────────────────────────────────────────────────────

    const triggerRef = useRef(null);
    const fileInputRef = useRef(null);
    const [hideBlock, setHideBlock] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            const isBelowViewport = !entry.isIntersecting && entry.boundingClientRect.top > 0;
            setHideBlock(!isBelowViewport);
        }, { threshold: 0 });

        const el = triggerRef.current;
        if (el) observer.observe(el);
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        setIsEditMode(editModeFromUrl);
    }, [editModeFromUrl]);


    const handleAvatarChange = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = () => {
            setPendingImageSrc(reader.result);  
            setPendingFile(file);         
            setPhotoModalOpen(true); 
        };
        reader.readAsDataURL(file);

        e.target.value = ''; 
    };


    const handleConfirmPhoto = async (croppedFile) => {
        const fileToUpload = croppedFile || pendingFile;
        if (!fileToUpload) return;

        setPhotoModalOpen(false);
        setAvatarLoading(true);

        try {
            const res = await Api.updateAvatar(fileToUpload);
            const avatarUrl = res.data?.avatar ?? res.avatar;

            const updated = { ...userData, avatar: avatarUrl };
            localStorage.setItem('userData', JSON.stringify(updated));
            setUserData(updated);
        } catch (err) {
            console.error('Avatar upload failed:', err);
        } finally {
            setAvatarLoading(false);
            setPendingImageSrc(null);
            setPendingFile(null);
        }
    };

    const handleClosePhotoModal = () => {
        setPhotoModalOpen(false);
        setPendingImageSrc(null);
        setPendingFile(null);
    };

    const handleSaveBio = async () => {
        if (!bioValue.trim()) { setBioError('Bio cannot be empty'); return; }
        if (bioValue.length > 500) { setBioError('Bio cannot exceed 500 characters'); return; }

        setIsLoading(true);
        setBioError('');
        try {
            const cleanBio = bioValue.trim().replace(/<[^>]*>/g, '');
            await Api.editUserSettings({ bio: cleanBio });
            const updated = { ...userData, bio: cleanBio };
            localStorage.setItem('userData', JSON.stringify(updated));
            setUserData(updated);
            setIsOpenBioModal(false);
        } catch {
            setBioError('Failed to save bio. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const displayBio = () => (
        <div className='bio__block'>
            {userData?.bio && <p className='bio__text'>{userData.bio}</p>}
            <Button
                variants='secondary'
                min={true}
                onClick={() => {
                    setBioValue(userData?.bio || '');
                    setBioError('');
                    setIsOpenBioModal(true);
                }}
            >
                {userData?.bio ? 'Edit intro' : 'Add intro'}
            </Button>
        </div>
    );

    const getLabelValue = (labelName) => {
        const cfg = LABEL_CONFIG[labelName];
        return cfg ? (userData?.[cfg.field] || '') : '';
    };

    const openLabelModal = (labelName) => {
        setActiveLabelName(labelName);
        setLabelInputValue(getLabelValue(labelName));
        setLabelInputError('');
    };

    const closeLabelModal = () => {
        setActiveLabelName(null);
        setLabelInputValue('');
        setLabelInputError('');
    };

    const handleSaveLabel = async () => {
        const cfg = LABEL_CONFIG[activeLabelName];
        if (!cfg) return;
        const trimmed = labelInputValue.trim();
        if (!trimmed) { setLabelInputError('Field cannot be empty'); return; }
        if (trimmed.length > cfg.maxLength) { setLabelInputError(`Max ${cfg.maxLength} characters`); return; }

        setIsLoading(true);
        setLabelInputError('');
        try {
            await Api.editUserSettings({ [cfg.field]: trimmed });
            const updated = { ...userData, [cfg.field]: trimmed };
            localStorage.setItem('userData', JSON.stringify(updated));
            setUserData(updated);
            closeLabelModal();
        } catch {
            setLabelInputError('Failed to save. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const activeCfg = activeLabelName ? LABEL_CONFIG[activeLabelName] : null;

    return createPortal(
        <div className={classNames('edit__user__profile', { active__mode: isEditMode })}>

            <div className={classNames('edit__user__profile__done__container', { hidden: hideBlock })}>
                <div className='container'>
                    <Button min={true} onClick={() => remove('editMode')}>Done</Button>
                </div>
            </div>

            <div className='profile__main__content'>

                <div className='user__profile__avatar__container'>
                    <div className='avatar'>
                        <input
                            ref={fileInputRef}
                            type='file'
                            id='input__user__avatar'
                            accept='image/*'
                            hidden
                            onChange={handleAvatarChange}
                            disabled={avatarLoading}
                        />

                        {userData?.avatar ? (
                            <ImageSkeleton
                                src={userData.avatar}
                                alt='User profile image'
                                variant='avatar'
                                rounded='full'
                                fit='cover'
                                figureClass={classNames('avatar__figure', { loading: avatarLoading })}
                            >
                                <label
                                    className='edit__image'
                                    htmlFor='input__user__avatar'
                                >
                                    {avatarLoading
                                        ? <LoadingDot />
                                        : <><CameraSvg /><p className='text'>Edit</p></>
                                    }
                                </label>
                            </ImageSkeleton>
                        ) : (
                            <div className={classNames('user', { loading: avatarLoading })}>
                                <label
                                    className='add__image'
                                    htmlFor='input__user__avatar'
                                >
                                    {avatarLoading
                                        ? <LoadingDot />
                                        : <><CameraSvg /><p className='text'>Add</p></>
                                    }
                                </label>
                                <p className='letter'>
                                    {userData?.name?.[0] || userData?.fullName?.[0] || 'U'}
                                </p>
                            </div>
                        )}
                    </div>
                </div>

                <div className='user__profile__edit__container'>

                    <div className='user__information'>
                        <h1 className='title'>My profile</h1>
                        <p className='desc'>
                            Hosts and guests can see your profile and it may appear across Nestfy to help us build trust in our community.{' '}
                            <NavLink to={`/${lang}/learn-more`} className='link'>Learn more</NavLink>
                        </p>
                    </div>

                    <div className='profile__edits__label'>
                        {userInfoEdit?.map(({ title, labelName }, index) => {
                            const value = getLabelValue(labelName);
                            const hasValue = Boolean(value);
                            return (
                                <button
                                    key={index}
                                    className={classNames('label', { 'label--filled': hasValue })}
                                    onClick={() => openLabelModal(labelName)}
                                >
                                    {labelName === 'travel' && <EarthSvg />}
                                    {labelName === 'work' && <WorkSvg />}
                                    {labelName === 'lamp' && <LampSvg />}
                                    {labelName === 'speak' && <MessLangSvg />}
                                    {labelName === 'live' && <EarthSvg />}
                                    <p className='label__text'>
                                        {hasValue ? `${title}: ${value}` : title}
                                    </p>
                                    {hasValue && <ChevronRightSvg className='label__arrow' />}
                                </button>
                            );
                        })}
                    </div>

                    <div className='user__about__me__container'>
                        <h1 className='title'>About me</h1>
                        <div className='box__about'>
                            <h3 className='subtitle'>Write something fun and punchy.</h3>
                            {displayBio()}
                        </div>
                    </div>

                    <div className='user__social__media__links__container'>
                        <div className='info'>
                            <h1 className='title'>Social Medias Links</h1>
                            <p className='desc'>Select the social networks that will be displayed on your profile.</p>
                        </div>
                        <div className='social__links__container'>
                            {userInfoEditSocial.map(({ social }, index) => (
                                <div key={index} className='social__item'>
                                    {social === 'telegram' && <TelegramSvg className='icon cls-2' />}
                                    {social === 'facebook' && <FacebookSvg className='icon cls-3' />}
                                    {social === 'linkedin' && <LinkedinSvg className='icon cls-4' />}
                                    {social === 'website' && <WebsiteSvg className='icon cls-5' />}
                                    {social === 'instagram' && <InstagramSvg className='icon cls-6' />}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className='done__button__container' ref={triggerRef}>
                        <Button min={true} onClick={() => remove('editMode')}>Done</Button>
                    </div>

                </div>
            </div>

            <CommonModal width={570} height={400} isOpen={isOpenBioModal} onClose={() => setIsOpenBioModal(false)}>
                <div className='bio__modal__container'>
                    <h1 className='title__bio__modal'>About you</h1>
                    <p className='desc__bio__modal'>
                        Tell us a little bit about yourself so your future Hosts or guests can get to know you.
                    </p>
                    <TextareaCounter
                        value={bioValue}
                        onChange={(v) => { setBioValue(v); if (bioError) setBioError(''); }}
                        max_length={500}
                        placeholder='Write something about yourself...'
                        error={bioError}
                    />
                    <div className='save__container'>
                        <Button min={true} onClick={handleSaveBio} disabled={isLoading} loading={isLoading}>
                            Save
                        </Button>
                    </div>
                </div>
            </CommonModal>


            <CommonModal width={570} height={340} isOpen={Boolean(activeLabelName)} onClose={closeLabelModal}>
                {activeCfg && (
                    <div className='label__modal__container'>
                        <h1 className='title__label__modal'>{activeCfg.title}</h1>
                        <p className='desc__label__modal'>{activeCfg.desc}</p>
                        <div className={classNames('label__input__wrapper', { error: Boolean(labelInputError) })}>
                            <input
                                className='label__input'
                                type='text'
                                placeholder={activeCfg.placeholder}
                                value={labelInputValue}
                                maxLength={activeCfg.maxLength}
                                onChange={(e) => {
                                    setLabelInputValue(e.target.value);
                                    if (labelInputError) setLabelInputError('');
                                }}
                            />
                            <span className='label__input__counter'>
                                {activeCfg.maxLength - labelInputValue.length} characters available
                            </span>
                            {labelInputError && (
                                <span className='label__input__error'>{labelInputError}</span>
                            )}
                        </div>
                        <div className='save__container'>
                            <Button min={true} onClick={handleSaveLabel} disabled={isLoading} loading={isLoading}>
                                Save
                            </Button>
                        </div>
                    </div>
                )}
            </CommonModal>

            <AnimatePresence>
                {photoModalOpen && (
                    <PhotoUploadModal
                        imageSrc={pendingImageSrc}
                        fileInputRef={fileInputRef}
                        onClose={handleClosePhotoModal}
                        onConfirm={handleConfirmPhoto}
                        isOpen={photoModalOpen}
                    />
                )}
            </AnimatePresence>

        </div>,
        document.getElementById('root')
    );
}