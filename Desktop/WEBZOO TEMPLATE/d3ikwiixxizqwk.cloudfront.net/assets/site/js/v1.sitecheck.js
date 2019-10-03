
var namefieldval;
var phonefieldval;
var gdprfieldval;
var country;
var subdomain;
var white_list_array;
var whitelist_boolean;
var brand;
var reportSettingData;
var blackurl = false;
var emailblock = false;
var jsonRespone;
var reporturl;
subdomain = document.getElementById("growthrobo").getAttribute("data-content");

if (subdomain == null) {
  subdomain = document.getElementById("growthrobo").src.match(/\d/g).join("");
}
webaddress = window.location.href;


document.addEventListener("DOMContentLoaded", function (event) {

  var embedDataRequest = fetch('https://backend.growthrobotics.info/core/api/v1/capi/c/embed-setting/?domain=' + subdomain).then(function (response) {
    return response.json()
  });
  var landingDataRequest = fetch('https://backend.growthrobotics.info/core/api/v1/capi/c/landing-page-setting/?url=' + subdomain + '.growthrobotics.com').then(function (response) {
    return response.json()
  });

  var combinedData = { "embedDataRequest": {}, "landingDataRequest": {} };
  Promise.all([embedDataRequest, landingDataRequest]).then(function (values) {
    combinedData["embedDataRequest"] = values[0].embedSetting;
    combinedData["landingDataRequest"] = values[1].landingPage;
    embedData = values[0].embedSetting;
    reporturl = values[0].reportURL;
    reportSettingData = values[1].reportManager;
    myFunc(values[0].embedSetting,values[1].plan.id);
  });
});

  function get_browser() {
    var ua = navigator.userAgent, tem, M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
    if (/trident/i.test(M[1])) {
      tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
      return "IE";
      // { name: 'IE', version: (tem[1] || '') };
    }
    if (M[1] === 'Chrome') {
      tem = ua.match(/\bOPR|Edge\/(\d+)/)
      if (tem != null) { return "Opera"; }
    }
    M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, '-?'];
    if ((tem = ua.match(/version\/(\d+)/i)) != null) { M.splice(1, 1, tem[1]); }
    return M[0];
  }
  
