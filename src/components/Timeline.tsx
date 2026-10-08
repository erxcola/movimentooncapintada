import React from 'react';
import type { TimelineMilestone } from '@/content/site';

export interface TimelineProps {
  milestones: readonly TimelineMilestone[];
}

export const Timeline: React.FC<TimelineProps> = ({ milestones }) => {
  return (
    <div className="relative my-12 max-w-prose">
      <span
        aria-hidden="true"
        className="timeline-rail absolute left-[6px] top-1 bottom-1 w-[3px] origin-top bg-yellow"
      />
      <ol className="list-none m-0 p-0 space-y-9">
        {milestones.map((milestone) => (
          <li key={milestone.year} className="timeline-item relative pl-10">
            <span
              aria-hidden="true"
              className="absolute left-0 top-[7px] h-[15px] w-[15px] rounded-full border-[3px] border-yellow bg-green"
            />
            <div className="font-display text-yellow text-2xl leading-none">
              {milestone.year}
            </div>
            <div className="font-body font-bold text-paper mt-1.5">
              {milestone.title}
            </div>
            <p className="font-body text-paper/70 mt-1">{milestone.description}</p>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default Timeline;
