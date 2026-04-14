import React from 'react';
import { useSelector } from 'react-redux';

import { userProfileOptions } from '../../data/userProfileData';

export default function Profile() {
    const status = useSelector(state => state.authReducer.status);
    const userData = JSON.parse(localStorage.getItem("userData") || null);

    return (
        <div className='user__profile__page'>
            <div className='user__profile__page__container'>
                <aside className='user__profile__page__container__profile__section'>
                    <h2 className='title'>
                        Profile
                    </h2>

                    <div className='about__me__options__contianer'>
                        {userProfileOptions.map(({ title, optionName }) => (
                            <button className='option__about'>
                                {optionName === 'aboutMe' && (
                                    <div className='about__me'>
                                        <div className='user'>{userData?.name[0]}</div>

                                        <p className='desc'>{title}</p>
                                    </div>
                                )}
                            </button>
                        ))}
                    </div>
                </aside>

                <div className='user__profile__page__container__about__section'>
                    <div className='info__container'>
                        <h2 className='title'>
                            About me
                        </h2>
                        <button className='edit__button'>
                            Edit
                        </button>
                    </div>

                    <div className='about__profile'>
                        <div className='user__card'>
                            <div className='about__me__user'>
                                <p className='user'>{userData?.name[0]}</p>
                            </div>

                            <p className='user__name'>{userData?.name}</p>
                            <p className='status'>Guest</p>
                        </div>

                        <div className='user__profile__info'>
                            <h2 className='title'>
                                Complete your profile
                            </h2>

                            <p className='desc'>
                                Your Airbnb profile is an important part of every reservation. Complete yours to help other hosts and guests get to know you.
                            </p>

                            <button className='get__started'>
                                Get started
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
