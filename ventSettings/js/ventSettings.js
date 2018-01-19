// Vent Sheet Ranges
var min_rateSetting = minRateSetting || 0;
var max_rateSetting = maxRateSetting || 0;

var min_vtSetting = minVtSetting || 0;
var max_vtSetting = maxVtSetting || 0;

var min_fio2Setting = minFio2Setting || 0;
var max_fio2Setting = maxFio2Setting || 0;

var min_peepSetting = minPeepSetting || 0;
var max_peepSetting = maxPeepSetting || 0;

var message_success = messageSuccessVentSetting || 'Verifying Answers';
var message_failure = messageFailureVentSetting || 'Verifying Answers';
// --- End Vent Sheet Ranges

//Constants
var notAssessedValue = 9999;

var feedbackSpan = document.getElementById('feedback');
var SUBMITTED_NAME = "SugVentSubmitted";

  
loadUserQOL();

setPatientInfo(name, dob, mrNum, allergy, height, weight);

var ARIS = {};

ARIS.ready = function(itemID) {
  
  var suggestedVentPassed = ARIS.cache.idForItemName('suggestedVentPassed');
  
  var suggestedVentFail = ARIS.cache.idForItemName('suggestedVentFail');
  
  displayUserInputs();
  
  document.getElementById('button-submit').onclick = function() {
     
    // Grab input values
    var rateSetting = document.getElementById('fieldrate').value;

    var vtSetting = document.getElementById('fieldvt').value;

    var fio2Setting = document.getElementById('fieldfio2').value;

    var peepSetting  = document.getElementById('fieldpeep').value;

    var passed = isInputsValid(rateSetting, min_rateSetting, max_rateSetting, 
                             vtSetting, min_vtSetting, max_vtSetting, 
                             fio2Setting, min_fio2Setting, max_fio2Setting, 
                             peepSetting, min_peepSetting, max_peepSetting);

    if(passed) {
      feedbackSpan.innerHTML = message_success;
      
      saveUserInputs(rateSetting, vtSetting, fio2Setting, peepSetting);
      
      ARIS.setItemCount(suggestedVentPassed,1);

      setTimeout(function(){
              ARIS.exit();
      }, 1500);
      
    } else {
      feedbackSpan.innerHTML = message_failure;
      
      ARIS.giveItemCount(suggestedVentFail,1);
        setTimeout(function(){
          if (feedbackSpan.innerHTML === message_failure) {
            feedbackSpan.innerHTML = '';
          }
          ARIS.exit();
        }, 1500);
    }

  };

}


//********** functions
function setPatientInfo(name, dob, mrNum, allergy, height, weight) {
  
  document.getElementById('ptntNameOutput').innerHTML = name;
  document.getElementById('ptntDOBOutput').innerHTML = dob;
  document.getElementById('ptntMROutput').innerHTML = mrNum;
  document.getElementById('ptntAllergyOutput').innerHTML = allergy;
  document.getElementById('ptntHeightOutput').innerHTML = height;
  document.getElementById('ptntWeightOutput').innerHTML = weight;
}

function loadUserQOL() {
  
  var inputs = document.getElementsByTagName('input');
  for (var i = 0; i < inputs.length; i++) {
    (function(){
      var input = inputs[i];
      input.onclick = function(){ input.value = ''; };
    })();
  }
  
}


function isInputsValid(rateSetting, min_rateSetting, max_rateSetting, 
                       vtSetting, min_vtSetting, max_vtSetting, 
                       fio2Setting, min_fio2Setting, max_fio2Setting, 
                       peepSetting, min_peepSetting, max_peepSetting) {
  var passed = true;
  
  if (rateSetting) {
    passed = passed && checkFloat(rateSetting, min_rateSetting, max_rateSetting);
  }
  
  if (vtSetting) {
    passed = passed && checkFloat(vtSetting, min_vtSetting, max_vtSetting);
  }
  
  if (fio2Setting) {
    passed = passed && checkFloat(fio2Setting, min_fio2Setting, max_fio2Setting);
  }
  
  if (peepSetting) {
    passed = passed && checkFloat(peepSetting, min_peepSetting, max_peepSetting);
  }
  
  return passed;  
}

