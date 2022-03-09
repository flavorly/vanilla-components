import momentTZ from 'moment-timezone';
import Fuse from 'fuse.js';
import filter from 'lodash/filter';
import each from 'lodash/each';
import { Ref } from 'vue';

export const Timezones = momentTZ.tz.names().map((timezone) => ({
    value: timezone,
    label: timezone,
}));

export const filterTimezonesByName = function (
    query = '',
    current = '',
    collection = [],
    minCharacters = 2,
    favoriteTimezones = [
        'America/New_York',
        'Europe/London',
        'Europe/Lisbon',
        'Europe/Spain',
        'Europe/Dublin',
    ],
): string[] | Ref[] {

    if (query === '' || query.length < minCharacters) {
        return filter(collection, (timezone: Ref): boolean => {
            return favoriteTimezones.includes(timezone.value) || timezone.value === current;
        });
    }

    const options = {
        includeScore: false,
        threshold: 0.3,
        keys: ['value'],
    };

    const fuse = new Fuse(collection, options);
    const results = fuse.search(query);
    const filtered: Ref[] | string[] = [];

    each(results, (result) => {
        filtered.push(result.item);
    });

    return filtered;
};
