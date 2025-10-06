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

function light_sceneNo(no) {
	local.send("/mix16apps/lighting/scene/start "+no+"", 1);	
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