import React from 'react';
import notifee, {
  TimestampTrigger,
  TriggerType,
  TimeUnit,
  AndroidImportance,
} from '@notifee/react-native';
import {Platform} from 'react-native';

const convertTime12to24 = time12h => {
  const [time, modifier] = time12h.split(' ');

  let [hours, minutes] = time.split(':');

  if (hours === '12') {
    hours = '00';
  }

  if (modifier === 'PM') {
    hours = parseInt(hours, 10) + 12;
  }

  return `${hours}:${minutes}`;
};

const getTime = time => {
  if (time == 'Part of the day') {
    return null;
  } else if (time == 'Any time of day') {
    return null;
  } else if (time == 'At given time') {
    return null;
  } else if (time == 'Morning') {
    const finalHourMin = {
      hour: 7,
      min: 2,
    };
    return finalHourMin;
  } else if (time == 'Afternoon') {
    const finalHourMin = {
      hour: 12,
      min: 30,
    };
    return finalHourMin;
  } else if (time == 'Evening') {
    const finalHourMin = {
      hour: 19,
      min: 12,
    };
    return finalHourMin;
  } else {
    let convertedTime = convertTime12to24(time);
    // console.log('awais : ', awasi);
    let ti = time;
    // let kk = ti.split(' ')[0];
    let kk = convertedTime;
    // let amPm = ti.split(' ')[1];
    let h = kk.split(':')[0];
    let m = kk.split(':')[1];
    let finalHour = h;
    let finalMin = m;
    if (h < 10) {
      finalHour = h.replace(/^0+/, '');
    }
    if (m < 10) {
      finalMin = m.replace(/^0+/, '');
    }
    // console.log('final hour: ', finalHour);
    // console.log('final min: ', finalMin);

    // console.log(amPm);

    let finalHourMin = {
      hour: parseInt(finalHour),
      min: parseInt(finalMin),
    };
    return finalHourMin;
  }
};

export const scheduleNotification = async (data, taskDate) => {
  let notification_Time = getTime(data?.time);
  if (notification_Time !== null && data?.showNotifi) {
    console.log('time of notification is:  ', notification_Time);
    try {
      if (Platform.OS === 'ios') {
        await notifee.requestPermission();
      }

      // Create a channel (required for Android)
      const channelId = await notifee.createChannel({
        id: data?.id,
        name: `Channel ${data?.id}`,
        importance: AndroidImportance.HIGH,
      });
      const date = new Date(Date.now());
      date.setHours(notification_Time?.hour);
      date.setMinutes(notification_Time?.min);
      date.setSeconds(0);

      if (taskDate) {
        let cd = new Date(taskDate);
        let cy = cd.getFullYear();
        let cdate = cd.getDate();
        let cm = cd.getMonth();

        date.setDate(cdate);
        date.setFullYear(cy);
        date.setMonth(cm);
      }

      //   console.log('time is: ', date.getTime());
      // Create a time-based trigger
      const trigger = {
        type: TriggerType.TIMESTAMP,
        timestamp: date.getTime(),
      };

      // Create a trigger notification
      let res = await notifee.createTriggerNotification(
        {
          title: data?.title,
          body: 'Your task time is starting now!',
          android: {
            channelId: channelId,
          },
        },
        trigger,
      );

      console.log('notification is created:  ', res);
    } catch (error) {
      console.log('Error in noitification show: ', error);
    }
  } else {
    console.log('no notification!');
  }
};
