/* eslint-disable require-jsdoc */

function addView(id) {
  if (!$('#' + id)[0]) {
    $('<div/>', {
      id,
      class: 'video-view'
    }).appendTo('#video_grid');
  }
}

function removeView(id) {
  if ($('#' + id)[0]) {
    $('#' + id).remove();
  }
}

// populate camera options
TRTC.getCameras().then(devices => {
  devices.forEach(device => {
	  console.log('设备信息 label: ' + device.label + ' deviceId: ' + device.deviceId);
    $('<option/>', {
      value: device.deviceId,
      text: device.label
    }).appendTo('#cameraId');
  });
});


//切换视频画面
function local_rang(type){
	//type 0 远程流全屏，本地流小屏
	//type 1 远程流小屏，本地流全屏
	if(type==0){
		//远程流全屏
		$(".video-view").css("width","100%")
		$(".video-view").css("height","100%")
		$(".video-view").css("z-index","999")
		// $(".video-view").css("background-color","#fff")
		//本地流小屏
		$("#local_stream").css("position","absolute")
		$("#local_stream").css("top","0")
		$("#local_stream").css("right","0")
		$("#local_stream").css("z-index","9999")
		// $("#local_stream").css("background-color","#000")
		$("#local_stream").css("width","140px")
		$("#local_stream").css("height","180px")
	}
	if(type==1){
		//远程流小屏
		$(".video-view").css("width","140px")
		$(".video-view").css("height","180px")
		$(".video-view").css("z-index","9999")
		// $(".video-view").css("background-color","#000")
		//本地流全屏
		$("#local_stream").css("z-index","999")
		$("#local_stream").css("position","absolute")
		$("#local_stream").css("top","0")
		$("#local_stream").css("right","0")
		$("#local_stream").css("z-index","999")
		// $("#local_stream").css("background-color","#fff")
		$("#local_stream").css("width","100%")
		$("#local_stream").css("height","100%")
	}
}



// populate microphone options
TRTC.getMicrophones().then(devices => {
  devices.forEach(device => {
    $('<option/>', {
      value: device.deviceId,
      text: device.label
    }).appendTo('#microphoneId');
  });
});

function getCameraId() {
  const selector = document.getElementById('cameraId');
  const cameraId = selector[selector.selectedIndex].value;
  return cameraId;
}

function getMicrophoneId() {
  const selector = document.getElementById('microphoneId');
  const microphoneId = selector[selector.selectedIndex].value;
  console.log('selected microphoneId: ' + microphoneId);
  return microphoneId;
}



// fix jquery touchstart event warn in chrome M76
jQuery.event.special.touchstart = {
  setup: function(_, ns, handle) {
    if (ns.includes('noPreventDefault')) {
      this.addEventListener('touchstart', handle, { passive: false });
    } else {
      this.addEventListener('touchstart', handle, { passive: true });
    }
  }
};
jQuery.event.special.touchmove = {
  setup: function(_, ns, handle) {
    if (ns.includes('noPreventDefault')) {
      this.addEventListener('touchmove', handle, { passive: false });
    } else {
      this.addEventListener('touchmove', handle, { passive: true });
    }
  }
};

const Toast = {
  info: function(msg) {
    Toastify({
      text: msg,
      duration: 3000,
      gravity: 'top', // `top` or `bottom`
      position: 'right', // `left`, `center` or `right`
      backgroundColor: '#4F85FF'
    }).showToast();
  },
  notify: function(msg) {
    Toastify({
      text: msg,
      duration: 3000,
      gravity: 'top', // `top` or `bottom`
      position: 'right', // `left`, `center` or `right`
      backgroundColor: '#2FC259'
    }).showToast();
  },
  error: function(msg) {
    Toastify({
      text: msg,
      duration: 3000,
      gravity: 'top', // `top` or `bottom`
      position: 'right', // `left`, `center` or `right`
      backgroundColor: '#FF310A'
    }).showToast();
  }
};
