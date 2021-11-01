// Array of country objects for the flag dropdown.

// Here is the criteria for the plugin to support a given country/territory
// - It has an iso2 code: https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2
// - It has it's own country calling code (it is not a sub-region of another country): https://en.wikipedia.org/wiki/List_of_country_calling_codes
// - It has a flag in the region-flags project: https://github.com/behdad/region-flags/tree/gh-pages/png
// - It is supported by libphonenumber (it must be listed on this page): https://github.com/googlei18n/libphonenumber/blob/master/resources/ShortNumberMetadata.xml

// Each country array has the following information:
// [
//    Country name,
//    iso2 code,
//    International dial code,
//    Order (if >1 country with same dial code),
//    Area codes
// ]
import Fuse from 'fuse.js'
import filter from 'lodash/filter';
import each from 'lodash/each';

const allCountries=[["Afghanistan","af","93"],["Albania","al","355"],["Algeria","dz","213"],["American Samoa","as","1684"],["Andorra","ad","376"],["Angola","ao","244"],["Anguilla","ai","1264"],["Antigua and Barbuda","ag","1268"],["Argentina","ar","54"],["Armenia","am","374"],["Aruba","aw","297"],["Australia","au","61",0],["Austria","at","43"],["Azerbaijan","az","994"],["Bahamas","bs","1242"],["Bahrain","bh","973"],["Bangladesh","bd","880"],["Barbados","bb","1246"],["Belarus","by","375"],["Belgium","be","32"],["Belize","bz","501"],["Benin","bj","229"],["Bermuda","bm","1441"],["Bhutan","bt","975"],["Bolivia","bo","591"],["Bosnia","ba","387"],["Botswana","bw","267"],["Brazil","br","55"],["British Indian Ocean Territory","io","246"],["British Virgin Islands","vg","1284"],["Brunei","bn","673"],["Bulgaria","bg","359"],["Burkina Faso","bf","226"],["Burundi","bi","257"],["Cambodia","kh","855"],["Cameroon","cm","237"],["Canada","ca","1",1,["204","226","236","249","250","289","306","343","365","387","403","416","418","431","437","438","450","506","514","519","548","579","581","587","604","613","639","647","672","705","709","742","778","780","782","807","819","825","867","873","902","905"]],["Cape Verde","cv","238"],["Caribbean Netherlands","bq","599",1],["Cayman Islands","ky","1345"],["Central African Republic","cf","236"],["Chad","td","235"],["Chile","cl","56"],["China","cn","86"],["Christmas Island","cx","61",2],["Cocos Islands","cc","61",1],["Colombia","co","57"],["Comoros","km","269"],["Congo","cd","243"],["Congo (Republic)","cg","242"],["Cook Islands","ck","682"],["Costa Rica","cr","506"],["Côte d’Ivoire","ci","225"],["Croatia","hr","385"],["Cuba","cu","53"],["Curaçao","cw","599",0],["Cyprus","cy","357"],["Czech Republic","cz","420"],["Denmark","dk","45"],["Djibouti","dj","253"],["Dominica","dm","1767"],["Dominican Republic","do","1",2,["809","829","849"]],["Ecuador","ec","593"],["Egypt","eg","20"],["El Salvador","sv","503"],["Equatorial Guinea","gq","240"],["Eritrea","er","291"],["Estonia","ee","372"],["Ethiopia","et","251"],["Falkland Islands","fk","500"],["Faroe Islands","fo","298"],["Fiji","fj","679"],["Finland","fi","358",0],["France","fr","33"],["French Guiana","gf","594"],["French Polynesia","pf","689"],["Gabon","ga","241"],["Gambia","gm","220"],["Georgia","ge","995"],["Germany","de","49"],["Ghana","gh","233"],["Gibraltar","gi","350"],["Greece","gr","30"],["Greenland","gl","299"],["Grenada","gd","1473"],["Guadeloupe","gp","590",0],["Guam","gu","1671"],["Guatemala","gt","502"],["Guernsey","gg","44",1],["Guinea","gn","224"],["Guinea-Bissau","gw","245"],["Guyana","gy","592"],["Haiti","ht","509"],["Honduras","hn","504"],["Hong Kong","hk","852"],["Hungary","hu","36"],["Iceland","is","354"],["India","in","91"],["Indonesia","id","62"],["Iran","ir","98"],["Iraq","iq","964"],["Ireland","ie","353"],["Isle of Man","im","44",2],["Israel","il","972"],["Italy","it","39",0],["Jamaica","jm","1876"],["Japan","jp","81"],["Jersey","je","44",3],["Jordan","jo","962"],["Kazakhstan","kz","7",1],["Kenya","ke","254"],["Kiribati","ki","686"],["Kosovo","xk","383"],["Kuwait","kw","965"],["Kyrgyzstan","kg","996"],["Laos","la","856"],["Latvia","lv","371"],["Lebanon","lb","961"],["Lesotho","ls","266"],["Liberia","lr","231"],["Libya","ly","218"],["Liechtenstein","li","423"],["Lithuania","lt","370"],["Luxembourg","lu","352"],["Macau","mo","853"],["Macedonia","mk","389"],["Madagascar","mg","261"],["Malawi","mw","265"],["Malaysia","my","60"],["Maldives","mv","960"],["Mali","ml","223"],["Malta","mt","356"],["Marshall Islands","mh","692"],["Martinique","mq","596"],["Mauritania","mr","222"],["Mauritius","mu","230"],["Mayotte","yt","262",1],["Mexico","mx","52"],["Micronesia","fm","691"],["Moldova","md","373"],["Monaco","mc","377"],["Mongolia","mn","976"],["Montenegro","me","382"],["Montserrat","ms","1664"],["Morocco","ma","212",0],["Mozambique","mz","258"],["Myanmar ","mm","95"],["Namibia","na","264"],["Nauru","nr","674"],["Nepal","np","977"],["Netherlands","nl","31"],["New Caledonia","nc","687"],["New Zealand","nz","64"],["Nicaragua","ni","505"],["Niger","ne","227"],["Nigeria","ng","234"],["Niue","nu","683"],["Norfolk Island","nf","672"],["North Korea","kp","850"],["Northern Mariana Islands","mp","1670"],["Norway","no","47",0],["Oman","om","968"],["Pakistan","pk","92"],["Palau","pw","680"],["Palestine","ps","970"],["Panama","pa","507"],["Papua New Guinea","pg","675"],["Paraguay","py","595"],["Peru","pe","51"],["Philippines","ph","63"],["Poland","pl","48"],["Portugal","pt","351"],["Puerto Rico","pr","1",3,["787","939"]],["Qatar","qa","974"],["Réunion","re","262",0],["Romania","ro","40"],["Russia","ru","7",0],["Rwanda","rw","250"],["Saint Barthélemy","bl","590",1],["Saint Helena","sh","290"],["Saint Kitts and Nevis","kn","1869"],["Saint Lucia","lc","1758"],["Saint Martin","mf","590",2],["Saint Pierre and Miquelon","pm","508"],["Saint Vincent and the Grenadines","vc","1784"],["Samoa","ws","685"],["San Marino","sm","378"],["São Tomé & Príncipe","st","239"],["Saudi Arabia","sa","966"],["Senegal","sn","221"],["Serbia","rs","381"],["Seychelles","sc","248"],["Sierra Leone","sl","232"],["Singapore","sg","65"],["Sint Maarten","sx","1721"],["Slovakia","sk","421"],["Slovenia","si","386"],["Solomon Islands","sb","677"],["Somalia","so","252"],["South Africa","za","27"],["South Korea","kr","82"],["South Sudan","ss","211"],["Spain","es","34"],["Sri Lanka","lk","94"],["Sudan","sd","249"],["Suriname","sr","597"],["Svalbard and Jan Mayen","sj","47",1],["Swaziland","sz","268"],["Sweden","se","46"],["Switzerland","ch","41"],["Syria","sy","963"],["Taiwan","tw","886"],["Tajikistan","tj","992"],["Tanzania","tz","255"],["Thailand","th","66"],["Timor-Leste","tl","670"],["Togo","tg","228"],["Tokelau","tk","690"],["Tonga","to","676"],["Trinidad and Tobago","tt","1868"],["Tunisia","tn","216"],["Turkey","tr","90"],["Turkmenistan","tm","993"],["Turks and Caicos Islands","tc","1649"],["Tuvalu","tv","688"],["U.S. Virgin Islands","vi","1340"],["Uganda","ug","256"],["Ukraine","ua","380"],["United Arab Emirates","ae","971"],["United Kingdom","gb","44",0],["United States","us","1",0],["Uruguay","uy","598"],["Uzbekistan","uz","998"],["Vanuatu","vu","678"],["Vatican City","va","39",1],["Venezuela","ve","58"],["Vietnam (Việt Nam)","vn","84"],["Wallis and Futuna","wf","681"],["Western Sahara","eh","212",1],["Yemen","ye","967"],["Zambia","zm","260"],["Zimbabwe","zw","263"],["Åland Islands","ax","358",1]];

