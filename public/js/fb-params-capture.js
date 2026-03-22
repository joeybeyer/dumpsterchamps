/**
 * Facebook Parameter Capture for DumpsterChamps
 * 
 * Captures fbclid from URL, _fbc and _fbp cookies from Facebook Pixel,
 * and utm parameters. Stores in sessionStorage for Retreaver tag injection.
 * 
 * INSTALLATION: Add this script AFTER the Facebook Pixel snippet 
 * and BEFORE the Retreaver snippet in your page <head>.
 * 
 * For DumpsterChamps (Next.js/Vercel), add to _document.js or layout.tsx <Head>.
 * For static HTML pages, add as <script src="/js/fb-params-capture.js"></script>
 */
(function () {
  'use strict';

  // Parse URL parameters
  var urlParams = new URLSearchParams(window.location.search);

  // Capture fbclid from URL (present when user clicks a Facebook ad)
  var fbclid = urlParams.get('fbclid');

  // Read Facebook cookies
  // _fbc = click ID cookie (set by Pixel when fbclid is in URL)
  // _fbp = browser ID cookie (set by Pixel on first visit)
  function getCookie(name) {
    var match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    return match ? match[2] : null;
  }

  var fbc = getCookie('_fbc');
  var fbp = getCookie('_fbp');

  // Capture UTM parameters
  var utmSource = urlParams.get('utm_source');
  var utmMedium = urlParams.get('utm_medium');
  var utmCampaign = urlParams.get('utm_campaign');
  var utmContent = urlParams.get('utm_content');

  // Store in sessionStorage (persists across page navigations within session)
  if (fbclid) sessionStorage.setItem('fb_fbclid', fbclid);
  if (fbc) sessionStorage.setItem('fb_fbc', fbc);
  if (fbp) sessionStorage.setItem('fb_fbp', fbp);
  if (utmSource) sessionStorage.setItem('utm_source', utmSource);
  if (utmMedium) sessionStorage.setItem('utm_medium', utmMedium);
  if (utmCampaign) sessionStorage.setItem('utm_campaign', utmCampaign);
  if (utmContent) sessionStorage.setItem('utm_content', utmContent);

  // If _fbc cookie isn't set yet but we have fbclid, construct it
  // Format: fb.1.{timestamp}.{fbclid}
  if (!fbc && fbclid) {
    var constructedFbc = 'fb.1.' + Date.now() + '.' + fbclid;
    sessionStorage.setItem('fb_fbc', constructedFbc);
  }

  // Expose a global helper for Retreaver integration
  window.DC_FB_PARAMS = {
    fbclid: sessionStorage.getItem('fb_fbclid') || '',
    fbc: sessionStorage.getItem('fb_fbc') || '',
    fbp: sessionStorage.getItem('fb_fbp') || '',
    utm_source: sessionStorage.getItem('utm_source') || '',
    utm_medium: sessionStorage.getItem('utm_medium') || '',
    utm_campaign: sessionStorage.getItem('utm_campaign') || '',
    utm_content: sessionStorage.getItem('utm_content') || '',
    isFacebookTraffic: (sessionStorage.getItem('utm_source') || '').toLowerCase() === 'facebook'
  };

  // Debug logging (remove in production or set to false)
  var DEBUG = false;
  if (DEBUG && window.DC_FB_PARAMS.isFacebookTraffic) {
    console.log('[DC-FB] Facebook traffic detected:', window.DC_FB_PARAMS);
  }
})();
