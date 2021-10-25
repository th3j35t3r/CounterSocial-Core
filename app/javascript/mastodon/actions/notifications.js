import api, { getLinks } from '../api';
import IntlMessageFormat from 'intl-messageformat';
import { fetchRelationships } from './accounts';
import {
  importFetchedAccount,
  importFetchedAccounts,
  importFetchedStatus,
  importFetchedStatuses,
} from './importer';
import { saveSettings } from './settings';
import { defineMessages } from 'react-intl';
import { List as ImmutableList } from 'immutable';
import { unescapeHTML } from '../utils/html';
import { getFilters, regexFromFilters } from '../selectors';

export const NOTIFICATIONS_UPDATE      = 'NOTIFICATIONS_UPDATE';
export const NOTIFICATIONS_UPDATE_NOOP = 'NOTIFICATIONS_UPDATE_NOOP';

export const NOTIFICATIONS_EXPAND_REQUEST = 'NOTIFICATIONS_EXPAND_REQUEST';
export const NOTIFICATIONS_EXPAND_SUCCESS = 'NOTIFICATIONS_EXPAND_SUCCESS';
export const NOTIFICATIONS_EXPAND_FAIL    = 'NOTIFICATIONS_EXPAND_FAIL';

export const NOTIFICATIONS_FILTER_SET = 'NOTIFICATIONS_FILTER_SET';

export const NOTIFICATIONS_CLEAR      = 'NOTIFICATIONS_CLEAR';
export const NOTIFICATIONS_SCROLL_TOP = 'NOTIFICATIONS_SCROLL_TOP';

defineMessages({
  mention: { id: 'notification.mention', defaultMessage: '{name} mentioned you' },
  group: { id: 'notifications.group', defaultMessage: '{count} notifications' },
});

const fetchRelatedRelationships = (dispatch, notifications) => {
  const accountIds = notifications.filter(item => item.type === 'follow').map(item => item.account.id);

  if (accountIds.length > 0) {
    dispatch(fetchRelationships(accountIds));
  }
};

