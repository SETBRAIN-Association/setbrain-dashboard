import React from 'react';
import { getProfileById } from 'utils/profiles';
import { createClient } from 'utils/supabase-server';
import { getJobNames } from 'utils/jobs';
import Skeleton from 'react-loading-skeleton';
import { Tooltip } from 'ui/components/tooltip/Tooltip';

export const ProfileCard = (async () => {
    const supabase = createClient();
    const authenticathedUser = (await supabase.auth.getUser()).data.user
    if(!authenticathedUser) return null;
    const {data} = await getProfileById(authenticathedUser.id, supabase);
    const jobs = await getJobNames(authenticathedUser.app_metadata.jobs);
    const jobsContent = jobs.length > 1 ? jobs.slice(0, jobs.length - 1).join(', ') + ' & ' + jobs[jobs.length - 1] : jobs[0];

    if (data) {
        return <div className='flex gap-2 w-full items-center'>
            {data.avatar_url && <img className='rounded-2xl h-14 w-14' src={data.avatar_url}/>}
            <div className='grid gap-1 max-w-full'>
                <h1 className='text-body-b font-bold'>{data.firstname} {data.lastname}</h1>
                <Tooltip side='bottom' content={jobsContent}>
                    <span className='text-ellipsis overflow-hidden whitespace-nowrap w-full box-border text-body-r cursor-default'>
                        { jobsContent }
                    </span>
                </Tooltip>
            </div>
        </div>
    }else {
        return null;
    }
}) as unknown as () => JSX.Element;

export const ProfileCardSkeleton = () => {
    return <div className='flex gap-2 w-full items-center'>
        <Skeleton className='rounded-2xl h-14 !w-14 !leading-loose'/>
        <div className='flex flex-col gap-1'>
            <Skeleton width={100}/>
            <Skeleton width={200}/>
        </div>
    </div>
};
