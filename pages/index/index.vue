<template>
	<view class="page">
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" class="carousel">
			<swiper-item v-for="(carousel,index) in carouselList" :key="index">
				<image :src="carousel.image" class="carousel"></image>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				carouselList: []
			}
		},
		onLoad() {
			// var me = this.carouselList;
			// 请求轮播图数据
			uni.request({
				url: 'https://www.imovietrailer.com/superhero/index/carousel/list', //仅为示例，并非真实接口地址。
				data: {
					qq: 'lee98086139'
				},
				header: {
					'content-type': 'application/x-www-form-urlencoded'
				},
				method:"POST",
				success: (res) => {
					this.carouselList = res.data.data;
					console.log(this.carouselList);
				}
			});
		},
		methods: {

		}
	}
</script>

<style>
	@import url("index.css");
</style>
