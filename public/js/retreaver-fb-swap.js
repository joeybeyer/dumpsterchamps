/**
 * Retreaver DNI — Conditional Number Swap for Facebook Traffic
 * 
 * Loads AFTER fb-params-capture.js and the Retreaver base snippet.
 * Only swaps the phone number when traffic comes from Facebook.
 * Passes fbc, fbp, fbclid as Retreaver tags for webhook passthrough.
 *
 * CONFIGURATION REQUIRED:
 * 1. Replace YOUR_CAMPAIGN_ID with your Retreaver campaign ID
 * 2. Replace +1XXXXXXXXXX with your dedicated Facebook tracking number
 * 3. Replace .phone-number with the CSS selector for your phone number elements
 */
(function () {
  'use strict';

  // Wait for Retreaver to be available
  function initRetreaver() {
    if (typeof Retreaver === 'undefined') {
      setTimeout(initRetreaver, 100);
      return;
    }

    // ============================================
    // CONFIGURE THESE VALUES
    // ============================================
    var CAMPAIGN_ID = 'YOUR_CAMPAIGN_ID';           // Retreaver campaign ID
    var FB_TRACKING_NUMBER = '+1XXXXXXXXXX';         // Dedicated FB tracking number
    var PHONE_SELECTOR = '.phone-number, a[href^="tel:"]'; // CSS selector for phone elements
    // ============================================

    var fbParams = window.DC_FB_PARAMS || {};

    Retreaver.Campaign.find(CAMPAIGN_ID, function (campaign) {
      if (fbParams.isFacebookTraffic) {
        // Facebook traffic — swap to tracking number with FB tags
        var tags = {
          source: 'facebook_retargeting',
          fb_fbclid: fbParams.fbclid,
          fb_fbc: fbParams.fbc,
          fb_fbp: fbParams.fbp,
          utm_campaign: fbParams.utm_campaign,
          utm_content: fbParams.utm_content
        };

        // Remove empty tags (Retreaver doesn't need blank values)
        Object.keys(tags).forEach(function (key) {
          if (!tags[key]) delete tags[key];
        });

        campaign.auto_replace_numbers({
          default_number_replacement: FB_TRACKING_NUMBER,
          selector: PHONE_SELECTOR,
          tags: tags
        });
      } else {
        // Non-Facebook traffic — normal Retreaver behavior
        campaign.auto_replace_numbers({
          selector: PHONE_SELECTOR
        });
      }
    });
  }

  // Kick off once DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initRetreaver);
  } else {
    initRetreaver();
  }
})();
