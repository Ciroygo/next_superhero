<template>
	<view class="page">
		<!-- 视频播放 -->
		<view class="player">
			<video 
			:src="trailerInfo.trailer"
			:poster="trailerInfo.poster"
			class="movie"
			></video>
		</view>
		<!-- 视频end -->
		
		<!-- 影片基本信息 -->
		<view class="movie-info">
			<image 
				:src="trailerInfo.cover" 
				class="cover"></image>
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
	</view>
</template>

<script>
	import trailerStars from "../../components/trailerStars.vue";
	
	export default {
		
		data() {
			return {
				trailerInfo: {}
			}
		},
		onLoad(params) {
			var trailerId = params.trailerId;
		
			// 预告片详情信息
			uni.request({
				url: this.serverUrl + '/search/trailer/' + trailerId + '?qq=' + this.import_key, 
				//仅为示例，并非真实接口地址。
				method:"POST",
				success: (res) => {
					this.trailerInfo = res.data.data;
				}
			});
		},
		methods: {
			
		},
		components:{
			trailerStars
		}
	}
</script>

<style>
	@import url("movie.css");
</style>
