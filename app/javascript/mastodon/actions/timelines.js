import { importFetchedStatus, importFetchedStatuses } from './importer';
import api, { getLinks } from '../api';
import { Map as ImmutableMap, List as ImmutableList } from 'immutable';

export const TIMELINE_UPDATE  = 'TIMELINE_UPDATE';
export const TIMELINE_DELETE  = 'TIMELINE_DELETE';
export const TIMELINE_CLEAR   = 'TIMELINE_CLEAR';

export const TIMELINE_EXPAND_REQUEST = 'TIMELINE_EXPAND_REQUEST';
export const TIMELINE_EXPAND_SUCCESS = 'TIMELINE_EXPAND_SUCCESS';
export const TIMELINE_EXPAND_FAIL    = 'TIMELINE_EXPAND_FAIL';

export const TIMELINE_SCROLL_TOP = 'TIMELINE_SCROLL_TOP';

export const TIMELINE_CONNECT    = 'TIMELINE_CONNECT';
export const TIMELINE_DISCONNECT = 'TIMELINE_DISCONNECT';

export function updateTimeline(timeline, status, accept) {
  return dispatch => {
    if (typeof accept === 'function' && !accept(status)) {
      return;
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




    var status_raw = JSON.stringify(status);

    var cosonativeabbvs = "en ar ast bg bn ca co cs cy da de el eo es eu fa fi fr ga gl he hi hr hu hy id io it ja ka kk ko lt lv ml ms nl no oc pl pt ro ru sk sl sq sr sv ta te th tr uk zh";

    var jtapiabbvs = "af sq am ar hy az eu be bn bs bg ca zh zh hr cs da nl af en eo et fi fr gl ka de el gu ht he hi hu is id ga it ja jv kn kk ko ky lo en la lv lt mk mg ms ml mt mi mr en mn ne no no fa pl pt pt pa pa ro ru gd sr si sk sl es es su sw sv tg ta te th tr uk ur uz vi cy yi";


    var status_orig = JSON.stringify(status);

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






   //detected = detected.slice(20);

    //detected = detected.slice(0, -6); 




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


    dispatch(importFetchedStatus(status));

    dispatch({
      type: TIMELINE_UPDATE,
      timeline,
      status,
    });



}

});

}

else {

    dispatch(importFetchedStatus(status));

    dispatch({
      type: TIMELINE_UPDATE,
      timeline,
      status,
    });
}



} 

else {

    dispatch(importFetchedStatus(status));

    dispatch({
      type: TIMELINE_UPDATE,
      timeline,
      status,
    });
}



    
    

  };
};

export function deleteFromTimelines(id) {
  return (dispatch, getState) => {
    const accountId  = getState().getIn(['statuses', id, 'account']);
    const references = getState().get('statuses').filter(status => status.get('reblog') === id).map(status => [status.get('id'), status.get('account')]);
    const reblogOf   = getState().getIn(['statuses', id, 'reblog'], null);

    dispatch({
      type: TIMELINE_DELETE,
      id,
      accountId,
      references,
      reblogOf,
    });
  };
};

export function clearTimeline(timeline) {
  return (dispatch) => {
    dispatch({ type: TIMELINE_CLEAR, timeline });
  };
};

const noOp = () => {};

const parseTags = (tags = {}, mode) => {
  return (tags[mode] || []).map((tag) => {
    return tag.value;
  });
};

export function expandTimeline(timelineId, path, params = {}, done = noOp) {
  return (dispatch, getState) => {
    const timeline = getState().getIn(['timelines', timelineId], ImmutableMap());
    const isLoadingMore = !!params.max_id;

    if (timeline.get('isLoading')) {
      done();
      return;
    }

    if (!params.max_id && !params.pinned && timeline.get('items', ImmutableList()).size > 0) {
      params.since_id = timeline.getIn(['items', 0]);
    }

    const isLoadingRecent = !!params.since_id;

    dispatch(expandTimelineRequest(timelineId, isLoadingMore));

    api(getState).get(path, { params }).then(response => {
      const next = getLinks(response).refs.find(link => link.rel === 'next');
      dispatch(importFetchedStatuses(response.data));
      dispatch(expandTimelineSuccess(timelineId, response.data, next ? next.uri : null, response.code === 206, isLoadingRecent, isLoadingMore));
      done();
    }).catch(error => {
      dispatch(expandTimelineFail(timelineId, error, isLoadingMore));
      done();
    });
  };
};

export const expandHomeTimeline            = ({ maxId } = {}, done = noOp) => expandTimeline('home', '/api/v1/timelines/home', { max_id: maxId }, done);
export const expandPublicTimeline          = ({ maxId, onlyMedia } = {}, done = noOp) => expandTimeline(`public${onlyMedia ? ':media' : ''}`, '/api/v1/timelines/public', { max_id: maxId, only_media: !!onlyMedia }, done);
export const expandCommunityTimeline       = ({ maxId, onlyMedia } = {}, done = noOp) => expandTimeline(`community${onlyMedia ? ':media' : ''}`, '/api/v1/timelines/public', { local: true, max_id: maxId, only_media: !!onlyMedia }, done);
export const expandAccountTimeline         = (accountId, { maxId, withReplies } = {}) => expandTimeline(`account:${accountId}${withReplies ? ':with_replies' : ''}`, `/api/v1/accounts/${accountId}/statuses`, { exclude_replies: !withReplies, max_id: maxId });
export const expandAccountFeaturedTimeline = accountId => expandTimeline(`account:${accountId}:pinned`, `/api/v1/accounts/${accountId}/statuses`, { pinned: true });
export const expandAccountMediaTimeline    = (accountId, { maxId } = {}) => expandTimeline(`account:${accountId}:media`, `/api/v1/accounts/${accountId}/statuses`, { max_id: maxId, only_media: true });
export const expandListTimeline            = (id, { maxId } = {}, done = noOp) => expandTimeline(`list:${id}`, `/api/v1/timelines/list/${id}`, { max_id: maxId }, done);
export const expandHashtagTimeline         = (hashtag, { maxId, tags } = {}, done = noOp) => {
  return expandTimeline(`hashtag:${hashtag}`, `/api/v1/timelines/tag/${hashtag}`, {
    max_id: maxId,
    any:    parseTags(tags, 'any'),
    all:    parseTags(tags, 'all'),
    none:   parseTags(tags, 'none'),
  }, done);
};

export function expandTimelineRequest(timeline, isLoadingMore) {
  return {
    type: TIMELINE_EXPAND_REQUEST,
    timeline,
    skipLoading: !isLoadingMore,
  };
};

export function expandTimelineSuccess(timeline, statuses, next, partial, isLoadingRecent, isLoadingMore) {
  return {
    type: TIMELINE_EXPAND_SUCCESS,
    timeline,
    statuses,
    next,
    partial,
    isLoadingRecent,
    skipLoading: !isLoadingMore,
  };
};

export function expandTimelineFail(timeline, error, isLoadingMore) {
  return {
    type: TIMELINE_EXPAND_FAIL,
    timeline,
    error,
    skipLoading: !isLoadingMore,
  };
};

export function scrollTopTimeline(timeline, top) {
  return {
    type: TIMELINE_SCROLL_TOP,
    timeline,
    top,
  };
};

export function connectTimeline(timeline) {
  return {
    type: TIMELINE_CONNECT,
    timeline,
  };
};

export function disconnectTimeline(timeline) {
  return {
    type: TIMELINE_DISCONNECT,
    timeline,
  };
};
