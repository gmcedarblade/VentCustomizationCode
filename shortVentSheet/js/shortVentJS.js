// Vent Sheet Ranges
var min_setRate = minSetRate || 0;
var max_setRate = maxSetRate || 0;

var min_totalRate = minTotalRate || 0;
var max_totalRate = maxTotalRate || 0;

var min_setVt = minSetVt || 0;
var max_setVt = maxSetVt || 0;

var min_expireVt = minExpireVt || 0;
var max_expireVt = maxExpireVt || 0;

var min_exhaleVe = minExhaleVe || 0;
var max_exhaleVe = maxExhaleVe || 0;

var min_o2Pcnt = minO2Pcnt || 0;
var max_o2Pcnt = maxO2Pcnt || 0;

var min_setPeep = minSetPeep || 0;
var max_setPeep = maxSetPeep || 0;

var min_Pip = minPip || 0;
var max_Pip = maxPip || 0;

var min_plateau = minPlateau || 0;
var max_plateau = maxPlateau || 0;

var min_map = minMap || 0;
var max_map = maxMap || 0;

var min_peakFlow = minPeakFlow || 0;
var max_peakFlow = maxPeakFlow || 0;

var min_clStatic = minClStatic || 0;
var max_clStatic = maxClStatic || 0;

var min_clDynamic = minClDynamic || 0;
var max_clDynamic = maxClDynamic || 0;

var min_raw = minRaw || 0;
var max_raw = maxRaw || 0;

var min_inspTime = minInspTime || 0;
var max_inspTime = maxInspTime || 0;

var min_ieRatioLeft = minIeRatioLeft || 0;
var max_ieRatioLeft = maxIeRatioLeft || 0;

var min_ieRatioRight = minIeRatioRight || 0;
var max_ieRatioRight = maxIeRatioRight || 0;

var message_success = messageSuccess || 'Success!';
var message_failure = messageFailure || 'Try again.';
// --- End Vent Sheet Ranges

//Constants
var notAssessedValue = 9999;
var feedbackSpan = document.getElementById('feedback');

  
loadUserQOL();

setPatientInfo(name, dob, mrNum, allergy, height, weight);

var ARIS = {};