function myFunc(myObj,planSetting) {

  if (myObj != null) {
    var btncolor = myObj.css.buttonColor;
    var btntext = myObj.title.buttonText;
    var btntxtcolor = myObj.css.buttonTextColor;
    var btnfontfamily = myObj.css.buttonFontfamily;
    var alignment = myObj.title.formalignment;
    var namefieldval = '';
    var phonefieldval = '';
    var companyfieldval = '';
    var companyfield = '';

    if (myObj.css.fieldArray.length != 0) {

      for (let i = 0; i < myObj.css.fieldArray.length; i++) {

        if (myObj.css.fieldArray[i].label == 'PHONE') {
          phonefieldval = myObj.css.fieldArray[i].label;
          break;
        } else {
          phonefieldval = '';
        }
      }

      for (let i = 0; i < myObj.css.fieldArray.length; i++) {

        if (myObj.css.fieldArray[i].label == 'NAME') {
          namefieldval = myObj.css.fieldArray[i].label;
          break;
        } else {
          namefieldval = '';
        }
      }

      for (let i = 0; i < myObj.css.fieldArray.length; i++) {

        if (myObj.css.fieldArray[i].label == 'COMPANY') {
          companyfieldval = myObj.css.fieldArray[i].label;
          var companyfield = '<input type="text" name="robocompany" placeholder="COMPANY" id="robocompany"><br>';
          break;
        } else {
          companyfieldval = '';
          var companyfield = '';
        }
      }
      // if (myObj.css.fieldArray[0].label == 'NAME') {
      //   namefieldval = myObj.css.fieldArray[0].label;
      // }
      // if (myObj.css.fieldArray[0].label == 'PHONE') {
      //   phonefieldval = myObj.css.fieldArray[0].label;
      // }


      // if (myObj.css.fieldArray.length > 1) {
      //   if (myObj.css.fieldArray[1].label == 'NAME') {
      //     namefieldval = myObj.css.fieldArray[1].label;
      //   }
      //   if (myObj.css.fieldArray[1].label == 'PHONE') {
      //     phonefieldval = myObj.css.fieldArray[1].label;
      //   }
      // }
    }


  } else {

    var btncolor = '#f44336';
    var btntext = 'Audit My URL';
    var btntxtcolor = '#ffffff';
    var alignment = 'horizontal';
    var namefieldval = '';
    var phonefieldval = '';
    var companyfieldval = '';
    var companyfield = '';
  }

  // if (myObj.css.fieldArray.length != 0) {
  //   for (let i = 0; i < myObj.css.fieldArray.length; i++) {

  //     if (myObj.css.fieldArray[i].label == 'COMPANY') {
  //       var companyfield = '<input type="text" name="robocompany" placeholder="COMPANY" id="robocompany"><br>';
  //       break;
  //     } else {
  //       var companyfield = '';
  //     }
  //   }
  // }

  if (alignment == 'ALLHORIZONTAL') {

    if (namefieldval == 'NAME' && phonefieldval == 'PHONE' && companyfieldval == 'COMPANY') {
      namefield = '<input type="text" name="roboname" placeholder="' + myObj.css.fieldArray[0].value + '" id="roboname">';
      phonefield = '<input type="tel" name="robophone" placeholder="' + myObj.css.fieldArray[1].value + '" id="robophone">';
      companyfield = '<input type="text" name="robocompany" placeholder="' + myObj.css.fieldArray[2].value + '" id="robocompany"><br>';
    }
    else if (namefieldval == 'NAME' && phonefieldval == 'PHONE' && companyfieldval == '') {
      namefield = '<input type="text" name="roboname" placeholder="' + myObj.css.fieldArray[0].value + '" id="roboname">';
      phonefield = '<input type="tel" name="robophone" placeholder="' + myObj.css.fieldArray[1].value + '" id="robophone"><br>';
      companyfield = '';
    } else if (namefieldval == 'NAME' && phonefieldval == '' && companyfieldval == 'COMPANY') {
      namefield = '<input type="text" name="roboname" placeholder="' + myObj.css.fieldArray[0].value + '" id="roboname">';
      phonefield = '';
      companyfield = '<input type="text" name="robocompany" placeholder="' + myObj.css.fieldArray[1].value + '" id="robocompany"><br>';
    } else if (namefieldval == 'NAME' && phonefieldval == '' && companyfieldval == '') {
      namefield = '<input type="text" name="roboname" placeholder="' + myObj.css.fieldArray[0].value + '" id="roboname">';
      phonefield = '';
      companyfield = '';
    } else if (namefieldval == '' && phonefieldval == 'PHONE' && companyfieldval == '') {
      namefield = '';
      phonefield = '<input type="tel" name="robophone" placeholder="' + myObj.css.fieldArray[0].value + '" id="robophone">';
      companyfield = '';
    } else if (namefieldval == '' && phonefieldval == 'PHONE' && companyfieldval == 'COMPANY') {
      namefield = '';
      phonefield = '<input type="tel" name="robophone" placeholder="' + myObj.css.fieldArray[0].value + '" id="robophone">';
      companyfield = '<input type="text" name="robocompany" placeholder="' + myObj.css.fieldArray[1].value + '" id="robocompany"><br>';
    } else if (namefieldval == '' && phonefieldval == '' && companyfieldval == 'COMPANY') {
      namefield = '';
      phonefield = '';
      companyfield = '<input type="text" name="robocompany" placeholder="' + myObj.css.fieldArray[0].value + '" id="robocompany">';
    } else if (namefieldval == '' && phonefieldval == '' && companyfieldval == '') {
      namefield = '';
      phonefield = '';
      companyfield = '';
    }

  } else if (alignment == 'HORIZONTAL' || alignment == 'VERTICAL') {

    if (namefieldval == 'NAME' && phonefieldval == 'PHONE' && companyfieldval == 'COMPANY') {
      namefield = '<br><input type="text" name="roboname" placeholder="' + myObj.css.fieldArray[0].value + '" id="roboname"><br>';
      phonefield = '<input type="tel" name="robophone" placeholder="' + myObj.css.fieldArray[1].value + '" id="robophone"><br>';
      companyfield = '<input type="text" name="robocompany" placeholder="' + myObj.css.fieldArray[2].value + '" id="robocompany"><br>';
    }
    else if (namefieldval == 'NAME' && phonefieldval == 'PHONE' && companyfieldval == '') {
      namefield = '<br><input type="text" name="roboname" placeholder="' + myObj.css.fieldArray[0].value + '" id="roboname"><br>';
      phonefield = '<input type="tel" name="robophone" placeholder="' + myObj.css.fieldArray[1].value + '" id="robophone"><br>';
      companyfield = '';
    } else if (namefieldval == 'NAME' && phonefieldval == '' && companyfieldval == 'COMPANY') {
      namefield = '<br><input type="text" name="roboname" placeholder="' + myObj.css.fieldArray[0].value + '" id="roboname"><br>';
      phonefield = '';
      companyfield = '<input type="text" name="robocompany" placeholder="' + myObj.css.fieldArray[1].value + '" id="robocompany"><br>';
    } else if (namefieldval == 'NAME' && phonefieldval == '' && companyfieldval == '') {
      namefield = '<br><input type="text" name="roboname" placeholder="' + myObj.css.fieldArray[0].value + '" id="roboname"><br>';
      phonefield = '';
      companyfield = '';
    } else if (namefieldval == '' && phonefieldval == 'PHONE' && companyfieldval == '') {
      namefield = '';
      phonefield = '<br><input type="tel" name="robophone" placeholder="' + myObj.css.fieldArray[0].value + '" id="robophone"><br>';
      companyfield = '';
    } else if (namefieldval == '' && phonefieldval == 'PHONE' && companyfieldval == 'COMPANY') {
      namefield = '';
      phonefield = '<br><input type="tel" name="robophone" placeholder="' + myObj.css.fieldArray[0].value + '" id="robophone"><br>';
      companyfield = '<input type="text" name="robocompany" placeholder="' + myObj.css.fieldArray[1].value + '" id="robocompany"><br>';
    } else if (namefieldval == '' && phonefieldval == '' && companyfieldval == 'COMPANY') {
      namefield = '';
      phonefield = '';
      companyfield = '<br><input type="text" name="robocompany" placeholder="' + myObj.css.fieldArray[0].value + '" id="robocompany"><br>';
    } else if (namefieldval == '' && phonefieldval == '' && companyfieldval == '') {
      namefield = '';
      phonefield = '';
      companyfield = '';
    }

  } else {
    namefield = '';
    phonefield = '';
    companyfield = '';
  }

  if (myObj.css.fieldArray.length == 0) {
    brand_horizontal = '#brandgrowth {margin-left:-12% !important;}';
  } else {
    brand_horizontal = '';
  }

  if (myObj.title.title == 'undefined' || myObj.title.title == null) {
    var title = '';

  } else {
    var title = myObj.title.title;
  }

  if (planSetting < 3) {
    pbrand = '<p id="brandgrowth"><a href="https://growthrobotics.com" target="_blank">Powered by RoboAuditor</a></p>';
  } else {
    pbrand = '';
  }

  var margincss = myObj.isMargin;

  if (!margincss) {
    addingmargin = '';
  }
  else if (margincss && alignment == 'VERTICAL' && namefieldval == '' && phonefieldval == '') {
    addingmargin = '#roboaudit {border: 1px solid #D3D3D3;width:400px;max-width:100%;}';
  }
  else if (margincss && alignment == 'VERTICAL') {
    addingmargin = '#roboaudit {border: 1px solid #D3D3D3;width:400px;max-width:100%;}';
  }
  else if (margincss && alignment == 'ALLHORIZONTAL') {
    if (namefieldval == 'NAME' && phonefieldval == '' && companyfield == '') {
      addingmargin = '#roboaudit {border: 1px solid #D3D3D3;width:1180px;max-width:98%;}';
    }
    else if (namefieldval == '' && phonefieldval == 'PHONE' && companyfield == '') {
      addingmargin = '#roboaudit {border: 1px solid #D3D3D3;width:1180px;max-width:98%;}';
    }
    else if (namefieldval == '' && phonefieldval == '' && companyfield != '') {
      addingmargin = '#roboaudit {border: 1px solid #D3D3D3;width:1180px;max-width:98%;}';
    } else if (namefieldval != '' && phonefieldval != '' && companyfield != '') {
      addingmargin = '#roboaudit {border: 1px solid #D3D3D3;width:1180px;max-width:98%;}';
    } else {
      addingmargin = '#roboaudit {border: 1px solid #D3D3D3;width:650px;max-width:100%;}';
    }
  }
  else if (margincss && namefieldval == '' && phonefieldval == '') {
    addingmargin = '#roboaudit {border: 1px solid #D3D3D3;width:850px;max-width:100%;padding-bottom:20px;}';
  }
  else {
    addingmargin = '#roboaudit {border: 1px solid #D3D3D3;width:630px;max-width:100%;}';
  }


  if (myObj.isGdpr) {
    var addgdpr = myObj.isGdpr;
    var gdprmsg = myObj.gdprMessage;
  }
  else {
    var addgdpr = false;
    var gdprmsg = '';
  }


  if (myObj.isGdpr && myObj.gdprMessage != '') {
    gdprfield = '<div id="roboauditchecks"><input type="checkbox" name="robocheckbox"  id="robocheckbox"  ><p>' + gdprmsg + '</p></div>';
  }
  else if (myObj.isGdpr && myObj.gdprMessage == '') {
    gdprfield = '<div id="roboauditchecks"><input type="checkbox" name="robocheckbox"  id="robocheckbox"  ><p>The information you provide on this form will be used to be in touch with you and to provide updates and marketing.</p></div>';
  }
  else {
    gdprfield = '';
  }

  if (alignment == 'HORIZONTAL') {
    var html = '<form><center><h1 id="roboaudithead"><span>' + title + '</span></h1><input type="url" name="website" placeholder="' + myObj.title.url + '" id="website"><input type="email" name="email" placeholder="' + myObj.title.email + '" class="roboemail" id="email">' + namefield + '' + phonefield + '' + companyfield + '<button id="roboauditsearch" type="button" onclick="qrystrng()"> <span>' + btntext + '</span> </button>' + pbrand + '' + gdprfield + ' <div id="robomsg"></div><h3 id="whitelist_error" style="display:none;color:black">You cant audit this website</h3><h3 id="blackemail_error" style="display:none;color:black">Something is wrong is with Email Address. Please provide a business email address or a valid email address. </h3></center></form>';
    var css = document.createTextNode('#roboaudithead{font-family:' + myObj.css.titleFontfamily + ';font-size: 36px;font-weight: 500;color:' + myObj.css.titleColor + '}' + addingmargin + '#roboaudit input{margin:0.5em; font-size:14px; border-style:solid;text-indent: 0px; border: 1px solid #ddd !important; border-radius: 4px; height: 53px !important; min-width:300px !important;width: 300px !important;background-color: #fff;color:black; text-align: left; padding-left:1em !important;display:initial !important;box-sizing: border-box!important;} #roboaudit button{margin:3px; padding:8px 10px; height: 53px;min-width:150px;border-radius: 4px;font-size: 14px;border:none;background:' + btncolor + ';background-color:' + btncolor + ';color: ' + btntxtcolor + ';float:inherit;}#roboaudit input::placeholder {color: #a9a9a9;} #roboauditsearch{ font-family:' + myObj.css.buttonFontfamily + '} #robomsg{margin-top: 1em;font-family: "open-sans",sans-serif;font-size: 20px;}#roboauditchecks input{cursor:pointer;float:left;height: 20px !important;min-width: 20px !important;width: 20px !important;margin-top:10px!important;}#roboauditchecks p{padding-left:14px !important;text-align:justify!important;font-size:13px!important;font-family:open Sans, sans-serif!important;line-height:1.6!important;margin-top:5px!important;}#roboauditchecks{max-width:425px;display:flex;padding-right:5px;}#roboaudit #brandgrowth{font-size:12px!important;font-family: open Sans, sans-serif!important;margin:0;font-weight:700;color:' + btncolor + ' !important;}' + brand_horizontal + '#brandgrowth a{text-decoration:none;color:' + btncolor + ' !important;}');
  }
  else if (alignment == 'ALLHORIZONTAL') {
    var html = '<form><center><h1 id="roboaudithead"><span>' + title + '</span></h1><input type="url" name="website" placeholder="' + myObj.title.url + '" id="website"><input type="email" name="EMAIL" class="roboemail" placeholder="' + myObj.title.email + '" id="email">' + namefield + '' + phonefield + '' + companyfield + '<button id="roboauditsearch" type="button" onclick="qrystrng()"> <span>' + btntext + '</span> </button>' + pbrand + '' + gdprfield + ' <div id="robomsg"></div><h3 id="whitelist_error" style="display:none;color:black">You cant audit this website</h3><h3 id="blackemail_error" style="display:none;color:black">Something is wrong is with Email Address. Please provide a business email address or a valid email address. </h3></center></form>';
    var css = document.createTextNode('#roboaudithead{font-family:' + myObj.css.titleFontfamily + ';font-size: 36px;font-weight: 500;color:' + myObj.css.titleColor + '}' + addingmargin + '#roboaudit input{margin:0.5em; font-size:14px; border-style:solid;text-indent: 0px; border: 1px solid #ddd !important; border-radius: 4px; height: 53px !important; min-width:300px !important;width: 300px;background-color: #fff;color:black; text-align: left; padding-left:1em !important;display:initial !important;box-sizing: border-box!important;} #roboaudit button{margin:3px; padding:8px 10px; height: 53px;min-width:150px;border-radius: 4px;font-size: 14px;border:none;background:' + btncolor + ';background-color:' + btncolor + ';color: ' + btntxtcolor + ';float:inherit;}#roboaudit input::placeholder {color: #a9a9a9;} #roboauditsearch{ font-family:' + myObj.css.buttonFontfamily + '}  #robomsg{margin-top: 1em;font-family: "open-sans",sans-serif;font-size: 20px;}#roboauditchecks input{cursor:pointer;float:left;height: 20px !important;min-width: 20px !important;width: 20px !important;margin-top:10px!important;}#roboauditchecks p{padding-left:14px !important;text-align:justify!important;font-size:13px!important;font-family:open Sans, sans-serif!important;line-height:1.6!important;margin-top:5px!important;}#roboauditchecks{max-width:425px;display:flex;padding-right:5px;}#roboaudit #brandgrowth{font-size:12px!important;font-family: open Sans, sans-serif!important;margin:0;font-weight:700;color:' + btncolor + ' !important;}#brandgrowth a{text-decoration:none;color:' + btncolor + ' !important;}');
  }
  else {
    var html = '<form><center><h1 id="roboaudithead"><span>' + title + '</span></h1><input type="url" name="website" placeholder="' + myObj.title.url + '" id="website"><br><input type="email" name="email" class="roboemail" placeholder="' + myObj.title.email + '" id="email">' + namefield + '' + phonefield + '' + companyfield + '<br><button id="roboauditsearch" type="button" onclick="qrystrng()"> <span>' + btntext + '</span> </button>' + pbrand + '' + gdprfield + ' <div id="robomsg"></div><h3 id="whitelist_error" style="display:none;color:black">You cant audit this website</h3><h3 id="blackemail_error" style="display:none;color:black">Something is wrong is with Email Address. Please provide a business email address or a valid email address. </h3></center></form>';
    var css = document.createTextNode('#roboaudithead{font-family:' + myObj.css.titleFontfamily + ';font-size: 36px;font-weight: 500;color:' + myObj.css.titleColor + '}' + addingmargin + '#roboaudit input{margin:0.5em; font-size:14px; border-style:solid; text-indent: 0px;border: 1px solid #ddd !important; border-radius: 4px; height: 53px !important; min-width:300px !important;width: 300px !important;background-color: #fff;color:black; text-align: left; padding-left:1em !important;display:initial !important;box-sizing: border-box!important;} #roboaudit button{margin:3px; padding:8px 10px; height: 53px;min-width:150px;border-radius: 4px;font-size: 14px;border:none;background:' + btncolor + ';background-color:' + btncolor + ';color: ' + btntxtcolor + ';float:inherit;}#roboaudit input::placeholder {color: #a9a9a9;} #roboauditsearch{ font-family:' + myObj.css.buttonFontfamily + '}  #robomsg{margin-top: 1em;font-family: "open-sans",sans-serif;font-size: 20px;}#roboauditchecks input{cursor:pointer;float:left;height: 20px !important;min-width: 20px !important;width: 20px !important;margin-top:10px!important;}#roboauditchecks p{padding-left:14px !important;text-align:justify!important;font-size:13px!important;font-family:open Sans, sans-serif!important;line-height:1.6!important;margin-top:5px!important;}#roboauditchecks{max-width:425px;display:flex;padding-right:5px;}#roboaudit #brandgrowth{font-size:12px!important;font-family: open Sans, sans-serif!important;margin:0;font-weight:700;color:' + btncolor + '! important;}#brandgrowth a{text-decoration:none;color:' + btncolor + ' !important;}');
  }
  var x = document.createElement("STYLE");

  x.appendChild(css);
  document.head.appendChild(x);


  document.getElementById("roboaudit").innerHTML = html;
  //document.getElementById("demo").innerHTML =btncolor;

  var nameinput = document.getElementById("roboname");
  var phoneinput = document.getElementById("robophone");
  var companyinput = document.getElementById("robocompany");

  if (nameinput != null) {
    if (myObj.css.fieldArray[0].required) {
      nameinput.setAttribute("required", "");
      nameinput.required = true;
    }
  }
  if (myObj.css.fieldArray.length == 1) {
    if (myObj.css.fieldArray[0].label == "PHONE") {
      if (phoneinput != null) {
        if (myObj.css.fieldArray[0].required) {
          phoneinput.setAttribute("required", "");
          phoneinput.required = true;
        }
      }
    } else if (myObj.css.fieldArray[0].label == "COMPANY") {
      if (companyinput != null) {
        if (myObj.css.fieldArray[0].required) {
          companyinput.setAttribute("required", "");
          companyinput.required = true;
        }
      }
    }
  } else if (myObj.css.fieldArray.length == 2) {

    if (myObj.css.fieldArray[0].label == "PHONE") {
      if (phoneinput != null) {
        if (myObj.css.fieldArray[0].required) {
          phoneinput.setAttribute("required", "");
          phoneinput.required = true;
        }
      }
    } else if (myObj.css.fieldArray[1].label == "PHONE") {
      if (phoneinput != null) {
        if (myObj.css.fieldArray[1].required) {
          phoneinput.setAttribute("required", "");
          phoneinput.required = true;
        }
      }
    }

    if (myObj.css.fieldArray[0].label == "COMPANY") {
      if (companyinput != null) {
        if (myObj.css.fieldArray[0].required) {
          companyinput.setAttribute("required", "");
          companyinput.required = true;
        }
      }
    } else if (myObj.css.fieldArray[1].label == "COMPANY") {
      if (companyinput != null) {
        if (myObj.css.fieldArray[1].required) {
          companyinput.setAttribute("required", "");
          companyinput.required = true;
        }
      }
    }

  } else if (myObj.css.fieldArray.length == 3) {

    if (myObj.css.fieldArray[1].label == "PHONE") {
      if (phoneinput != null) {
        if (myObj.css.fieldArray[1].required) {
          phoneinput.setAttribute("required", "");
          phoneinput.required = true;
        }
      }
    }

    if (myObj.css.fieldArray[2].label == "COMPANY") {
      if (companyinput != null) {
        if (myObj.css.fieldArray[2].required) {
          companyinput.setAttribute("required", "");
          companyinput.required = true;
        }
      }
    }

  }
}


