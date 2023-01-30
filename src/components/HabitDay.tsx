import * as Popover from '@radix-ui/react-popover';
import { ProgressBar } from './ProgressBar';
import clsx from 'clsx';
import dayjs from 'dayjs';
import { HabitsList } from './HabitsList';
import { useState } from 'react';

interface HabitDayProps {
  date: Date;
  defaultCompleted?: number;
  available?: number;
}

export default function HabitDay({ date, defaultCompleted = 0, available = 0 }: HabitDayProps) {
  const [completed, setCompleted] = useState(defaultCompleted);
  const completionPercentage = available > 0 ? Math.round((completed / available) * 100) : 0;
  const dayAndMonth = dayjs(date).format('DD/MM');
  const weekday = dayjs(date).format('dddd');

  function handleCompletedHabitsChanged(completed: number) {
    setCompleted(completed);
  }

  return (
    <Popover.Root>
      <Popover.Trigger
        className={clsx(
          'w-10 h-10 border-2 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-violet-600 focus:ring-offset-2 focus:ring-offset-background',
          {
            'bg-violet-500 border-violet-400': completionPercentage >= 80,
            'bg-violet-600 border-violet-500':
              completionPercentage >= 60 && completionPercentage < 80,
            'bg-violet-700 border-violet-500':
              completionPercentage >= 40 && completionPercentage < 60,
            'bg-violet-800 border-violet-600':
              completionPercentage >= 20 && completionPercentage < 40,
            'bg-violet-900 border-violet-700':
              completionPercentage > 0 && completionPercentage < 20,
            'bg-zinc-900 border-zinc-800': completionPercentage === 0
          }
        )}
      >
        <Popover.Portal>
          <Popover.Content className="min-w-[320px] p-6 rounded-2xl bg-zinc-900 flex flex-col">
            <span className="font-semibold text-zinc-400">{weekday}</span>
            <span className="mt-1 font-extrabold leading-tight text-3xl">{dayAndMonth}</span>

            <ProgressBar progress={completionPercentage} />

            <HabitsList date={date} onCompletedHabitsChanged={handleCompletedHabitsChanged} />
            <Popover.Arrow height={8} width={16} className="fill-zinc-900" />
          </Popover.Content>
        </Popover.Portal>
      </Popover.Trigger>
    </Popover.Root>
  );
}
