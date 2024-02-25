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

export type AppEventGroup = {
    app: string;
    duration: number;
    start_time: dayjs.Dayjs;
    end_time: dayjs.Dayjs;
    events: WindowEvent[];
}

function mergeSameAppEvents(events: WindowEvent[]): AppEventGroup[] {
    if (events.length == 0) return [];
    const groups: AppEventGroup[] = [];
    let curr_group: AppEventGroup = {
        app: events[0].data.app,
        events: [events[0]],
        ...events[0]
    };
    for (let i = 0; i < events.length; i++) {
        if (events[i].data.app == curr_group.app) {
            curr_group.events.push(events[i]);
            curr_group.end_time = events[i].end_time;
            curr_group.duration = curr_group.start_time.diff(events[i].end_time, "second");
        } else {
            groups.push(curr_group);
            curr_group = {
                app: events[i].data.app,
                events: [events[i]],
                ...events[i]
            };
        }
    }
    groups.push(curr_group);
    return groups;
}

export function useEvents() {
    const [events, setEvents] = useState<AppEventGroup[]>([])
    useEffect(() => {
        getEvents().then((events) => {
            setEvents(mergeSameAppEvents(events));
        })
    }, [])
    return events;
}

export function formatDuration(duration: number): string {
    const SECOND = 1;
    const MINUTE = 60 * SECOND;
    const HOUR = 60 * MINUTE;

    const hours = Math.floor(duration / HOUR);
    duration = duration % HOUR;
    const minutes = Math.floor(duration / MINUTE);
    duration = duration % MINUTE;
    const seconds = Math.floor(duration / SECOND);

    const duration_str_builder = [
        hours > 0 ? `${hours} hour${hours > 1 ? 's' : ''}` : '',
        minutes > 0 ? `${minutes} minute${minutes > 1 ? 's' : ''}` : '',
        `${seconds} second${seconds != 1 ? 's' : ''}`,
    ].filter(part => part !== '');

    const duration_str = duration_str_builder.join(' ');
    return duration_str;
}