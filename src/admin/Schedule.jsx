import React, { useState } from "react";
import NssButtonEdit from "../nss/NssButtonEdit";

const Schedule = (props) => {
  const { schedule, parentId } = props;

  const sortedSchedule = schedule.sort((a, b) => {
    const dayOrder = {
      Sun: 0,
      Mon: 1,
      Tue: 2,
      Wed: 3,
      Thu: 4,
      Fri: 5,
      Sat: 6,
    };
    return dayOrder[a.day] - dayOrder[b.day];
  });

  return (
    <div>
      <div className=" shadow-xl min-w-0 border-2 rounded-md mt-2">
        <div className="overflow-x-auto flex p-4 gap-2">
          {sortedSchedule.map((dailySchedule, index) => (
            <ScheduleCard
              dailySchedule={dailySchedule}
              index={index}
              key={index}
              employeeId={parentId}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const ScheduleCard = (props) => {
  const { dailySchedule, index, parentId } = props;
  const [editMode, setEditMode] = useState(false);
  const [schedule, setSchedule] = useState({ ...dailySchedule });
  const [day, setDay] = useState(dailySchedule.day);
  const [beginTime, setBeginTime] = useState(dailySchedule.beginTime);
  const [endTime, setEndTime] = useState(dailySchedule.endTime);

  const returnDailyScheduleObject = () => {
    const dailyScheduleObject = {
      id: dailySchedule.id,
      day: day,
      beginTime: beginTime,
      endTime: endTime,
      employee: {
        id: parentId,
      },
    };
    return dailyScheduleObject;
  };

  const editShedule = () => {
    setEditMode(!editMode);
  };

  return (
    <div key={index} className="w-44 border rounded-lg">
      <div className="text-center">{dailySchedule.day}</div>
      <div className="grid grid-cols-2 gap-2">
        <div className="text-center">
          <div className="text-xs font-bold">Begin Time:</div>
          <div className="text-sm">{dailySchedule.beginTime}</div>
        </div>

        <div className="text-center">
          <div className="text-xs font-bold">End Time:</div>
          <div className="text-sm">{dailySchedule.endTime}</div>
        </div>
        <div className="p-2">
          <NssButtonEdit
            onClick={editShedule}
            label="Edit"
            selected={editMode}
          />
        </div>
      </div>
    </div>
  );
};

export default Schedule;