function displayUserInputs() {

  var submitted_id = ARIS.cache.idForItemName(SUBMITTED_NAME);
  var submitted_qty = ARIS.cache.getPlayerItemCount(submitted_id);
  
  if (submitted_qty > 0) {
        
    var sugRate_id = ARIS.cache.idForItemName('SugSetRate');
    var sugRate_qty = ARIS.cache.getPlayerItemCount(sugRate_id); 
    var sugRateOutput = document.getElementById("rateOutput"); 
    if (sugRate_qty == notAssessedValue) {
      sugRateOutput.innerHTML = "";
    } else {
      sugRateOutput.innerHTML = sugRate_qty;
    }


    var sugVt_id = ARIS.cache.idForItemName('SugSetVt');
    var sugVt_qty = ARIS.cache.getPlayerItemCount(sugVt_id); 
    var sugVtOutput = document.getElementById("vtOutput"); 
    if (sugVt_qty == notAssessedValue) {
      sugVtOutput.innerHTML = "";
    } else {
      sugVtOutput.innerHTML = sugVt_qty;
    }

    var sugFio2_id = ARIS.cache.idForItemName('SugSetFio2');
    var sugFio2_qty = ARIS.cache.getPlayerItemCount(sugFio2_id); 
    var sugFio2Output = document.getElementById("fio2Output"); 
    if (sugFio2_qty == notAssessedValue) {
      sugFio2Output.innerHTML = "";
    } else {
      sugFio2Output.innerHTML = sugFio2_qty;
    }

    var sugPeep_id = ARIS.cache.idForItemName('SugSetPeep');
    var sugPeep_qty = ARIS.cache.getPlayerItemCount(sugPeep_id); 
    var sugPeepOutput = document.getElementById("peepOutput");
    if (sugPeep_qty == notAssessedValue) {
      sugPeepOutput.innerHTML = "";
    } else {
      sugPeepOutput.innerHTML = sugPeep_qty;
    }
   
  }
}

function saveUserInputs(rateSetting, vtSetting, fio2Setting, peepSetting) {
  
  var submitted_id = ARIS.cache.idForItemName(SUBMITTED_NAME);
  ARIS.setItemCount(submitted_id, 1);
  
  var sugRate_id = ARIS.cache.idForItemName('SugSetRate');
  if (isNaN(parseFloat(rateSetting))) {
    ARIS.setItemCount(sugRate_id, notAssessedValue);
  } else {
    ARIS.setItemCount(sugRate_id, rateSetting);
  }
  
  var sugVt_id = ARIS.cache.idForItemName('SugSetVt');
  if (isNaN(parseFloat(vtSetting))) {
    ARIS.setItemCount(sugVt_id, notAssessedValue);
  } else {
    ARIS.setItemCount(sugVt_id, vtSetting);
  }
  
  var sugFio2_id = ARIS.cache.idForItemName('SugSetFio2');
  if (isNaN(parseFloat(fio2Setting))) {
    ARIS.setItemCount(sugFio2_id, notAssessedValue);
  } else {
    ARIS.setItemCount(sugFio2_id, fio2Setting);
  }
  
  var sugPeep_id = ARIS.cache.idForItemName('SugSetPeep');
  if (isNaN(parseFloat(peepSetting))) {
    ARIS.setItemCount(sugPeep_id, notAssessedValue);
  } else {
    ARIS.setItemCount(sugPeep_id, peepSetting);
  }

}

function lookupGET(val) {
    var result = null,
        tmp = [];
    var items = location.search.substr(1).split("&");
    for (var index = 0; index < items.length; index++) {
        tmp = items[index].split("=");
        if (tmp[0] === val) result = decodeURIComponent(tmp[1]);
    }
    return result;
}

function checkFloat(value, min, max) {
  return min <= value && value <= max;
}