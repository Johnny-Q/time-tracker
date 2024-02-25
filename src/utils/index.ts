import { useEffect, useState } from 'react';
import dayjs from 'dayjs';

namespace AW {
    export type WindowEvent = {
        data: {
            title: string;
            app: string;
            url: string;
        };
        duration: number;
        id: number;
        timestamp: string;
    }
}

export type WindowEvent = {
    data: {
        title: string;
        app: string;
        url: string;
    };
    duration: number;
    start_time: dayjs.Dayjs;
    end_time: dayjs.Dayjs;
}

async function getEvents(): Promise<WindowEvent[]> {
    // const resp = await fetch("http://localhost:5600/api/0/buckets");
    // console.log(await resp.json());
    // const bucket_id = "aw-watcher-window_Johnnys-Macbook-Pro.local";
    const bucket_id = "aw-watcher-window_Johnnys-MBP.hitronhub.home";
    const today = dayjs().startOf("day");
    const resp = await fetch(`http://localhost:5600/api/0/buckets/${bucket_id}/events?start=${today.toISOString()}`);
    const aw_events = await resp.json();
    return aw_events.map((event: AW.WindowEvent) => {
        const { data, duration, timestamp } = event;
        const start_time = dayjs(timestamp);
        const end_time = start_time.add(duration, "second");
        return {
            data,
            duration,
            start_time,
            end_time
        }
    });
}

function dateIsFirstHalf(date: dayjs.Dayjs) {
    return 0 <= date.minute() && date.minute() <= 29;
}

function groupEvents(events: WindowEvent[]): WindowEvent[][] {
    if (events.length == 0) return [];

    //sort in descending start time
    events.sort((event_a, event_b) => {
        return event_b.start_time.diff(event_a.start_time);
    })

    const groupedEvents: WindowEvent[][] = [];
    let currGroup: WindowEvent[] = [events[0]];
    let currGroupType = dateIsFirstHalf(events[0].start_time);
    for (let i = 1; i < events.length; i++) {
        if (dateIsFirstHalf(events[i].start_time) == currGroupType) {
            currGroup.push(events[i]);
        } else {
            groupedEvents.push(currGroup);
            currGroup = [events[i]];
            currGroupType = dateIsFirstHalf(events[i].start_time)
        }
    }
    groupedEvents.push(currGroup);
    return groupedEvents;
}

export function useEvents() {
    const [events, setEvents] = useState<WindowEvent[]>([])
    useEffect(() => {
        getEvents().then((events) => {
            setEvents(events);
        })
    }, [])
    return events;
}
export function useGroupedEvents() {
    const [groupedEvents, setGroupedEvents] = useState<WindowEvent[][]>([])
    useEffect(() => {
        getEvents().then((events) => {
            const grouped_events = groupEvents(events);
            console.log(grouped_events);
            setGroupedEvents(grouped_events);
        })
    }, [])
    return groupedEvents;
}