ARIS.ready = function() {
  
  var itemID = ARIS.cache.idForItemName('VentSheetPass');
  var ventFailID = ARIS.cache.idForItemName('VentSheetFail');
  
  var item_id_to_give = itemID;
  var ventFailItemID = ventFailID;
  
  displayUserInputs();
  
  document.getElementById('button-submit').onclick = function() {
     
    // Grab input values
    var modeSelect = document.getElementById('dropMode');
    var modeValue = modeSelect.options[modeSelect.selectedIndex].value;

    var setRate = document.getElementById('tbxSetRate').value;

    var totalRate = document.getElementById('tbxTotalRate').value;

    var setVt = document.getElementById('tbxSetVt').value;

    var expireVt = document.getElementById('tbxExpireVt').value;

    var exhaleVe = document.getElementById('tbxExhaleVe').value;

    var o2Pcnt = document.getElementById('tbxo2Pcnt').value;

    var setPeep = document.getElementById('tbxsetPeep').value;

    var pip = document.getElementById('tbxPip').value;

    var plateau = document.getElementById('tbxPlateau').value;

    var map = document.getElementById('tbxMap').value;

    var peakFlow = document.getElementById('tbxPeakFlow').value;

    var clStatic = document.getElementById('tbxClStatic').value;

    var clDynamic = document.getElementById('tbxClDynamic').value;

    var raw = document.getElementById('tbxRaw').value;

    var waveform = document.getElementById('dropWave');
    var waveformValue = waveform.options[waveform.selectedIndex].value;

    var inspTime = document.getElementById('tbxInspTime').value;

    var ieRatioLeft = document.getElementById('tbxieRatioLeft').value;
    var ieRatioRight = document.getElementById('tbxieRatioRight').value;

    var alarms = document.getElementById('cbxAlarms');

     var passed = isInputsValid(setRate, min_setRate, max_setRate, 
                             totalRate, min_totalRate, max_totalRate, 
                             setVt, min_setVt, max_setVt, 
                             expireVt, min_expireVt, max_expireVt, 
                             exhaleVe, min_exhaleVe, max_exhaleVe, 
                             o2Pcnt, min_o2Pcnt, max_o2Pcnt, 
                             setPeep, min_setPeep, max_setPeep,
                             pip, min_Pip, max_Pip,
                             plateau, min_plateau, max_plateau,
                             map, min_map, max_map,
                             peakFlow, min_peakFlow, max_peakFlow,
                             clStatic, min_clStatic, max_clStatic,
                             clDynamic, min_clDynamic, max_clDynamic,
                             raw, min_raw, max_raw,
                             inspTime, min_inspTime, max_inspTime,
                             ieRatioLeft, min_ieRatioLeft, max_ieRatioLeft,
                             ieRatioRight, min_ieRatioRight, max_ieRatioRight);

    if(passed) {
      feedbackSpan.innerHTML = message_success;
      
      saveUserInputs(modeValue, setRate, totalRate, setVt, expireVt, exhaleVe, 
                     o2Pcnt, setPeep, pip, plateau, map, peakFlow, clStatic,
                     clDynamic, raw, waveformValue, inspTime, ieRatioLeft,
                     ieRatioRight, alarms);
      // sends a one to the vent pass item
      ARIS.setItemCount(item_id_to_give,1);

      setTimeout(function(){
              ARIS.exit();
      }, 1500);
      
    } else {
      feedbackSpan.innerHTML = message_failure;
      
      // gives a count of one more to the vent fail item
      ARIS.giveItemCount(ventFailItemID,1);
      
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

function isInputsValid(setRate, min_setRate, max_setRate, 
                        totalRate, min_totalRate, max_totalRate, 
                        setVt, min_setVt, max_setVt, 
                        expireVt, min_expireVt, max_expireVt, 
                        exhaleVe, min_exhaleVe, max_exhaleVe,
                        o2Pcnt, min_o2Pcnt, max_o2Pcnt,
                        setPeep, min_setPeep, max_setPeep,
                        pip, min_Pip, max_Pip,
                        plateau, min_plateau, max_plateau,
                        map, min_map, max_map,
                        peakFlow, min_peakFlow, max_peakFlow,
                        clStatic, min_clStatic, max_clStatic,
                        clDynamic, min_clDynamic, max_clDynamic,
                        raw, min_raw, max_raw,
                        inspTime, min_inspTime, max_inspTime,
                        ieRatioLeft, min_ieRatioLeft, max_ieRatioLeft,
                        ieRatioRight, min_ieRatioRight, max_ieRatioRight) {
  var passed = true;
  
  if (setRate) {
    passed = passed && checkFloat(setRate, min_setRate, max_setRate);
  }
  
  if (totalRate) {
    passed = passed && checkFloat(totalRate, min_totalRate, max_totalRate);
  }
  
  if (setVt) {
    passed = passed && checkFloat(setVt, min_setVt, max_setVt);
  }
  
  if (expireVt) {
    passed = passed && checkFloat(expireVt, min_expireVt, max_expireVt);
  }
  
  if (exhaleVe) {
    passed = passed && checkFloat(exhaleVe, min_exhaleVe, max_exhaleVe);
  }
  
  if (o2Pcnt) {
    passed = passed && checkFloat(o2Pcnt, min_o2Pcnt, max_o2Pcnt);
  }
  
  if (setPeep) {
    passed = passed && checkFloat(setPeep, min_setPeep, max_setPeep);
  }
  
  if (pip) {
    passed = passed && checkFloat(pip, min_Pip, max_Pip);
  }
  
  if (plateau) {
    passed = passed && checkFloat(plateau, min_plateau, max_plateau);
  }
  
  if (map) {
    passed = passed && checkFloat(map, min_map, max_map);
  }
  
  if (peakFlow) {
    passed = passed && checkFloat(peakFlow, min_peakFlow, max_peakFlow);
  }
  
  if (clStatic) {
    passed = passed && checkFloat(clStatic, min_clStatic, max_clStatic);
  }
  
  if (clDynamic) {
    passed = passed && checkFloat(clDynamic, min_clDynamic, max_clDynamic);
  }
  
  if (raw) {
    passed = passed && checkFloat(raw, min_raw, max_raw);
  }
  
  if (inspTime) {
    passed = passed && checkFloat(inspTime, min_inspTime, max_inspTime);
  }
  
  if (ieRatioLeft) {
    passed = passed && checkFloat(ieRatioLeft, min_ieRatioLeft, max_ieRatioLeft);
  }
  
  if (ieRatioRight) {
    passed = passed && checkFloat(ieRatioRight, min_ieRatioRight, max_ieRatioRight);
  }
  
  return passed;
  
}

function displayUserInputs() {

  var ventSubmitted_id = ARIS.cache.idForItemName('VentSubmitted');
  var ventSubmitted_qty = ARIS.cache.getPlayerItemCount(ventSubmitted_id);
  
  if (ventSubmitted_qty > 0) {
    
    var mode_id = ARIS.cache.idForItemName('VentMode');
    var mode_qty = ARIS.cache.getPlayerItemCount(mode_id);
    var modeOutput = document.getElementById("modeOutput");
    if (mode_qty == 0) {
       modeOutput.innerHTML = "";
     } else if (mode_qty == 1) {
       modeOutput.innerHTML = "Volume Control";
     } else if (mode_qty == 2) {
       modeOutput.innerHTML = "Pressure Control";
     } else if (mode_qty == 3) {
       modeOutput.innerHTML = "SIMV";
     } else if (mode_qty == 4) {
       modeOutput.innerHTML = "SIMV with PS";
     } else if (mode_qty == 5) {
       modeOutput.innerHTML = "CPAP with PS";
     } else if (mode_qty == 6) {
       modeOutput.innerHTML = "CPAP";
     } else if (mode_qty == 7) {
       modeOutput.innerHTML = "BiLevel";
     } else if (mode_qty == 8) {
       modeOutput.innerHTML = "APRV";
     } else if (mode_qty == 9) {
       modeOutput.innerHTML = "Spontaneous";
     } else if (mode_qty == 10) {
       modeOutput.innerHTML = "Spontaneous-timed";
     }
    
    var setRate_id = ARIS.cache.idForItemName('VentSetRate');
    var setRate_qty = ARIS.cache.getPlayerItemCount(setRate_id); 
    var setRateOutput = document.getElementById("setRateOutput"); 
    if (setRate_qty == notAssessedValue) {
      setRateOutput.innerHTML = "";
    } else {
      setRateOutput.innerHTML = setRate_qty;
    }


    var totalRate_id = ARIS.cache.idForItemName('VentTotalRate');
    var totalRate_qty = ARIS.cache.getPlayerItemCount(totalRate_id); 
    var totalRateOutput = document.getElementById("totalRateOutput"); 
    if (totalRate_qty == notAssessedValue) {
      totalRateOutput.innerHTML = "";
    } else {
      totalRateOutput.innerHTML = totalRate_qty;
    }

    var setVt_id = ARIS.cache.idForItemName('VentSetVt');
    var setVt_qty = ARIS.cache.getPlayerItemCount(setVt_id); 
    var setVtOutput = document.getElementById("setVtOutput"); 
    if (setVt_qty == notAssessedValue) {
      setVtOutput.innerHTML = "";
    } else {
      setVtOutput.innerHTML = setVt_qty;
    }

    var expireVt_id = ARIS.cache.idForItemName('VentExpireVt');
    var expireVt_qty = ARIS.cache.getPlayerItemCount(expireVt_id); 
    var expireVtOutput = document.getElementById("expireVtOutput");
    if (expireVt_qty == notAssessedValue) {
      expireVtOutput.innerHTML = "";
    } else {
      expireVtOutput.innerHTML = expireVt_qty;
    }
    
    var exhaleVe_id = ARIS.cache.idForItemName('VentExhaleVe');
    var exhaleVe_qty = ARIS.cache.getPlayerItemCount(exhaleVe_id); 
    var exhaleVeOutput = document.getElementById("exhaleVeOutput"); 
    if (exhaleVe_qty == notAssessedValue) {
      exhaleVeOutput.innerHTML = "";
    } else {
      exhaleVe_qty /= 10;
      exhaleVeOutput.innerHTML = exhaleVe_qty;
    }
    
    var o2Pcnt_id = ARIS.cache.idForItemName('VentO2Pcnt');
    var o2Pcnt_qty = ARIS.cache.getPlayerItemCount(o2Pcnt_id); 
    var o2PcntOutput = document.getElementById("o2PcntOutput"); 
    if (o2Pcnt_qty == notAssessedValue) {
      o2PcntOutput.innerHTML = "";
    } else {
      o2PcntOutput.innerHTML = o2Pcnt_qty;
    }
    
    var setPeep_id = ARIS.cache.idForItemName('VentSetPEEP');
    var setPeep_qty = ARIS.cache.getPlayerItemCount(setPeep_id); 
    var setPeepOutput = document.getElementById("setPeepOutput");
    if (setPeep_qty == notAssessedValue) {
      setPeepOutput.innerHTML = "";
    } else {
      setPeep_qty /= 10;
      setPeepOutput.innerHTML = setPeep_qty;
    }

     var pip_id = ARIS.cache.idForItemName('VentPIP');
    var pip_qty = ARIS.cache.getPlayerItemCount(pip_id); 
    var pipOutput = document.getElementById("pipOutput");
    if (pip_qty == notAssessedValue) {
      pipOutput.innerHTML = "";
    } else {
      pip_qty /= 10;
      pipOutput.innerHTML = pip_qty;
    }

    var plateau_id = ARIS.cache.idForItemName('VentPlateau');
    var plateau_qty = ARIS.cache.getPlayerItemCount(plateau_id); 
    var plateauOutput = document.getElementById("plateauOutput");
    if (plateau_qty == notAssessedValue) {
      plateauOutput.innerHTML = "";
    } else {
      plateau_qty /= 10;
      plateauOutput.innerHTML = plateau_qty;
    }

    var map_id = ARIS.cache.idForItemName('VentMAP');
    var map_qty = ARIS.cache.getPlayerItemCount(map_id); 
    var mapOutput = document.getElementById("mapOutput"); 
    if (map_qty == notAssessedValue) {
      mapOutput.innerHTML = "";
    } else {
      map_qty /= 10;
      mapOutput.innerHTML = map_qty;
    }

    var peakFlow_id = ARIS.cache.idForItemName('VentPeakFlow');
    var peakFlow_qty = ARIS.cache.getPlayerItemCount(peakFlow_id); 
    var peakFlowOutput = document.getElementById("peakFlowOutput"); 
    if (peakFlow_qty == notAssessedValue) {
      peakFlowOutput.innerHTML = "";
    } else {
      peakFlow_qty /=10;
      peakFlowOutput.innerHTML = peakFlow_qty;
    }

     var clStatic_id = ARIS.cache.idForItemName('VentCLStatic');
    var clStatic_qty = ARIS.cache.getPlayerItemCount(clStatic_id); 
    var clStaticOutput = document.getElementById("clStaticOutput");
    if (clStatic_qty == notAssessedValue) {
      clStaticOutput.innerHTML = "";
    } else {
      clStatic_qty /= 10;
      clStaticOutput.innerHTML = clStatic_qty;
    }

    var clDynamic_id = ARIS.cache.idForItemName('VentCLDynamic');
    var clDynamic_qty = ARIS.cache.getPlayerItemCount(clDynamic_id); 
    var clDynamicOutput = document.getElementById("clDynamicOutput"); 
    if (clDynamic_qty == notAssessedValue) {
      clDynamicOutput.innerHTML = "";
    } else {
      clDynamic_qty /= 10;
      clDynamicOutput.innerHTML = clDynamic_qty;
    }

    var raw_id = ARIS.cache.idForItemName('VentRaw');
    var raw_qty = ARIS.cache.getPlayerItemCount(raw_id); 
    var rawOutput = document.getElementById("rawOutput"); 
    if (raw_qty == notAssessedValue) {
      rawOutput.innerHTML = "";
    } else {
      raw_qty /=10;
      rawOutput.innerHTML = raw_qty;
    }
    
    var waveform_id = ARIS.cache.idForItemName('VentWave');
    var waveform_qty = ARIS.cache.getPlayerItemCount(waveform_id);
    var waveOutput = document.getElementById("waveOutput");
    if (waveform_qty == 0) {
       waveOutput.innerHTML = "";
     } else if (waveform_qty == 1) {
       waveOutput.innerHTML = "Square";
     } else if (waveform_qty == 2) {
       waveOutput.innerHTML = "Descending";
     } else if (waveform_qty == 3) {
       waveOutput.innerHTML = "Ascending";
     } else if (waveform_qty == 4) {
       waveOutput.innerHTML = "Sine";
     } else if (waveform_qty == 5) {
       waveOutput.innerHTML = "Ramp";
     }

    var inspTime_id = ARIS.cache.idForItemName('VentInspTime');
    var inspTime_qty = ARIS.cache.getPlayerItemCount(inspTime_id); 
    var inspTimeOutput = document.getElementById("inspTimeOutput"); 
    if (inspTime_qty == notAssessedValue) {
      inspTimeOutput.innerHTML = "";
    } else {
      inspTime_qty /= 10;
      inspTimeOutput.innerHTML = inspTime_qty;
    }

    var ieRatioLeft_id = ARIS.cache.idForItemName('VentIERatioLeft');
    var ieRatioLeft_qty = ARIS.cache.getPlayerItemCount(ieRatioLeft_id);
    var ieRatioRight_id = ARIS.cache.idForItemName('VentIERatioRight');
    var ieRatioRight_qty = ARIS.cache.getPlayerItemCount(ieRatioRight_id);
    var ieRatioOutput = document.getElementById("ieRatioOutput"); 
    if (ieRatioLeft_qty == notAssessedValue) {
      ieRatioOutput.innerHTML = "";
    } else {
      ieRatioLeft_qty /= 10;
      ieRatioRight_qty /= 10;
      ieRatioOutput.innerHTML = ieRatioLeft_qty + " : " + ieRatioRight_qty;
    }
    
    var alarms_id = ARIS.cache.idForItemName('VentAlarms');
    var alarms_qty = ARIS.cache.getPlayerItemCount(alarms_id);
    var alarmsOutput = document.getElementById("alarmsOutput");
    if (alarms_qty == 1) {
       alarmsOutput.innerHTML = "&check;";
     }
  }
}

function saveUserInputs(modeValue, setRate, totalRate, setVt, expireVt, 
                        exhaleVe, o2Pcnt, setPeep, pip, plateau, map, 
                        peakFlow, clStatic, clDynamic, raw, waveformValue,
                        inspTime, ieRatioLeft, ieRatioRight, alarms) {
  
  var ventSubmitted_id = ARIS.cache.idForItemName('VentSubmitted');
  ARIS.setItemCount(ventSubmitted_id, 1);
  
  var mode_id = ARIS.cache.idForItemName('VentMode');
  if (modeValue == "null") {
    ARIS.setItemCount(mode_id, 0);
  } else if (modeValue == "volumeControl") {
    ARIS.setItemCount(mode_id, 1);
  } else if (modeValue == "pressureControl") {
    ARIS.setItemCount(mode_id, 2);
  } else if (modeValue == "simv") {
    ARIS.setItemCount(mode_id, 3);
  } else if (modeValue == "simvWithPs") {
    ARIS.setItemCount(mode_id, 4);
  } else if (modeValue == "cpapWithPs") {
    ARIS.setItemCount(mode_id, 5);
  } else if (modeValue == "cpap") {
    ARIS.setItemCount(mode_id, 6);
  } else if (modeValue == "biLevel") {
    ARIS.setItemCount(mode_id, 7);
  } else if (modeValue == "aprv") {
    ARIS.setItemCount(mode_id, 8);
  } else if (modeValue == "spontaneous") {
    ARIS.setItemCount(mode_id, 9);
  } else if (modeValue == "spontaneousTimed") {
    ARIS.setItemCount(mode_id, 10);
  }
  
  var setRate_id = ARIS.cache.idForItemName('VentSetRate');
  if (isNaN(parseFloat(setRate))) {
    ARIS.setItemCount(setRate_id, notAssessedValue);
  } else {
    ARIS.setItemCount(setRate_id, setRate);
  }
  
  var totalRate_id = ARIS.cache.idForItemName('VentTotalRate');
  if (isNaN(parseFloat(totalRate))) {
    ARIS.setItemCount(totalRate_id, notAssessedValue);
  } else {
    ARIS.setItemCount(totalRate_id, totalRate);
  }
  
  var setVt_id = ARIS.cache.idForItemName('VentSetVt');
  if (isNaN(parseFloat(setVt))) {
    ARIS.setItemCount(setVt_id, notAssessedValue);
  } else {
    ARIS.setItemCount(setVt_id, setVt);
  }
  
  var expireVt_id = ARIS.cache.idForItemName('VentExpireVt');
  if (isNaN(parseFloat(expireVt))) {
    ARIS.setItemCount(expireVt_id, notAssessedValue);
  } else {
    ARIS.setItemCount(expireVt_id, expireVt);
  }
  
  var exhaleVe_id = ARIS.cache.idForItemName('VentExhaleVe');
  if (isNaN(parseFloat(exhaleVe))) {
    ARIS.setItemCount(exhaleVe_id, notAssessedValue);
  } else {
    exhaleVe *= 10;
    ARIS.setItemCount(exhaleVe_id, exhaleVe);
  }
  
  var o2Pcnt_id = ARIS.cache.idForItemName('VentO2Pcnt');
  if (isNaN(parseFloat(o2Pcnt))) {
    ARIS.setItemCount(o2Pcnt_id, notAssessedValue);
  } else {
    ARIS.setItemCount(o2Pcnt_id, o2Pcnt);
  }
  
  var setPeep_id = ARIS.cache.idForItemName('VentSetPEEP');
  if (isNaN(parseFloat(setPeep))) {
    ARIS.setItemCount(setPeep_id, notAssessedValue);
  } else {
    setPeep *= 10;
    ARIS.setItemCount(setPeep_id, setPeep);
  }
  
  var pip_id = ARIS.cache.idForItemName('VentPIP');
  if (isNaN(parseFloat(pip))) {
    ARIS.setItemCount(pip_id, notAssessedValue);
  } else {
    pip *= 10;
    ARIS.setItemCount(pip_id, pip);
  }
  
  var plateau_id = ARIS.cache.idForItemName('VentPlateau');
  if (isNaN(parseFloat(plateau))) {
    ARIS.setItemCount(plateau_id, notAssessedValue);
  } else {
    plateau *= 10;
    ARIS.setItemCount(plateau_id, plateau);
  }

  var map_id = ARIS.cache.idForItemName('VentMAP');
  if (isNaN(parseFloat(map))) {
    ARIS.setItemCount(map_id, notAssessedValue);
  } else {
    map *= 10;
    ARIS.setItemCount(map_id, map);
  }
  
  var peakFlow_id = ARIS.cache.idForItemName('VentPeakFlow');
  if (isNaN(parseFloat(peakFlow))) {
    ARIS.setItemCount(peakFlow_id, notAssessedValue);
  } else {
    ARIS.setItemCount(peakFlow_id, peakFlow);
  }
  
  var clStatic_id = ARIS.cache.idForItemName('VentCLStatic');
  if (isNaN(parseFloat(clStatic))) {
    ARIS.setItemCount(clStatic_id, notAssessedValue);
  } else {
    clStatic *= 10;
    ARIS.setItemCount(clStatic_id, clStatic);
  }

  var clDynamic_id = ARIS.cache.idForItemName('VentCLDynamic');
  if (isNaN(parseFloat(clDynamic))) {
    ARIS.setItemCount(clDynamic_id, notAssessedValue);
  } else {
    clDynamic *= 10;
    ARIS.setItemCount(clDynamic_id, clDynamic);
  }

  var raw_id = ARIS.cache.idForItemName('VentRaw');
  if (isNaN(parseFloat(raw))) {
    ARIS.setItemCount(raw_id, notAssessedValue);
  } else {
    raw *= 10;
    ARIS.setItemCount(raw_id, raw);
  }
  
  var waveform_id = ARIS.cache.idForItemName('VentWave');
  if (waveformValue == "null") {
    ARIS.setItemCount(waveform_id, 0);
  } else if (waveformValue == "square") {
    ARIS.setItemCount(waveform_id, 1);
  } else if (waveformValue == "descending") {
    ARIS.setItemCount(waveform_id, 2);
  } else if (waveformValue == "ascending") {
    ARIS.setItemCount(waveform_id, 3);
  } else if (waveformValue == "sine") {
    ARIS.setItemCount(waveform_id, 4);
  } else if (waveformValue == "ramp") {
    ARIS.setItemCount(waveform_id, 5);
  }

  var inspTime_id = ARIS.cache.idForItemName('VentInspTime');
  if (isNaN(parseFloat(inspTime))) {
    ARIS.setItemCount(inspTime_id, notAssessedValue);
  } else {
    inspTime *= 10;
    ARIS.setItemCount(inspTime_id, inspTime);
  }


  var ieRatioLeft_id = ARIS.cache.idForItemName('VentIERatioLeft');
  if (isNaN(parseFloat(ieRatioLeft))) {
    ARIS.setItemCount(ieRatioLeft_id, notAssessedValue);
  } else {
    ieRatioLeft *= 10;
    ARIS.setItemCount(ieRatioLeft_id, ieRatioLeft);
  }

  var ieRatioRight_id = ARIS.cache.idForItemName('VentIERatioRight');
  if (isNaN(parseFloat(ieRatioRight))) {
    ARIS.setItemCount(ieRatioRight_id, notAssessedValue);
  } else {
    ieRatioRight *= 10;
    ARIS.setItemCount(ieRatioRight_id, ieRatioRight);
  }
  
  var alarms_id = ARIS.cache.idForItemName('VentAlarms');
  if (alarms.checked === true) {
    ARIS.setItemCount(alarms_id, 1);
  } else {
    ARIS.setItemCount(alarms_id, 0);
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

function validateFloatKeyPress(el, evt) {
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    var number = el.value.split('.');
    
    if (charCode != 46 && charCode > 31 && (charCode < 48 || charCode > 57)) {
        return false;
    }
    //just one dot
    if(number.length>1 && charCode == 46){
         return false;
    }
    
    //get the carat position
    var caratPos = getSelectionStart(el);
    
    var dotPos = el.value.indexOf(".");
    console.log(caratPos);
    if( caratPos > dotPos && dotPos>-1 && (number[1].length > 0)){
        return false;
    }
    return true;
  }
  
  //thanks: http://javascript.nwbox.com/cursor_position/
  function getSelectionStart(o) {
    if (o.createTextRange) {
      var r = document.selection.createRange().duplicate();
      r.moveEnd('character', o.value.length);
      if (r.text == '') {
        return o.value.length;
      } else {
        return o.value.lastIndexOf(r.text);
      }
    } else {
      return o.selectionStart; 
    }
  }