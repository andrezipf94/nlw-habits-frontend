import { getAllYearDaysUntilNow } from "../utils/get-all-year-days-until-now";
import HabitDay from "./HabitDay";

const weekdays = [
    'D', 'S', 'T', 'Q', 'Q', 'S', 'S'
];

const minimumSummarySize = 18 * 7; // 18 7 days weeks
const summaryDates = getAllYearDaysUntilNow();
const amountOfFillerDays = minimumSummarySize - summaryDates.length;
export function SummaryTable() {
    return (
        <div className="w-full flex">
            <div className="grid grid-rows-7 grid-flow-row gap-3">
                {
                    weekdays.map((weekday, index) => (
                        <div key={`${weekday}-${index}`} className="text-zinc-400 text-xl h-10 w-10 flex items-center justify-center">
                            { weekday }
                        </div>
                    ))
                }
            </div>
            <div className="grid grid-rows-7 grid-flow-col gap-3">
                {
                    summaryDates.map(date => 
                        (<HabitDay key={date.toString()}/>)
                    )
                }
                {
                    amountOfFillerDays > 0 && Array.from({length: amountOfFillerDays}).map((_, index) => (
                        <div key={index} className="w-10 h-10 bg-zinc-900 border-2 border-zinc-800 rounded-lg opacity-40 cursor-not-allowed"/>
                    ))
                }
            </div>
        </div>
    );
}