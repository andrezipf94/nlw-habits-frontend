import * as Checkbox from '@radix-ui/react-checkbox';
import dayjs from 'dayjs';
import { Check } from 'phosphor-react';
import { useEffect, useState } from 'react';
import { api } from '../lib/axios';

interface HabitsList {
  date: Date;
  onCompletedHabitsChanged: (completed: number) => void;
}

interface HabitsAtDay {
  available: {
    id: string;
    title: string;
    created_at: string;
  }[];
  completed: string[];
}

export function HabitsList({ date, onCompletedHabitsChanged }: HabitsList) {
  const [habitsAtDay, setHabitsAtDay] = useState<HabitsAtDay>();
  const isPastDate = dayjs(date).endOf('day').isBefore(new Date());

  useEffect(() => {
    fetchDay();
  }, []);

  async function fetchDay() {
    const { data } = await api.get('day', {
      params: {
        date: date.toISOString()
      }
    });
    setHabitsAtDay(data);
  }

  async function handleHabitToggle(habitID: string) {
    await api.patch(`habits/${habitID}/toggle`);

    const isHabitCompleted = habitsAtDay!.completed.includes(habitID);
    let completedHabits: string[] = [];
    if (isHabitCompleted) {
      completedHabits = habitsAtDay!.completed.filter(
        (completedHabitID) => completedHabitID !== habitID
      );
    } else {
      completedHabits = [...habitsAtDay!.completed, habitID];
    }

    setHabitsAtDay({
      completed: completedHabits,
      available: habitsAtDay!.available
    });
    onCompletedHabitsChanged(completedHabits.length);
  }

  return (
    <div className="mt-6 flex flex-col gap-3">
      {habitsAtDay?.available.map((habit) => {
        return (
          <Checkbox.Root
            key={habit.id}
            className="flex items-center gap-3 group focus:outline-none disabled:cursor-not-allowed"
            onCheckedChange={() => handleHabitToggle(habit.id)}
            checked={habitsAtDay.completed.includes(habit.id)}
            disabled={isPastDate}
          >
            <div className="h-8 w-8 rounded-lg flex items-center justify-center bg-zinc-900 border-2 border-zinc-800 group-data-[state=checked]:bg-green-500 group-data-[state=checked]:border-green-500 group-focus:ring-2 group-focus:ring-violet-600 group-focus:ring-offset-2 group-focus:ring-offset-background">
              <Checkbox.Indicator>
                <Check size={20} className="text-white" />
              </Checkbox.Indicator>
            </div>

            <span className="font-semibold text-xl text-white leading-tight group-data-[state=checked]:line-through group-data-[state=checked]:text-zinc-400">
              {habit.title}
            </span>
          </Checkbox.Root>
        );
      })}
    </div>
  );
}
