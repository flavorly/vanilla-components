import momentTZ from 'moment-timezone';
import Fuse from 'fuse.js';
import filter from 'lodash/filter';
import each from 'lodash/each';

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
) {

    if (query === '' || query.length < minCharacters) {
        return filter(collection, (timezone) => {
            return favoriteTimezones.includes(timezone.value) || timezone.value === current;
        });
    }

    const options = {
        includeScore: false,
        threshold: 0.3,
        keys: ['value'],
    };

    const fuse = new Fuse(collection, options);
    let results = fuse.search(query);
    let filtered = [];

    each(results, (result) => {
        filtered.push(result.item);
    });

    return filtered;
};
