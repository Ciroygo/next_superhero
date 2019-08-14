<template>
	<view class="page">
		<!-- 轮播图 -->
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" class="carousel">
			<swiper-item v-for="(carousel,index) in carouselList" :key="index">
				<image :src="carousel.image" class="carousel"></image>
			</swiper-item>
		</swiper>
		<!-- 轮播图end -->
		
		<!-- 热门超英 -->
		<view class="page-block super-hot">
			<view class="hot-title-wrapper">
				<image src="../../static/icos/hot.png" class="hot-ico"></image>
				<view class="hot-title">
					热门超英
				</view>
			</view>
		</view>
		
		<scroll-view scroll-x="true" class="page-block hot">
			<view class="single-poster" v-for="(poster, index) in hotList" :key="index">
				<view class="poster-wrapper">
					<image :src="poster.cover" class="poster"></image>
					<view class="movie-name">
						{{poster.name}}
					</view>

					<trailerStars showNum="1" :innerScore="poster.score"></trailerStars>

				</view>
			</view>			
		</scroll-view>
		<!-- 热门超英end -->
		
		<!-- 热门预告 -->
		<view class="page-block super-hot">
			<view class="hot-title-wrapper">
				<image src="../../static/icos/interest.png" class="hot-ico"></image>
				<view class="hot-title">
					热门预告
				</view>
			</view>
		</view>
		<view class="page-block hot-video">
			<video 
			v-for="(trailer, index) in trailerList"
			:key="index"
			:src="trailer.trailer" 
			:poster="trailer.poster"
			class="hot-movie-single"
			></video>
		</view>
		
		<!-- 热门预告end -->
		
		<!-- 猜你喜欢 -->
		<view class="page-block super-hot">
			<view class="hot-title-wrapper">
				<image src="../../static/icos/guess-u-like.png" class="hot-ico"></image>
				<view class="hot-title">
					猜你喜欢
				</view>
			</view>
		</view>
		<view class="page-block guess-u-like">
			<view class="single-like-movie" v-for="(guess, index) in guessULikeList" :key="index">
				<image :src="guess.cover" class="like-movie"></image>
				<view class="movie-desc">
					<view class="movie-title">
						{{guess.name}}
					</view>
					<trailerStars :innerScore="7.1" showNum="0"></trailerStars>
					<view class="movie-info">
						{{guess.basicInfo}}
					</view>
					<view class="movie-info">
						{{guess.releaseDate}}
					</view>
				</view>
				<view class="movie-oper" :data-index="index" @click="praiseMe">
					<image src="../../static/icos/praise.png" class="praise-ico"></image>
					<view class="praise-me">
						点赞
					</view>
					<view :animation="animationDataArr[index]" class="praise-me animation-opacity">
						+1
					</view>
				</view>
			</view>
			
		</view>
		<!-- 猜你喜欢end -->
	</view>
</template>

<script>
	import common from "../../common/common.js";
	import helloComp from "../../components/helloComp.vue"
	import trailerStars from "../../components/trailerStars.vue"
	
	export default {
		data() {
			return {
				carouselList: [],
				hotList: [],
				trailerList: [],
				animationData: {},
				animationDataArr: [
					{},{},{},{},{}
				],
				guessULikeList: []
			}
		},
		onUnload() {
			this.animation = {};
			
			this.animationDataArr = [
				{},{},{},{},{}
			];
		},
		onPullDownRefresh() {
			this.refresh();
		},
		onLoad() {
			// var me = this;
			
			// var serverUrl = common.serverUrl;
			// debugger;
			// var me = this.carouselList;
			// 请求轮播图数据
			
		// #ifdef APP-PLUS || MP-WEIXIN
		this.animation = uni.createAnimation();
		// #endif
			
		
			
			
			uni.request({
				url: this.serverUrl + '/index/carousel/list', //仅为示例，并非真实接口地址。
				data: {
					qq: 'lee98086139'
				},
				header: {
					'content-type': 'application/x-www-form-urlencoded'
				},
				method:"POST",
				success: (res) => {
					this.carouselList = res.data.data;
					// console.log(this.carouselList);
				}
			});
			
			// 查询热门超英
			uni.request({
				url: this.serverUrl + '/index/movie/hot?type=superhero&qq=lee98086139', //仅为示例，并非真实接口地址。


				method:"POST",
				success: (res) => {
					this.hotList = res.data.data;
				}
			});
			
			// 预告片
			uni.request({
				url: this.serverUrl + '/index/movie/hot?type=trailer&qq=lee98086139', //仅为示例，并非真实接口地址。
		
				method:"POST",
				success: (res) => {
					this.trailerList = res.data.data;
				}
			});
			
			//猜你喜欢
			uni.request({
				url: this.serverUrl + '/index/guessULike?qq=lee98086139', //仅为示例，并非真实接口地址。
					
				method:"POST",
				success: (res) => {
					this.guessULikeList = res.data.data;
		
				}
			});
			
			this.refresh();
		},
		methods: {
			refresh() {
				
				uni.showLoading({
					mask:true
				});
				uni.showNavigationBarLoading({
					
				});
				
				//猜你喜欢
				uni.request({
					url: this.serverUrl + '/index/guessULike?qq=lee98086139', //仅为示例，并非真实接口地址。
						
					method:"POST",
					success: (res) => {
						this.guessULikeList = res.data.data;
				
					},
					complete: ()=> {
						uni.hideLoading();
						uni.hideNavigationBarLoading();
						uni.stopPullDownRefresh();
					}
				});
			},
			// 实现点赞动画效果
			praiseMe(e) {
				// #ifdef APP-PLUS || MP-WEIXIN
				var index = e.currentTarget.dataset.index;
				
				this.animation.translateY(-60).opacity(1).step({
						duration:400,
					})
				this.animationData = this.animation;
				this.animationDataArr[index] = this.animationData.export();
				
				setTimeout(function() {
					this.animation.translateY(0).opacity(0).step({
						duration:0,
					});
					this.animationData = this.animation;
					this.animationDataArr[index] = this.animationData.export();
				}.bind(this), 500);
				// #endif
			}
		},
		
		components:{
			helloComp,
			trailerStars
		}
	}
</script>

<style>
	@import url("index.css");
</style>
