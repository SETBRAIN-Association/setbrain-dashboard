'use client';

import Image from 'next/image';
import React, { use } from 'react';
import Skeleton from 'react-loading-skeleton';
import { getProfilePictureLinkById } from 'utils/profiles';
import { useSupabase } from '../providers/supabase-provider';

interface ProfilePictureProps {
    id: string;
    isLogged?: boolean;
}

export const ProfilePicture = ({
    id,
    isLogged = false,
}: ProfilePictureProps) => {
    const supabase = useSupabase().supabase;
    const profilePictureLink = use(getProfilePictureLinkById(id, supabase));

    if (!profilePictureLink)
        return <ProfilePictureSkeleton></ProfilePictureSkeleton>;

    return (
        <div
            className={`h-full relative aspect-square rounded-full overflow-hidden border-2 ${
                isLogged ? 'border-blue-100' : 'border-black-24'
            }`}
        >
            <Image
                src={profilePictureLink}
                alt={profilePictureLink}
                fill={true}
                loading="lazy"
                sizes="100%"
            ></Image>
        </div>
    );
};

export const ProfilePictureSkeleton = () => {
    return (
        <div className="h-full relative aspect-square rounded-full overflow-hidden border-2 border-black-24">
            <Skeleton width={'100%'} height={'100%'}></Skeleton>
        </div>
    );
};
