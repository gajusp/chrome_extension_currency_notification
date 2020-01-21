// Copyright (c) 2011 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

var thresholdValue = 95;

/*
  Displays a notification with the Currency. Requires "notifications"
  permission in the manifest file (or calling
  "Notification.requestPermission" beforehand).
*/
function show(currencyStr) {
  new Notification(`GBP to INR ---> ${currencyStr}`, {
    icon: 'inr.png',
    body: ``
  });
}

// Test for notification support.
if (window.Notification) {
  setInterval(function() {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://api.exchangeratesapi.io/latest?base=GBP&symbols=INR', true);
    xhr.onreadystatechange = function() {
      console.log('Currency response ---', xhr.response);
      let result = xhr.response && JSON.parse(xhr.response);
      if (result && result.rates.INR) {
        const currency = Number(result.rates.INR).toFixed(2);
        Number(currency) > thresholdValue && show(currency);
      }
    };
    xhr.send();
  }, 6000);
}