export const countryCodes = allCountries.map((country) => ({
    name: country[0],
    iso2: country[1].toUpperCase(),
    dialCode: country[2],
    priority: country[3] || 0,
    areaCodes: country[4] || null,
}));

export const phoneCountries = countryCodes.map((country) => ({
    value: country.iso2,
    label: '<span class="flag-icon flag-icon-' + country.iso2.toLowerCase() + '"></span> ' + country.name + ' +' + country.dialCode,
    name: '<span class="flag-icon flag-icon-' + country.iso2.toLowerCase() + '"></span> ' + country.name,
    name_raw: country.name,
    dialCode: country.dialCode
}));

export const countries = countryCodes.map((country) => ({
    value: country.iso2,
    label: '<span class="flag-icon flag-icon-' + country.iso2.toLowerCase() + '"></span> ' + country.name,
    name_raw: country.name,
}));

export const filterCountriesByName = function (
    query = '',
    current = '',
    collection = [],
    minCharacters = 2,
    favoriteCountries = ['US', 'GB', 'PT', 'FR', 'DE']
) {

    if (query === '' || query.length < minCharacters) {
        return filter(collection, (country) => {
            return favoriteCountries.includes(country.value) || country.value === current
        })
    }

    const options = {
        includeScore: false,
        threshold: 0.3,
        keys: ['name_raw']
    }

    const fuse = new Fuse(collection, options);
    let results = fuse.search(query);
    let filtered = [];

    each(results, (result) => {
        filtered.push(result.item)
    })

    return filtered;
}
