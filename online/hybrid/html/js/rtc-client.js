/* eslint-disable require-jsdoc */

class RtcClient {
  constructor(options) {
    this.sdkAppId_ = options.sdkAppId;
    this.userId_ = options.userId;
    this.userSig_ = options.userSig;
    this.roomId_ = options.roomId;

    this.isJoined_ = false;
    this.isPublished_ = false;
    this.localStream_ = null;
    this.remoteStreams_ = [];

    // // check if browser is compatible with TRTC
    // TRTC.checkSystemRequirements().then(result => {
    //   if (!result) {
		  // alert("该浏览器在不支持")
		  // console.log('Your browser is not compatible with TRTC! Please download Chrome M72+')
    //   }
    // });
  }
  
  //进房成功向患者发起提醒
  sendVideoMsg(){
	  var orderNo= sessionStorage.getItem("orderNo");
	  var orderType= sessionStorage.getItem("orderType");
	  var docNo = sessionStorage.getItem("docNo");
	  var data={
	  		  orderNo:orderNo,
			  orderType:orderType,
			  docNo:docNo,
			  colseType:'0'
	  }
	  console.log("orderNo---------"+orderNo)
	  console.log("orderType---------"+orderType)
	  $.post({
	      url: api.sendVideoMsg,
	      data: JSON.stringify(data),
	      dataType: "json",
	      contentType: 'application/json;charset=UTF-8',
	      success: function (res) {
	  			  console.log(res)
	  		  },
	  		  fail:function (r) {
	  			 alert(r.retMsg)
	  		  }
	  })
  }
  
    //患者进入通话更改订单状态
  updateConsultationState(){
	  console.log('updateConsultationState-------------------------------');
	  var orderNo= sessionStorage.getItem("orderNo");
	  var orderType= sessionStorage.getItem("orderType") |4;
	  var data={
	  		  orderNo:orderNo,
			  orderType:orderType
	  }
	  console.log("orderNo---------"+orderNo)
	  console.log("orderType---------"+orderType)
	  data = JSON.stringify(data);
	  $.post({
	      url: api.updateConsultationState,
	      data: data,
	      dataType: "json",
	      contentType: 'application/json;charset=UTF-8',
	      success: function (res) {
	  			  console.log(res)
	  		  },
	  		  fail:function (r) {
	  			 alert(r.retMsg)
	  		  }
	  })
	  
  }
  
  async switchDevice(cameraId){
	  //设置摄像头
	//移动设备下 user 前置,   environment 后置
	 this.localStream_.switchDevice('video', cameraId).then(() => {
		console.log("切换成功")
	});
  }

  async join() {
	  
	  
    if (this.isJoined_) {
      console.warn('duplicate RtcClient.join() observed');
      return;
    }

    // create a client for RtcClient
    this.client_ = TRTC.createClient({
      mode: 'videoCall', // 实时通话模式
      sdkAppId: this.sdkAppId_,
      userId: this.userId_,
      userSig: this.userSig_
    });
    // 处理 client 事件
    this.handleEvents();

    try {
      // join the room
      await this.client_.join({ roomId: this.roomId_ });
      console.log('join room success');
      this.isJoined_ = true;
	  $("#imgs").show();
	  $(".load-modal").remove();
	  
    } catch (error) {
      console.error('failed to join room because: ' + error);
      return;
    }

    try {
      // 采集摄像头和麦克风视频流
      await this.createLocalStream({ audio: true, video: true });
      console.log('createLocalStream with audio/video success');
	  this.sendVideoMsg();
    } catch (error) {
      console.error('createLocalStream with audio/video failed: ' + error);
	  // alert(
	  //   '请确认已连接摄像头和麦克风并授予其访问权限！'
	  // );
      try {
        // fallback to capture camera only
        await this.createLocadlStream({ audio: true, video: true });
      } catch (error) {
        console.error('createLocalStream with video failed: ' + error);
		  alert("获取摄像头和麦克风失败!")
		  this.leave();
        return;
      }
    }

    this.localStream_.on('player-state-changed', event => {
      console.log(`local stream ${event.type} player is ${event.state}`);
      if (event.type === 'video' && event.state === 'PLAYING') {
        // dismiss the remote user UI placeholder
      } else if (event.type === 'video' && event.state === 'STOPPPED') {
        // show the remote user UI placeholder
      }
    });

    // 在名为 ‘local_stream’ 的 div 容器上播放本地音视频
    this.localStream_.play('local_stream');

    // publish local stream by default after join the room
    await this.publish();
  }

  async leave() {
    if (!this.isJoined_) {
      console.warn('leave() - leave without join()d observed');
      return;
    }

    if (this.isPublished_) {
      // ensure the local stream has been unpublished before leaving.
      await this.unpublish(true);
    }

    try {
      // leave the room
      await this.client_.leave();
      this.isJoined_ = false;
    } catch (error) {
      console.error('failed to leave the room because ' + error);
      location.reload();
    } finally {
      // 停止本地流，关闭本地流内部的音视频播放器
      this.localStream_.stop();
      // 关闭本地流，释放摄像头和麦克风访问权限
      this.localStream_.close();
      this.localStream_ = null;
    }
  }