export function updateNotifications(notification, intlMessages, intlLocale) {
  return (dispatch, getState) => {
    const showInColumn = getState().getIn(['settings', 'notifications', 'shows', notification.type], true);
    const showAlert    = getState().getIn(['settings', 'notifications', 'alerts', notification.type], true);
    const playSound    = getState().getIn(['settings', 'notifications', 'sounds', notification.type], true);
    const filters      = getFilters(getState(), { contextType: 'notifications' });

    let filtered = false;

    if (notification.type === 'mention') {
      const regex       = regexFromFilters(filters);
      const searchIndex = notification.status.spoiler_text + '\n' + unescapeHTML(notification.status.content);

      filtered = regex && regex.test(searchIndex);
    }

    if (showInColumn) {
      dispatch(importFetchedAccount(notification.account));

      if (notification.status) {
        var notificationraw = JSON.stringify(notification.status);
        var thisvisibility = notificationraw.split('"visibility":"').pop().split('"')[0]; // returns 'two'
        var disablenotifydms = readCookie("disablenotifydms");
        console.log("DISABLENOTIFYDMS: " + disablenotifydms);
        console.log("NOTIFICATIONVISIBILTY: " + thisvisibility);

        if (thisvisibility == "direct"){
            if (disablenotifydms == "true"){
                if (typeof window.Notification !== 'undefined' && showAlert && !filtered) {
      const title = new IntlMessageFormat(intlMessages[`notification.${notification.type}`], intlLocale).format({ name: notification.account.display_name.length > 0 ? notification.account.display_name : notification.account.username });
      const body  = (notification.status && notification.status.spoiler_text.length > 0) ? notification.status.spoiler_text : unescapeHTML(notification.status ? notification.status.content : '');

      const notify = new Notification(title, { body, icon: notification.account.avatar, tag: notification.id });

      notify.addEventListener('click', () => {
        window.focus();
        notify.close();
      });
    }
                return;
            }
        }

    //----

    var entropycountprevious = readCookie("entropycount");

    var plusone = 1;

    if (entropycountprevious == null){

    entropycountprevious = 0;

    }

    if (entropycountprevious == ""){

    entropycountprevious = 0;

    }

    var entropycountnow = parseInt(entropycountprevious) + parseInt(plusone);


    createCookie("entropycount", entropycountnow);




    //--


    var targetlang = readCookie("googtrans");


    var translation_active = readCookie("translation_active");


    var gotranslate = 1;

    var greenlight = 0;

    //console.log("PRECHECKHECKGREENLIGHT:");
    //console.log(greenlight);

    var obj;

    
    if (targetlang != null && translation_active == 1 && targetlang != "x"){
    

    targetlang = targetlang.slice(-2);


        /// targetlang mappings here

    if (targetlang == 'af'){ targetlang = 'af';} // Afrikaans
    if (targetlang == 'sq'){ targetlang = 'sq';} // Albanian
    if (targetlang == 'am'){ targetlang = 'am';} // Amharic
    if (targetlang == 'ar'){ targetlang = 'ar';} // Arabic
    if (targetlang == 'hy'){ targetlang = 'hy';} // Armenian
    if (targetlang == 'az'){ targetlang = 'az';} // Azerbaijani
    if (targetlang == 'eu'){ targetlang = 'eu';} // Basque
    if (targetlang == 'be'){ targetlang = 'be';} // Belarusian
    if (targetlang == 'bn'){ targetlang = 'bn';} // Bengali
    if (targetlang == 'bs'){ targetlang = 'bs';} // Bosnian
    if (targetlang == 'bg'){ targetlang = 'bg';} // Bulgarian
    if (targetlang == 'ca'){ targetlang = 'ca';} // Catalan
    if (targetlang == 'CN'){ targetlang = 'zh';} // Chinese Simplified
    if (targetlang == 'TW'){ targetlang = 'zh';} // Chinese Traditional
    if (targetlang == 'hr'){ targetlang = 'hr';} // Croatian
    if (targetlang == 'cs'){ targetlang = 'cs';} // Czech
    if (targetlang == 'da'){ targetlang = 'da';} // Danish
    if (targetlang == 'nl'){ targetlang = 'nl';} // Dutch
    if (targetlang == 'af'){ targetlang = 'af';} // Afrikaans
    if (targetlang == 'en'){ targetlang = 'en';} // English
    if (targetlang == 'eo'){ targetlang = 'eo';} // Esperanto
    if (targetlang == 'et'){ targetlang = 'et';} // Estonian
    if (targetlang == 'fi'){ targetlang = 'fi';} // Finnish
    if (targetlang == 'fr'){ targetlang = 'fr';} // French
    if (targetlang == 'gl'){ targetlang = 'gl';} // Galician
    if (targetlang == 'ka'){ targetlang = 'ka';} // Georgian
    if (targetlang == 'de'){ targetlang = 'de';} // German
    if (targetlang == 'el'){ targetlang = 'el';} // Greek
    if (targetlang == 'gu'){ targetlang = 'gu';} // Gujarati
    if (targetlang == 'ht'){ targetlang = 'ht';} // Haitian
    if (targetlang == 'iw'){ targetlang = 'he';} // Hebrew
    if (targetlang == 'hi'){ targetlang = 'hi';} // Hindi
    if (targetlang == 'hu'){ targetlang = 'hu';} // Hungarian
    if (targetlang == 'is'){ targetlang = 'is';} // Icelandic
    if (targetlang == 'id'){ targetlang = 'id';} // Indonesian
    if (targetlang == 'ga'){ targetlang = 'ga';} // Irish
    if (targetlang == 'it'){ targetlang = 'it';} // Italian
    if (targetlang == 'ja'){ targetlang = 'ja';} // Japanese
    if (targetlang == 'jw'){ targetlang = 'jv';} // Javanese
    if (targetlang == 'kn'){ targetlang = 'kn';} // Kannada
    if (targetlang == 'kk'){ targetlang = 'kk';} // Kazakh
    if (targetlang == 'ko'){ targetlang = 'ko';} // Korean
    if (targetlang == 'ky'){ targetlang = 'ky';} // Kyrgyz
    if (targetlang == 'lo'){ targetlang = 'lo';} // Laothian
    if (targetlang == 'en'){ targetlang = 'en';} // English
    if (targetlang == 'la'){ targetlang = 'la';} // Latin
    if (targetlang == 'lv'){ targetlang = 'lv';} // Latvian
    if (targetlang == 'lt'){ targetlang = 'lt';} // Lithuanian
    if (targetlang == 'mk'){ targetlang = 'mk';} // Macedonian
    if (targetlang == 'mg'){ targetlang = 'mg';} // Malagasy
    if (targetlang == 'ms'){ targetlang = 'ms';} // Malay
    if (targetlang == 'ml'){ targetlang = 'ml';} // Malayalam
    if (targetlang == 'mt'){ targetlang = 'mt';} // Maltese
    if (targetlang == 'mi'){ targetlang = 'mi';} // Maori
    if (targetlang == 'mr'){ targetlang = 'mr';} // Marathi
    if (targetlang == 'en'){ targetlang = 'en';} // English
    if (targetlang == 'mn'){ targetlang = 'mn';} // Mongolian
    if (targetlang == 'ne'){ targetlang = 'ne';} // Nepali
    if (targetlang == 'no'){ targetlang = 'no';} // Norwegian
    if (targetlang == 'nn'){ targetlang = 'no';} // Norwegian (Njord)
    if (targetlang == 'fa'){ targetlang = 'fa';} // Persian
    if (targetlang == 'pl'){ targetlang = 'pl';} // Polish
    if (targetlang == 'BR'){ targetlang = 'pt';} // Portugese (Brazil)
    if (targetlang == 'pt'){ targetlang = 'pt';} // Portugese (Portugal)
    if (targetlang == 'pa'){ targetlang = 'pa';} // Punjabi
    if (targetlang == 'pa'){ targetlang = 'pa';} // Punjabi
    if (targetlang == 'ro'){ targetlang = 'ro';} // Romanian
    if (targetlang == 'ru'){ targetlang = 'ru';} // Russian
    if (targetlang == 'gd'){ targetlang = 'gd';} // Scottish
    if (targetlang == 'sr'){ targetlang = 'sr';} // Serbian
    if (targetlang == 'si'){ targetlang = 'si';} // Sinhalese
    if (targetlang == 'sk'){ targetlang = 'sk';} // Slovak
    if (targetlang == 'sl'){ targetlang = 'sl';} // Slovenian
    if (targetlang == 'es'){ targetlang = 'es';} // Spanish
    if (targetlang == '19'){ targetlang = 'es';} // Spanish (Latin America)
    if (targetlang == 'su'){ targetlang = 'su';} // Sundanese
    if (targetlang == 'sw'){ targetlang = 'sw';} // Swahili
    if (targetlang == 'sv'){ targetlang = 'sv';} // Swedish
    if (targetlang == 'tg'){ targetlang = 'tg';} // Tajik
    if (targetlang == 'ta'){ targetlang = 'ta';} // Tamil
    if (targetlang == 'te'){ targetlang = 'te';} // Telugu
    if (targetlang == 'th'){ targetlang = 'th';} // Thai
    if (targetlang == 'tr'){ targetlang = 'tr';} // Turkish
    if (targetlang == 'uk'){ targetlang = 'uk';} // Ukrainian
    if (targetlang == 'ur'){ targetlang = 'ur';} // Urdu
    if (targetlang == 'uz'){ targetlang = 'uz';} // Uzbek
    if (targetlang == 'vi'){ targetlang = 'vi';} // Vietnamese
    if (targetlang == 'cy'){ targetlang = 'cy';} // Welsh
    if (targetlang == 'yi'){ targetlang = 'yi';} // Yiddish

    // end targetlang mappings 




    var status_raw = JSON.stringify(notification.status);


    var cosonativeabbvs = "en ar ast bg bn ca co cs cy da de el eo es eu fa fi fr ga gl he hi hr hu hy id io it ja ka kk ko lt lv ml ms nl no oc pl pt ro ru sk sl sq sr sv ta te th tr uk zh";

    var jtapiabbvs = "af sq am ar hy az eu be bn bs bg ca zh zh hr cs da nl af en eo et fi fr gl ka de el gu ht he hi hu is id ga it ja jv kn kk ko ky lo en la lv lt mk mg ms ml mt mi mr en mn ne no no fa pl pt pt pa pa ro ru gd sr si sk sl es es su sw sv tg ta te th tr uk ur uz vi cy yi";


    var status_orig = JSON.stringify(notification.status);

    var cosonativedetected = status_orig.split('","uri"')[0];

    cosonativedetected = cosonativedetected.slice(-2);

    //console.log("COSONATIVEDETECTED:");
    //console.log(cosonativedetected);

    

    greenlight = 1;

    //console.log("POSTCHECKHECKGREENLIGHT:");
    //console.log(greenlight);





    var part1 = status_orig.substring(0, status_orig.indexOf('"content":"'));

    part1 = part1 + '"content":"';

    var part2 = status_orig.substring(status_orig.indexOf('","url"') + 1);



    var test_str = status_orig;
    var start_pos = test_str.indexOf('"content":"');
    var end_pos = test_str.indexOf('","url"',start_pos);
    var content = test_str.substring(start_pos,end_pos);

    content = content.substring(11);


    var numberofwords = content.split(' ').length;

    var numberofmentions = content.split("@").length - 1;

    var mentiondeduction = numberofmentions * 5;

    numberofwords = numberofwords - mentiondeduction;


    var numberoftags = content.split("#").length - 1;

    var tagdeduction = numberoftags * 4;

    numberofwords = numberofwords - tagdeduction;



    //console.log("NUMBEROFWORDS:");
    //console.log(numberofwords);

    var initializetransform = 0;

    if (targetlang != cosonativedetected){

    initializetransform = 1;

    } 

    if (numberofwords < 6){

    initializetransform = 1;

    }


    if (initializetransform > 0) {




    var contentlength = content.length;

    if (contentlength < 1 ){

    gotranslate = 0;

    }




    var content = encodeURIComponent(content);




    

    

    content = content.replace(/%20mention%5C%22%3E%40%3Cspan%3E/g,"%20mention%5C%22%3E%40%3Cspan%3E<");

    //console.log("CONTENTSENT:");
    //console.log(content);


    //translate content here


    var thisurl = "https://just-translated.p.rapidapi.com/?lang=" + targetlang + "&text=" + content;




    const settings = {
          "async": true,
          "crossDomain": true,
          "url": thisurl,
          "method": "GET",
          "headers": {
            "x-rapidapi-key": "",
            "x-rapidapi-host": "just-translated.p.rapidapi.com"
          }
        };


    $.ajax(settings).done(function (response) {
        //console.log("RESPONSE:");
        //console.log(response);
        obj = JSON.stringify(response);

        //});

        //var random = Math.floor((Math.random() * 9999) + 1000);

        //var cookiename = "jtapiresponse" + random;

        //var obj = JSON.stringify(obj);


        //console.log("STRINGIFIED RESPONSE OPJECT:");
        //console.log(obj);

        var nty = obj.includes("_(Content)_");

        if (nty == true){

        gotranslate = 0;


        }




        //var statustranslated = obj.substring(obj.indexOf('[') + 2, obj.indexOf('"]'));
        var statustranslated = response.text;
        //statustranslated = statustranslated.toString();
        statustranslated = String(statustranslated);



        content = statustranslated;

        content = content.replace(/\\/g,"");

        content = content.replace(/@<span></g,"@<span>");

        var httpcode = response.code;
        //httpcode = httpcode.toString();
        httpcode = String(httpcode);




    

    // end translate content here


    //var detected = obj.substring(obj.indexOf('lang":') + 15, obj.indexOf('"'));

    var detected = response.lang;
    
    //detected = detected.toString();
    detected = String(detected);

    detected = detected.slice(0, -3);





    detected = detected.slice(20);

    detected = detected.slice(0, -6); 




    if (detected == '"}'){

    detected = 'en';

    //gotranslate = 0;


    }


    if (detected == '"}'){

    detected = 'en';

    //gotranslate = 0;

    detected = 'en';

    }

    if (detected == ''){

    detected = 'en';

    //gotranslate = 0;

    }

    if (detected == null){

    detected = 'en';

    //gotranslate = 0;

    }

    //console.log("DETECTED:");
    //console.log(detected);


    

    var detectedencoded = btoa(detected.toUpperCase());
    console.log(detectedencoded);




    if (detectedencoded == "Ijp7IkxBTkciOiIifQ==") {

    gotranslate = 0;


    }

    //detected = detected.substr(11);

    var n = detected.includes(targetlang);

    if (n == false) {

    if (detected == 'af'){ detected = 'Afrikaans';} // Afrikaans
    if (detected == 'sq'){ detected = 'Albanian';} // Albanian
    if (detected == 'am'){ detected = 'Amharic';} // Amharic
    if (detected == 'ar'){ detected = 'Arabic';} // Arabic
    if (detected == 'hy'){ detected = 'Armenian';} // Armenian
    if (detected == 'az'){ detected = 'Azerbaijani';} // Azerbaijani
    if (detected == 'eu'){ detected = 'Basque';} // Basque
    if (detected == 'be'){ detected = 'Belarusian';} // Belarusian
    if (detected == 'bn'){ detected = 'Bengali';} // Bengali
    if (detected == 'bs'){ detected = 'Bosnian';} // Bosnian
    if (detected == 'bg'){ detected = 'Bulgarian';} // Bulgarian
    if (detected == 'ca'){ detected = 'Catalan';} // Catalan
    if (detected == 'zh'){ detected = 'Chinese';} // Chinese Simplified
    if (detected == 'hr'){ detected = 'Croatian';} // Croatian
    if (detected == 'cs'){ detected = 'Czech';} // Czech
    if (detected == 'da'){ detected = 'Danish';} // Danish
    if (detected == 'nl'){ detected = 'Dutch';} // Dutch
    if (detected == 'af'){ detected = 'Afrikaans';} // Afrikaans
    if (detected == 'en'){ detected = 'English';} // English
    if (detected == 'eo'){ detected = 'Esperanto';} // Esperanto
    if (detected == 'et'){ detected = 'Estonian';} // Estonian
    if (detected == 'fi'){ detected = 'Finnish';} // Finnish
    if (detected == 'fr'){ detected = 'French';} // French
    if (detected == 'gl'){ detected = 'Galician';} // Galician
    if (detected == 'ka'){ detected = 'Georgian';} // Georgian
    if (detected == 'de'){ detected = 'German';} // German
    if (detected == 'el'){ detected = 'Greek';} // Greek
    if (detected == 'gu'){ detected = 'Gujarati';} // Gujarati
    if (detected == 'ht'){ detected = 'Haitian';} // Haitian
    if (detected == 'iw'){ detected = 'Hebrew';} // Hebrew
    if (detected == 'hi'){ detected = 'Hindi';} // Hindi
    if (detected == 'hu'){ detected = 'Hungarian';} // Hungarian
    if (detected == 'is'){ detected = 'Icelandic';} // Icelandic
    if (detected == 'id'){ detected = 'Indonesian';} // Indonesian
    if (detected == 'ga'){ detected = 'Irish';} // Irish
    if (detected == 'it'){ detected = 'Italian';} // Italian
    if (detected == 'ja'){ detected = 'Japanese';} // Japanese
    if (detected == 'jw'){ detected = 'Javanese';} // Javanese
    if (detected == 'kn'){ detected = 'Kannada';} // Kannada
    if (detected == 'kk'){ detected = 'Kazakh';} // Kazakh
    if (detected == 'ko'){ detected = 'Korean';} // Korean
    if (detected == 'ky'){ detected = 'Kyrgyz';} // Kyrgyz
    if (detected == 'lo'){ detected = 'Laothian';} // Laothian
    if (detected == 'en'){ detected = 'English';} // English
    if (detected == 'la'){ detected = 'Latin';} // Latin
    if (detected == 'lv'){ detected = 'Latvian';} // Latvian
    if (detected == 'lt'){ detected = 'Lithuanian';} // Lithuanian
    if (detected == 'mk'){ detected = 'Macedonian';} // Macedonian
    if (detected == 'mg'){ detected = 'Malagasy';} // Malagasy
    if (detected == 'ms'){ detected = 'Malay';} // Malay
    if (detected == 'ml'){ detected = 'Malayalam';} // Malayalam
    if (detected == 'mt'){ detected = 'Maltese';} // Maltese
    if (detected == 'mi'){ detected = 'Maori';} // Maori
    if (detected == 'mr'){ detected = 'Marathi';} // Marathi
    if (detected == 'en'){ detected = 'English';} // English
    if (detected == 'mn'){ detected = 'Mongolian';} // Mongolian
    if (detected == 'ne'){ detected = 'Nepali';} // Nepali
    if (detected == 'no'){ detected = 'Norwegian';} // Norwegian
    if (detected == 'fa'){ detected = 'Persian';} // Persian
    if (detected == 'pl'){ detected = 'Polish';} // Polish
    if (detected == 'pt'){ detected = 'Portugese';} // Portugese (Portugal)
    if (detected == 'pa'){ detected = 'Punjabi';} // Punjabi
    if (detected == 'ro'){ detected = 'Romanian';} // Romanian
    if (detected == 'ru'){ detected = 'Russian';} // Russian
    if (detected == 'gd'){ detected = 'Scottish';} // Scottish
    if (detected == 'sr'){ detected = 'Serbian';} // Serbian
    if (detected == 'si'){ detected = 'Sinhalese';} // Sinhalese
    if (detected == 'sk'){ detected = 'Slovak';} // Slovak
    if (detected == 'sl'){ detected = 'Slovenian';} // Slovenian
    if (detected == 'es'){ detected = 'Spanish';} // Spanish
    if (detected == 'su'){ detected = 'Sundanese';} // Sudanese
    if (detected == 'sw'){ detected = 'Swahili';} // Swahili
    if (detected == 'sv'){ detected = 'Swedish';} // Swedish
    if (detected == 'tg'){ detected = 'Tajik';} // Tajik
    if (detected == 'ta'){ detected = 'Tamil';} // Tamil
    if (detected == 'te'){ detected = 'Telugu';} // Telugu
    if (detected == 'th'){ detected = 'Thai';} // Thai
    if (detected == 'tr'){ detected = 'Turkish';} // Turkish
    if (detected == 'uk'){ detected = 'Ukrainian';} // Ukrainian
    if (detected == 'ur'){ detected = 'Urdu';} // Urdu
    if (detected == 'uz'){ detected = 'Uzbek';} // Uzbek
    if (detected == 'vi'){ detected = 'Vietnamese';} // Vietnamese
    if (detected == 'cy'){ detected = 'Welsh';} // Welsh
    if (detected == 'yi'){ detected = 'Yiddish';} // Yiddish









    detected = detected.toUpperCase();



    var alt = 'Dynamically translated from ' + detected + ' by COSOxTALK. Your replies will appear to the other party(s) in their own language.';

    content = '<div class=ainotif width=100%><img src=https://counter.social/tr-notify.png width=100% alt=' + alt + ' title=' + alt + '></div>' + '<div id=translatedblock class=translatedblock>' + content + '</div>';

    //content = '<div id=translatedblock class=translatedblock>' + content + '</div>';



  
    }


    //content = content.replace(/"/g,"'");

    //content = content.replace(/&amp;lt; span=''&gt;/g, "");
    //content = content.replace(/&lt; span=''>/g, "");

    content = content.replace(/"/g,"'");



    
    



    


    content = content + '"';

    //console.log("CONTENT:");
    //console.log(content);





    var nt = content.includes("notranslate");

    if (nt == true){

    gotranslate = 0;



    }















    


    



    //console.log("CONTENT:");
    //console.log(content);

     content = content.replace(/@<span></g,"@<span>");
     content = content.replace(/&lt; span=''>/g, "</span>");



     
     content = content.replace(/&quot;/g, "");
     content = content.replace(/class='u-url' mention=''/g, "class='u-url mention'");

     content = content.replace(/&amp;lt; span=''>/g, " ");



     




    


    status_orig = part1 + content + part2;




    //console.log("NEW STRING:");
    //console.log(status_orig);

    
    var ntz = status_orig.includes("_(Content)_");

    if (ntz == true){

    gotranslate = 0;


    }


    if (httpcode != '200'){

    //var q = obj.includes(":200");

    //if (q == false){

    gotranslate = 0;



    }



    if (gotranslate > 0){

    status_orig = JSON.parse(status_orig);

    //console.log("NEW JSON:");
    //console.log(status_orig);

    }


    



    //console.log("GOTRANSLATE STATUS:");
    //console.log(gotranslate);



    if (gotranslate > 0){


    dispatch(importFetchedStatus(status_orig));

    dispatch({
      type: TIMELINE_UPDATE,
      timeline,
      status,
    });






    }  

    if (gotranslate < 1) {


    dispatch(importFetchedStatus(notification.status));





}

});

}

else {

    dispatch(importFetchedStatus(notification.status));

    
}



} 

else {


     




        dispatch(importFetchedStatus(notification.status));

      }
  }
      







      dispatch({
        type: NOTIFICATIONS_UPDATE,
        notification,
        meta: (playSound && !filtered) ? { sound: 'boop' } : undefined,
      });

      fetchRelatedRelationships(dispatch, [notification]);
    } else if (playSound && !filtered) {
      dispatch({
        type: NOTIFICATIONS_UPDATE_NOOP,
        meta: { sound: 'boop' },
      });
    }

    // Desktop notifications
    if (typeof window.Notification !== 'undefined' && showAlert && !filtered) {
      const title = new IntlMessageFormat(intlMessages[`notification.${notification.type}`], intlLocale).format({ name: notification.account.display_name.length > 0 ? notification.account.display_name : notification.account.username });
      const body  = (notification.status && notification.status.spoiler_text.length > 0) ? notification.status.spoiler_text : unescapeHTML(notification.status ? notification.status.content : '');

      const notify = new Notification(title, { body, icon: notification.account.avatar, tag: notification.id });

      notify.addEventListener('click', () => {
        window.focus();
        notify.close();
      });
    }
  };
};

const excludeTypesFromSettings = state => state.getIn(['settings', 'notifications', 'shows']).filter(enabled => !enabled).keySeq().toJS();

const excludeTypesFromFilter = filter => {
  const allTypes = ImmutableList(['follow', 'favourite', 'reblog', 'mention', 'poll']);
  return allTypes.filterNot(item => item === filter).toJS();
};

const noOp = () => {};

export function expandNotifications({ maxId } = {}, done = noOp) {
  return (dispatch, getState) => {
    const activeFilter = getState().getIn(['settings', 'notifications', 'quickFilter', 'active']);
    const notifications = getState().get('notifications');
    const isLoadingMore = !!maxId;

    if (notifications.get('isLoading')) {
      done();
      return;
    }

    const params = {
      max_id: maxId,
      exclude_types: activeFilter === 'all'
        ? excludeTypesFromSettings(getState())
        : excludeTypesFromFilter(activeFilter),
    };

    if (!maxId && notifications.get('items').size > 0) {
      params.since_id = notifications.getIn(['items', 0, 'id']);
    }

    dispatch(expandNotificationsRequest(isLoadingMore));

    api(getState).get('/api/v1/notifications', { params }).then(response => {
      const next = getLinks(response).refs.find(link => link.rel === 'next');

      dispatch(importFetchedAccounts(response.data.map(item => item.account)));
      dispatch(importFetchedStatuses(response.data.map(item => item.status).filter(status => !!status)));

      dispatch(expandNotificationsSuccess(response.data, next ? next.uri : null, isLoadingMore));
      fetchRelatedRelationships(dispatch, response.data);
      done();
    }).catch(error => {
      dispatch(expandNotificationsFail(error, isLoadingMore));
      done();
    });
  };
};

export function expandNotificationsRequest(isLoadingMore) {
  return {
    type: NOTIFICATIONS_EXPAND_REQUEST,
    skipLoading: !isLoadingMore,
  };
};

export function expandNotificationsSuccess(notifications, next, isLoadingMore) {
  return {
    type: NOTIFICATIONS_EXPAND_SUCCESS,
    notifications,
    next,
    skipLoading: !isLoadingMore,
  };
};

export function expandNotificationsFail(error, isLoadingMore) {
  return {
    type: NOTIFICATIONS_EXPAND_FAIL,
    error,
    skipLoading: !isLoadingMore,
  };
};

export function clearNotifications() {
  return (dispatch, getState) => {
    dispatch({
      type: NOTIFICATIONS_CLEAR,
    });

    api(getState).post('/api/v1/notifications/clear');
  };
};

export function scrollTopNotifications(top) {
  return {
    type: NOTIFICATIONS_SCROLL_TOP,
    top,
  };
};

export function setFilter (filterType) {
  return dispatch => {
    dispatch({
      type: NOTIFICATIONS_FILTER_SET,
      path: ['notifications', 'quickFilter', 'active'],
      value: filterType,
    });
    dispatch(expandNotifications());
    dispatch(saveSettings());
  };
};
