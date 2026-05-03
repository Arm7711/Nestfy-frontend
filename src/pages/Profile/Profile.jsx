import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { userProfileOptions } from '../../data/userProfileData';
import { useQueryParams } from '../../hooks/useQueryParams';
import Api from '../../api/Api';
import UserCardModal from '../../components/_common/Modals/Profile/UserCardModal';
import EditUserProfile from '../../components/EditUserProfile/EditUserProfile';
import Button from '../../components/_common/Button/Button';
import ImageSkeleton from '../../components/_common/Skeletions/ImageSkeletion';

export default function Profile() {
    const status = useSelector(state => state.authReducer.status);
    const userData = JSON.parse(localStorage.getItem("userData")) || {};
    const userDataInfo = JSON.parse(localStorage.getItem("userDataInfo")) || {};
    const { get, set } = useQueryParams();

    const [activeMode, setActiveMode] = useState(false);
    const [userCardModalOpen, setUserCardModalOpen] = useState(false);

    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }, [activeMode]);

    useEffect(() => {
        (async () => {
            try {
                const { data } = await Api.getUserSettings();
                const { phone, preferredFirstName, professional, fullName, dateOfBirth } = data;

                localStorage.setItem('userDataInfo', JSON.stringify({ phone, preferredFirstName, professional, fullName, dateOfBirth }));
            } catch (e) {
                console.log(e);
            }
        }
        )()
    }, []);

    const chnageActiveMode = () => {
        set("editMode", true);
        setActiveMode(get("editMode"))
    }

    return (
        <div className='user__profile__page'>
            <EditUserProfile />
            <UserCardModal isOpen={userCardModalOpen} onClose={() => setUserCardModalOpen(false)} />
            <div className='user__profile__page__container'>
                <aside className='user__profile__page__container__profile__section'>
                    <h2 className='title'>
                        Profile
                    </h2>

                    <div className='about__me__options__contianer'>
                        {userProfileOptions.map(({ title, optionName }, index) => (
                            <button className='option__about' key={index}>
                                {optionName === 'aboutMe' && (

                                    <div className='about__me'>
                                        <div className='user'>{
                                            userData?.avatar ? (
                                                <ImageSkeleton
                                                    src={userData?.avatar}
                                                    figureClass={'user__img__figure'}
                                                    imgClass={'user__img'}
                                                    rounded='full'
                                                    width={'100%'}
                                                    height={'100%'}
                                                    variant='deafult'
                                                />
                                            ) :
                                                userData?.name?.[0] || 'U'
                                        }</div>
                                        <p className='desc'>{title}</p>
                                    </div>

                                )}
                            </button>
                        ))}
                    </div>
                </aside>

                <div className='user__profile__page__container__about__section'>
                    <div className='profile__container'>
                        <div className='info__container'>
                            <h2 className='title'>
                                About me
                            </h2>
                            <button className='edit__button' onClick={() => set("editMode", true)}>
                                Edit
                            </button>
                        </div>

                        <div className='about__profile'>
                            <div className='user__card' role='button' onClick={() => setUserCardModalOpen(true)}>
                                <div className='about__me__user'>
                                    {userData?.avatar ? (
                                        <ImageSkeleton
                                            src={userData?.avatar}
                                            figureClass={'user__me__figure'}
                                            imgClass={'user__img__me'}
                                            rounded='full'
                                            width={'100%'}
                                            height={'100%'}
                                        />
                                    ) : (
                                        <p className='user'>{userData?.name?.[0]}</p>
                                    )}
                                </div>

                                <p className='user__name'>{userDataInfo?.fullName || userDataInfo?.preferredFirstName || userData?.name}</p>
                                <p className='status'>Guest</p>
                            </div>

                            <div className='user__profile__info'>
                                <h2 className='title'>
                                    Complete your profile
                                </h2>

                                <p className='desc'>
                                    Your Nestfy profile is an important part of every reservation. Complete yours to help other hosts and guests get to know you.
                                </p>

                                <Button className='get__started' middle={true} onClick={chnageActiveMode}>
                                    Get started
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </div >
    )
}
