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
			}
		},
		onLoad() {
			// var me = this;
			
			// var serverUrl = common.serverUrl;
			// debugger;
			// var me = this.carouselList;
			// 请求轮播图数据
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
					console.log(this.hotList);
				}
			});
		},
		methods: {

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
