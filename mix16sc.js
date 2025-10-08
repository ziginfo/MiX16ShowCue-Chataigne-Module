// ========================== VARS ===========================
var myParameters = {};
var myValues = {};
var cue_names=[];
var cue_ids=[];
var cue_numbs=[];
var notes =[];
var maxid =0;
var cueNumb=0;

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

	if (value.name == "syncCueNames"|| value.name == "syncSBCueNames"){
	local.send ("/mix16showcue/info/full") ;}
	
	if (value.name == "reset"){
	local.values.cueNames.countOfCues.set(0) ;
	for (n=1 ; n<=cueNumb ; n++) {
//	local.values.cueNames.getChild("cue"+n).set(""); 
	local.values.cueNames.removeParameter("Cue "+n) ;	}  }
	
	if (value.name == "resetSB"){
	local.values.sidebarCues.countOfSBCues.set(0) ;
	for (n=1 ; n<=sbNumb ; n++) {
//	local.values.sidebarCues.getChild("SBcue"+n).set(""); 
	local.values.sidebarCues.removeParameter("SBCue "+n) ;	}  }
	
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
	for (var n = 1; n <= cuecount; n++) {
			local.values.cueNames.addStringParameter("Cue "+n, "", "");  } }
			
	if (value.name == "countOfSBCues"){
	sbcount = local.values.sidebarCues.countOfSBCues.get()  ;
	for (var n = 1; n <= sbcount; n++) {
			local.values.sidebarCues.addStringParameter("SBCue "+n, "", "");  } }
	
}
//============================================================
//		OSC EVENTS
//============================================================

function oscEvent(address, args) { 

//Playing and Next Cue Infos >>>>>>>>>>>>>>>>>>>>
		if (address == "/mix16showcue/playingcue/number" ) {
			local.values.playingCueNo.set(args[0]); }
		
		if (address == "/mix16showcue/playingcue/name" ) {
			local.values.playingCue.set(args[0]); }
		
		if (address == "/mix16showcue/playingcue/time" ) {
			local.values.playingTime.set(args[0]); }
		
		if (address == "/mix16showcue/nextcue/name" ) {
			local.values.nextCue.set(args[0]); 	}
		
		if (address == "/mix16showcue/go/title" ) {
			local.values.nextCueNo.set(args[0]); }
		
		if (address == "/mix16showcue/app/name" ) {
			local.parameters.showCueVersion.set(args[0]); }
		
		if (address == "/mix16showcue/project/name" ) {
			local.parameters.sessionName.set(args[0]); }
		

// Main Playlist Cues >>>>>>>>>>>>>>>>>>>>		
		if (address == '/mix16showcue/cue') {		  
			local.parameters.countOfCues.set(args[0]);
           	local.values.cueNames.countOfCues.set(args[0]);
			cueNumb = local.values.cueNames.countOfCues.get() ;
			cue_ids.push(args[0]);
			maxid = cue_ids[cue_ids.length-1];
		
	//  insert Cue numbers and Names  
		for (n=1 ; n<=cueNumb ; n++) {
			if (args[0]==n){
			no = args[1] ;
			name = args[2] ; 
			full = no+" : "+name ;
			cue = "cue"+n ;
			local.values.cueNames.getChild("cue"+n).set(full);} }               		            	
         	          
	//Selected Cue Infos           	
           	selCue = local.values.cueInfos.cueNumber.get() ;
        if (args[1]==selCue){
           	vol=Math.round(args[3]);
           	local.values.cueInfos.cueName.set(args[2]);
           	local.values.cueInfos.cueStatus.set(args[4]);
           	local.values.cueInfos.cueVolume.set(vol);
           	local.values.cueInfos.notes.set(args[5]); 	} 	}

// Sidebar Cues >>>>>>>>>>>>>>>>>>>>>>           	
    	if (address == '/mix16showcue/sidebarcue') {
        	local.values.sidebarCues.countOfSBCues.set(args[0]);  		
			sbNumb = local.values.sidebarCues.countOfSBCues.get() ;
			
	//  insert SB-Cue Names  
		for (n=1 ; n<=sbNumb ; n++) {
			if (args[0]==n){
			cue = "cue"+n ;
			local.values.sidebarCues.getChild("SBCue"+n).set(args[1]);}
		
		} }
           	
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

function pause_cue(val) {
	local.send("/mix16showcue/pausecue", val);	
}

function stop_cue(val) {
	local.send("/mix16showcue/stopcue", val);	
}

function play_SBcue(val) {
	local.send("/mix16showcue/playsidebarcue", val);	
}

function stop_SBcue(val) {
	local.send("/mix16showcue/stopsidebarcue", val);	
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