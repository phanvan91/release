import configApi from 'config/api'
/**
 * This function is same as PHP's nl2br() with default parameters.
 *
 * @param {string} str Input text
 * @param {boolean} replaceMode Use replace instead of insert
 * @param {boolean} isXhtml Use XHTML 
 * @return {string} Filtered text
 */
export function nl2br (str, replaceMode, isXhtml) {

  var breakTag = (isXhtml) ? '<br />' : '<br>';
  var replaceStr = (replaceMode) ? '$1'+ breakTag : '$1'+ breakTag +'$2';
  return (str + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, replaceStr);
}

/**
 * This function inverses text from PHP's nl2br() with default parameters.
 *
 * @param {string} str Input text
 * @param {boolean} replaceMode Use replace instead of insert
 * @return {string} Filtered text
 */
export function br2nl (str, replaceMode) {   
  
  var replaceStr = (replaceMode) ? "\n" : '';
  // Includes <br>, <BR>, <br />, </br>
  // eslint-disable-next-line
  return str.replace(/<\s*\/?br\s*[\/]?>/gi, replaceStr);
}

export const generateReleaseLink = release => {
  if (!release || !release.id) {
    return ''
  }
  let bundle = release.bundle // JSON.parse(release.bundle)
  if (!bundle) {
    return ''
  }
  let link = ''

  if (release.platform === 'android') {
    link = configApi.url + bundle.apk;
  }

  if (release.platform === 'windows') {
    link = configApi.url + bundle.apk;
  }

  if (release.platform === 'ios') {
    link = `itms-services://?action=download-manifest&url=${configApi.url}${bundle.plist}`;
  }

  return link
}

/**
 * get 2 character of string
 *
 * @param {string} str Input text
 * @return {string} Filtered text
 */
export const generateUsernameIcon = name => {
  if (!name) {
    return 'EW'
  }
  let matches = name.match(/\b(\w)/g).join('');
  if (matches.length === 1) {
    matches = name
  }

  return matches.slice(0, 2).toUpperCase()
}