function qrystrng() {
  blackurl = false;
  document.getElementById('whitelist_error').style.display = "none";
  var scheckweb = document.getElementById("website").value;
  var res = scheckweb.charAt(scheckweb.length-1);
    if(res == "/") {
      scheckweb = scheckweb.slice(0, -1);
    }
  website = encodeURIComponent(scheckweb);
  // website = encodeURIComponent(document.getElementById("website").value);
  email = encodeURIComponent(document.getElementById("email").value);
  //var name=encodeURIComponent (document.getElementById("roboname").value);
  //var phone=encodeURIComponent (document.getElementById("robophone").value);
  var nameinput = document.getElementById("roboname");
  var phoneinput = document.getElementById("robophone");
  var companyinput = document.getElementById("robocompany");
  var checkinput = document.getElementById("robocheckbox");

  if ( /^(http[s]?:\/\/){0,1}(www\.){0,1}[a-zA-Z0-9\.\-]+\.[a-zA-Z]{2,5}[\.]{0,1}/i.test(document.getElementById("website").value)) {
  } else {
    alert("Please Enter a valid website!");
    return false;
  }

  if (document.getElementById("roboaudit").contains(nameinput) && document.getElementById("roboaudit").contains(phoneinput)) {
    name = encodeURIComponent(document.getElementById("roboname").value);
    phone = encodeURIComponent(document.getElementById("robophone").value);
  }
  else if (document.getElementById("roboaudit").contains(nameinput)) {
    name = encodeURIComponent(document.getElementById("roboname").value);
    phone = '';
  }
  else if (document.getElementById("roboaudit").contains(phoneinput)) {
    name = '';
    phone = encodeURIComponent(document.getElementById("robophone").value);
  }
  else {
    phone = '';
    name = '';
  }

  if (document.getElementById("roboaudit").contains(companyinput)) {
    companyval = encodeURIComponent(document.getElementById("robocompany").value);
  } else {
    companyval = '';
  }


  if (gdprfield != '') {
    if (document.getElementById("robocheckbox").checked == true) {
      var gdprcheckbox = 1;
    }

  }

  flag = 1;
  if (gdprfield != '' && gdprcheckbox != 1) {
    alert("You must agree to terms and conditions to continue");

    return false;
  }


  if (website == '' || email == '') {
    alert("Please enter website and email");

    return false;
  }

  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,15})+$/.test(document.getElementsByClassName("roboemail")[0].value)) {
    // alert('Email is validated');
  } else {
    alert("Please Enter a valid email address!");
    return false;
  }

  if (nameinput != null) {
    if (nameinput.hasAttribute('required')) {
      if (nameinput.value === "") {
        alert("Please Enter a name!");
        return false;
      }

    }
  }
  if (phoneinput != null) {
    if (phoneinput.hasAttribute('required')) {
      if (phoneinput.value === "") {
        alert("Please Enter Phone!");
        return false;
      }

    }
  }
  if (companyinput != null) {
    if (companyinput.hasAttribute('required')) {
      if (companyinput.value === "") {
        alert("Please Enter a Company!");
        return false;
      }
    }
  }

  // if (subdomain == 1) {
  //   subdomain = 'app';
  // }

  var leadurl = "https://backend.growthrobotics.info/core/api/v1/capi/c/lead";
  var xhr = new XMLHttpRequest();
  xhr.open("POST", leadurl, true);
  xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
  xhr.onload = function () {
    if (xhr.status == "403") {
      // alert(xhr.responseText);
      document.getElementById('blackemail_error').style.display = "block";
      return false;
    }
    var jsonRespone = JSON.parse(xhr.responseText);
    if (xhr.readyState == 4 && xhr.status == "200") {
      if (pbrand != '') {
        document.getElementById("robomsg").innerHTML = "Thank you for your request. We will get back to you soon";
        return false;
      }
      // website = decodeURIComponent(website).replace(/^((\w+:)?\/\/[^\/]+\/?).*$/,'$1');
      website = decodeURIComponent(website);
      website = (website.indexOf('://') === -1) ? 'http://' + website : website;
      reporturl = (reporturl.indexOf('://') === -1) ? 'http://' + reporturl : reporturl;
      if (subdomain == null) {
        subdomain = document.getElementById("growthrobo").getAttribute("data-content");
        var url = reporturl + "/report?domain=" + website;
      } else {
        var url = reporturl + "/report?domain=" + website;
      }

      if (reportSettingData.whitelistRadio && reportSettingData.whitelistUrls.length > 0) {
          var pattern = /(.+:\/\/)?([^\/]+)(\/.*)*/i;
          var web = decodeURIComponent(website);
          var arr = pattern.exec(web);
          var final_website = arr[2].replace(/^(?:https?:\/\/)?(?:www\.)?/i, "").split('/')[0];
          for (var i = 0; i < reportSettingData.whitelistUrls.length; i++) {
            var temp = (reportSettingData.whitelistUrls[i]).replace(/^(?:https?:\/\/)?(?:www\.)?/i, "").split('/')[0];
            if (final_website == temp) {
              blackurl = true;
              break;
            }
          }
          if (blackurl) {
            document.getElementById('whitelist_error').style.display = "block";
            return false;
          }
        }

      if (reportSettingData.viewReport == 1) {
        document.getElementById("robomsg").innerHTML = reportSettingData.indexResponseMessage;
        if (reportSettingData.redirectUrlTime == '' || reportSettingData.redirectUrlTime == ' ' || reportSettingData.redirectUrlTime == null) {
                redirect_time = 5000;
        } else {
            redirect_time = reportSettingData.redirectUrlTime * 1000;
        }
        window.setTimeout(function(){ window.location.href = reportSettingData.redirectUrl;}, redirect_time);
      } else {
          window.open(url);
          // window.location.href=url;
      }
    } else {
      console.error(users);
    }
  }

  xhr.send(JSON.stringify({
    "domainName": subdomain,
    "websiteUrl": decodeURIComponent(website),
    "email": decodeURIComponent(email),
    "firstName": decodeURIComponent(name),
    "phone": decodeURIComponent(phone),
    "gdprcheckbox": embedData.isGdpr,
    "company": decodeURIComponent(companyval),
    "leadType":"EMBED",
    "browser" : get_browser(),
    "source" : window.location.href
  }));

}
