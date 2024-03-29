import React from 'react';
import { getProjectById } from 'utils/projects';
import dayjs from 'dayjs';
import Link from 'next/link';
import Skeleton from 'react-loading-skeleton';
import { ProjectActiveCapsule, ProjectActiveLinkTree } from './project-active';

interface ProjectCardProps {
    projectId: string;
}

export const ProjectCard = (async (props: ProjectCardProps) => {

  const {data} = await getProjectById(props.projectId);

  if (data) {
     return <div><Link href={'/project/' + props.projectId + '/home'}>
      <div className="flex items-center gap-2 cursor-pointer relative">
            <ProjectActiveCapsule projectId={props.projectId} />
            <div className="flex justify-between items-center w-full">
              <div className="flex gap-4 items-center">
                <span className="bg-center bg-cover h-[54px] w-[54px] rounded-xl" style={{backgroundImage: 'url('+ data.project_icon_url +')'}}></span>
                <div className="flex flex-col gap-px">
                  <h1 className="text-white-100 text-body-l font-normal font-display">{ data.name }</h1>
                  <span className="text-white-48 text-pretitle-s font-medium font-display">Crée le { dayjs(data.created_at).format('DD/MM/YY') }</span>
                </div>
              </div>
              <div className="notifications flex gap-2 items-center">
                <i className="fi fi-rr-settings h-4.5 w-4 flex items-center"></i>
              </div>
            </div>
        </div>
      </Link>
      <ProjectActiveLinkTree projectId={props.projectId} />
      </div>; 
  }

  return false;
}) as unknown as (props: ProjectCardProps) => JSX.Element;

export const ProjectCardSkeleton = () => {
  return <div className='flex items-center gap-2 cursor-pointer relative'>
      <div className='flex justify-between items-center w-full'>
        <div className='flex gap-4 items-center'>
          <Skeleton className='bg-center bg-cover !h-[54px] !w-[54px] rounded-xl'/>
          <div className='flex flex-col gap-px'>
            <Skeleton width={100}/>
            <Skeleton width={50}/>
          </div>
        </div>
        <Skeleton className='!h-4.5 !w-4 flex items-center'/>
      </div>
  </div>
};