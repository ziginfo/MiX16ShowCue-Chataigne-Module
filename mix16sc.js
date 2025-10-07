// ========================== VARS ===========================
var myParameters = {};
var myValues = {};
var cue_names=[];
var cue_ids=[];
var cue_numbs=[];
var notes =[];

//====================================================================
//		INITIAL FUNCTIONS 
//====================================================================

//  initial functions
function init() {

}


//========================================================================
//		 PARAMETER CHANGE EVENTS
//========================================================================

function moduleParameterChanged(param) { 
	
	if (param.name == "sync"){
	local.send ("/mix16showcue/info/full") ;
	}
	
}

//========================================================================
//							 VALUE CHANGE EVENTS
//========================================================================

function moduleValueChanged(value) { 

	if (value.name == "syncCueNames"){
	local.send ("/mix16showcue/info/full") ;}

	if (value.name == "go"){
	local.send ("/mix16showcue/playnext") ;
	}
	
	if (value.name == "stopAll"){
	local.send ("/mix16showcue/stopall") ;
	}
	
	if (value.name == "cueNumber"){
	selCue = local.values.cueInfos.cueNumber.get() ;
	local.send ("/mix16showcue/info/full") ;	
	}
	
	if (value.name == "activeCueList" || value.name == "syncCueNames" || value.name == "countOfCues"){
	cuecount = local.values.cueNames.countOfCues.get()  ;
//	local.values.cueNames.test.set(value.val) ;
	for (var n = 1; n <= cuecount; n++) {
			local.values.cueNames.addStringParameter("Cue "+n, "", "");  } }
	
}
//============================================================
//		OSC EVENTS
//============================================================

function oscEvent(address, args) { 

		if (address == "/mix16showcue/playingcue/number" ) {
		local.values.playingCueNo.set(args[0]);
		}
		
		if (address == "/mix16showcue/playingcue/name" ) {
		local.values.playingCue.set(args[0]);
		}
		
		if (address == "/mix16showcue/playingcue/time" ) {
		local.values.playingTime.set(args[0]);
		}
		
		if (address == "/mix16showcue/nextcue/name" ) {
		local.values.nextCue.set(args[0]);
		}
		
		if (address == "/mix16showcue/go/title" ) {
		local.values.nextCueNo.set(args[0]);
		}
		
		if (address == "/mix16showcue/app/name" ) {
		local.parameters.showCueVersion.set(args[0]);
		}
		
		if (address == "/mix16showcue/project/name" ) {
		local.parameters.sessionName.set(args[0]);
		}
		
		
		if (address == '/mix16showcue/cue') {            
          		            	
           	cue_ids.push(args[0]);             	
  /*        		cue_numbs.push(args[1]);                       	
           		cue_names.push(args[2]);
           		cue_notes.push(args[5]);
           		var maxid = Math.max.apply(Math, cue_ids);
*/           	          
           	local.parameters.countOfCues.set(args[0]);
           	local.values.cueNames.test.set(cue_ids[2]);

//Selected Cue Infos           	
           	selCue = local.values.cueInfos.cueNumber.get() ;
           if (args[1]==selCue){
           	vol=Math.round(args[3]);
           	local.values.cueInfos.cueName.set(args[2]);
           	local.values.cueInfos.cueStatus.set(args[4]);
           	local.values.cueInfos.cueVolume.set(vol);
           	local.values.cueInfos.notes.set(args[5]);
           	}
           	
           	}
           	
           	
}

//=========================================================
//		 REGULAR FUCNTIONS
//=========================================================
// Main Control

function go() {
	local.send("/mix16showcue/playnext");	
}

function back() {
	local.send("/mix16showcue/setprev");	
}

function next() {
	local.send("/mix16showcue/setnext");	
}

function pause_play() {
	local.send("/mix16showcue/pauseall");	
}

function stop_all() {
	local.send("/mix16showcue/stopall");	
}

function set_next(val) {
	local.send("/mix16showcue/setgo", val);	
}

function play_cue(val) {
	local.send("/mix16showcue/playcue", val);	
}

function reset() {
	local.send("/mix16apps/reset/playstatus", 1);	
}


// set Volume

function allVol_out() {
	local.send("/mix16apps/reset/chvol0", 1);	
}

function allVol_full() {
	local.send("/mix16apps/reset/chvol100", 1);	
}

function masterVol(val) {
	val=Math.round(val);
	local.send("/mix16showcue/setmaster", val);	
}

function cueVol(cue,val) {
	val=Math.round(val);
	local.send("/mix16showcue/setcuevol",cue, val);	
}


// actions

function light_master(val) {
	val=Math.round(val);
	local.send("/mix16showcue/setlightingmaster", val);	
}

function mic_on(val) {
	local.send("/mix16apps/livein/mic/start", 1);	
}

function mute_liveIn() {
	local.send("/mix16apps/livein/mic/mute", 1);	
}

function camera_start() {
	local.send("/mix16apps/livein/camera/start",1);	
}

function camera_freeze() {
	local.send("/mix16apps/livein/camera/freeze", 1);
}	
	
function light_sceneName(name) {
	local.send("/mix16apps/lighting/scene/start "+name);	
}


// OSC Requests

function basicinfo() {
	local.send("/mix16showcue/info");	
}

function fullinfo() {
	local.send("/mix16showcue/info/full");	
}

function now_playing() {
	local.send("/mix16apps/playlist/playingcue");	
}

function next_playing() {
	local.send("/mix16apps/playlist/nextcue");	
}