  async publish() {
    if (!this.isJoined_) {
      console.warn('publish() - please join() firstly');
      return;
    }
    if (this.isPublished_) {
      console.warn('duplicate RtcClient.publish() observed');
      return;
    }
    try {
      // 发布本地流
      await this.client_.publish(this.localStream_);
      this.isPublished_ = true;
    } catch (error) {
      console.error('failed to publish local stream ' + error);
      this.isPublished_ = false;
    }
  }

  async unpublish(isLeaving) {
    if (!this.isJoined_) {
      console.warn('unpublish() - please join() firstly');
      return;
    }
    if (!this.isPublished_) {
      console.warn('RtcClient.unpublish() called but not published yet');
      return;
    }

    try {
      // 停止发布本地流
      await this.client_.unpublish(this.localStream_);
      this.isPublished_ = false;
    } catch (error) {
      console.error('failed to unpublish local stream because ' + error);
      if (!isLeaving) {
        console.warn('leaving the room because unpublish failure observed');
        this.leave();
      }
    }
  }

  async createLocalStream(options) {
    this.localStream_ = TRTC.createStream({
      audio: options.audio, // 采集麦克风
      video: options.video, // 采集摄像头
      userId: this.userId_
      // cameraId: getCameraId(),
      // microphoneId: getMicrophoneId()
    });
    // 设置视频分辨率帧率和码率
    this.localStream_.setVideoProfile('480p');
	//移动设备下 user 前置,   environment 后置
	 this.localStream_.switchDevice('video', 'user').then(() => {
	});

    await this.localStream_.initialize();
	
	
  }

  handleEvents() {
    // 处理 client 错误事件，错误均为不可恢复错误，建议提示用户后刷新页面
    this.client_.on('error', err => {
      console.error(err);
       location.reload();
    });

    // 处理用户被踢事件，通常是因为房间内有同名用户引起，这种问题一般是应用层逻辑错误引起的
    // 应用层请尽量使用不同用户ID进房
    this.client_.on('client-banned', err => {
      console.error('client has been banned for ' + err);
      // location.reload();
    });

    // 远端用户进房通知 - 仅限主动推流用户
    this.client_.on('peer-join', evt => {
		
      const userId = evt.userId;
	  console.log('peer-join-------------------------------' + userId);
      this.updateConsultationState()
    });
    // 远端用户退房通知 - 仅限主动推流用户
    this.client_.on('peer-leave', evt => {
      const userId = evt.userId;
      console.log('peer-leave ' + userId);
	  
	  //远程用户挂断时, 同时关闭当前通话
	  this.leave();
    });

    // 处理远端流增加事件
    this.client_.on('stream-added', evt => {
      const remoteStream = evt.stream;
      const id = remoteStream.getId();
      const userId = remoteStream.getUserId();
      console.log(`remote stream added: [${userId}] ID: ${id} type: ${remoteStream.getType()}`);
      console.log('subscribe to this remote stream');
      // 远端流默认已订阅所有音视频，此处可指定只订阅音频或者音视频，不能仅订阅视频。
      // 如果不想观看该路远端流，可调用 this.client_.unsubscribe(remoteStream) 取消订阅
      this.client_.subscribe(remoteStream);
    });

    // 远端流订阅成功事件
    this.client_.on('stream-subscribed', evt => {
      const remoteStream = evt.stream;
      const id = remoteStream.getId();
      this.remoteStreams_.push(remoteStream);
      addView(id);
      // 在指定的 div 容器上播放音视频
      remoteStream.play(id);
	 local_rang(0)
      console.log('stream-subscribed ID: ', id);
    });

    // 处理远端流被删除事件
    this.client_.on('stream-removed', evt => {
      const remoteStream = evt.stream;
      const id = remoteStream.getId();
      // 关闭远端流内部的音视频播放器
      remoteStream.stop();
      this.remoteStreams_ = this.remoteStreams_.filter(stream => {
        return stream.getId() !== id;
      });
      removeView(id);
      console.log(`stream-removed ID: ${id}  type: ${remoteStream.getType()}`);
    });

    // 处理远端流更新事件，在音视频通话过程中，远端流音频或视频可能会有更新
    this.client_.on('stream-updated', evt => {
      const remoteStream = evt.stream;
      console.log(
        'type: ' +
          remoteStream.getType() +
          ' stream-updated hasAudio: ' +
          remoteStream.hasAudio() +
          ' hasVideo: ' +
          remoteStream.hasVideo()
      );
    });

    // 远端流音频或视频mute状态通知
    this.client_.on('mute-audio', evt => {
      console.log(evt.userId + ' mute audio');
    });
    this.client_.on('unmute-audio', evt => {
      console.log(evt.userId + ' unmute audio');
    });
    this.client_.on('mute-video', evt => {
      console.log(evt.userId + ' mute video');
    });
    this.client_.on('unmute-video', evt => {
      console.log(evt.userId + ' unmute video');
    });

    // 信令通道连接状态通知
    this.client_.on('connection-state-changed', evt => {
      console.log(`RtcClient state changed to ${evt.state} from ${evt.prevState}`);
    });
  }
}
