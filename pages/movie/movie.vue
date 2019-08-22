<template>
	<view class="page">
		<!-- 视频播放 -->
		<view class="player">
			<video 
			id="myTrailer"
			:src="trailerInfo.trailer"
			:poster="trailerInfo.poster"
			class="movie"
			></video>
		</view>
		<!-- 视频end -->
		
		<!-- 影片基本信息 -->
		<view class="movie-info">
			<navigator :url="'../cover/cover?cover=' + trailerInfo.cover">
				<image 
					:src="trailerInfo.cover" 
					class="cover"></image>
			</navigator>
			<view class="movie-desc">
				<view class="title">{{trailerInfo.name}}</view>
				<view class="basic-info">{{trailerInfo.basicInfo}}</view>
				<view class="basic-info">{{trailerInfo.originalName}}</view>
				<view class="basic-info">{{trailerInfo.totalTime}}</view>
				<view class="basic-info">{{trailerInfo.releaseDate}}</view>
				
				<view class="score-block">
					<view class="big-score">
						<view class="score-words">综合评分：</view>
						<view class="movie-score">{{trailerInfo.score}}</view>
					</view>
					<view class="score-stars">
						<block v-if="trailerInfo.score >= 0">
							<trailerStars :showNum="0" :innerScore="trailerInfo.score"></trailerStars>
						</block>
						<view class="prise-count">
							{{trailerInfo.prisedCounts}} 人点赞
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 影片基本信息 end -->
		
		<view class="line-wapper">
			<view class="line"></view>
		</view>
		
		<!-- 剧情介绍 -->
		<view class="plots-block">
			<view class="plots-title">剧情介绍</view>
			<view class="plots-desc">{{trailerInfo.plotDesc}}</view>
		</view>
		<!-- 剧情介绍 end -->
		<!-- 演职人员 -->
		<view class="scroll-block">
			<view class="plots-title">
				演职人员
			</view>
			<scroll-view scroll-x="true" class="scroll-list">
				
				<view
					class="actor-wapper"
					v-for="(director, index) in directorArray"
					:key="index">
					<image
						:src="director.photo" 
						class="single-actor"
						mode="aspectFill"
						@click="lookStaffs"
						:data-staffIndex="index"></image>
					<view class="actor-name">
						{{director.name}}
					</view>
					<view class="actor-role">
						{{director.actName}}
					</view>
				</view>
				
				<view
					class="actor-wapper"
					v-for="(actor, index) in actorArray"
					:key="index">
					<image
						:src="actor.photo" 
						class="single-actor"
						mode="aspectFill"
						@click="lookStaffs"
						:data-staffIndex="directorArray.length + index"></image>
					<view class="actor-name">
						{{actor.name}}
					</view>
					<view class="actor-role">
						{{actor.actName}}
					</view>
				</view>
			</scroll-view>
		</view>
		<!-- 演职人员end -->
		
		<!-- 剧照 -->
		<view class="scroll-block">
			<view class="plots-title">
				剧照
			</view>
			<scroll-view scroll-x="true" class="scroll-list">
				<image 
					v-for="(img, index) in plotPicsArray"
					:key="index"
					:src="img" 
					class="scroll-image"
					mode="aspectFill" 
					@click="lookMe"
					:data-imgIndex="index"
					></image>
			</scroll-view>
		</view>
		<!-- 剧照 end -->
	</view>
</template>

<script>
	import trailerStars from "../../components/trailerStars.vue";
	
	export default {
		
		data() {
			return {
				trailerInfo: {},
				plotPicsArray: [],
				directorArray: [],
				actorArray: []
			}
		},
		onReady() {
			//页面初次渲染完成，获取视频对象
			this.videoContext = uni.createVideoContext('myTrailer')
			
		},
		onHide() {
			this.videoContext.pause();
		},
		onShow() {
			if(this.videoContext) {
				this.videoContext.play();
			}
		},
		onLoad(params) {
			var trailerId = params.trailerId;
			
			// 通过api修改导航栏属性
			uni.setNavigationBarColor({
				frontColor: "#ffffff",
				backgroundColor:"#000000"
			})
		
			// 预告片详情信息
			uni.request({
				url: this.serverUrl + '/search/trailer/' + trailerId + '?qq=' + this.import_key, 
				//仅为示例，并非真实接口地址。
				method:"POST",
				success: (res) => {
					this.trailerInfo = res.data.data;
					this.plotPicsArray = JSON.parse(this.trailerInfo.plotPics);
				}
			});
			
			// 获取导演
			uni.request({
				url: this.serverUrl + '/search/staff/' + trailerId + '/1' + '?qq=' + this.import_key, 
				//仅为示例，并非真实接口地址。
				method:"POST",
				success: (res) => {
					this.directorArray = res.data.data;
				}
			});
			
			// 获取演员
			uni.request({
				url: this.serverUrl + '/search/staff/' + trailerId + '/2' + '?qq=' + this.import_key, 
				//仅为示例，并非真实接口地址。
				method:"POST",
				success: (res) => {
					this.actorArray = res.data.data;
				}
			});
		},
		//此函数只支持小程序端 微信小程序或者群
		onShareAppMessage(res) {
			return {
				title: this.trailerInfo.name,
				path: "/pages/movie/movie?trailerId=" + this.trailerInfo.id
			}
		},
		onNavigationBarButtonTap(e) {
			var index = e.index;
			console.log(index);
		},
		methods: {
			lookMe(e) {
				var imgIndex = e.currentTarget.dataset.imgindex;
				uni.previewImage({
					urls: this.plotPicsArray,
					current: this.plotPicsArray[imgIndex]
				})
			},
			lookStaffs(e) {
				var staffIndex = e.currentTarget.dataset.staffindex;
				
				var array = this.directorArray;
				array = array.concat(this.actorArray);
				
				var urls = [];
				for (var i = 0; i < array.length; i++) {
					var tempPhoto = array[i].photo;
					urls.push(tempPhoto);
				}
				
				
				uni.previewImage({
					urls: urls,
					current: urls[staffIndex]
				})
			}
		},
		components:{
			trailerStars
		}
	}
</script>

<style>
	@import url("movie.css");
</style>
