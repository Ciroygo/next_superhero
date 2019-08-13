<template>
	<view class="page">
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" class="carousel">
			<swiper-item>
				<image src="../../static/carousel/batmanvssuperman.png" class="carousel"></image>
			</swiper-item>
			<swiper-item>
				<image src="../../static/carousel/spiderman.png" class="carousel"></image>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	export default {
		data() {
			
		},
		onLoad() {
			// 请求轮播图数据
			uni.request({
				url: 'https://www.imovietrailer.com/superhero/index/carousel/list', //仅为示例，并非真实接口地址。
				data: {
					qq: 'lee33634220'
				},
				header: {
					'content-type': 'application/x-www-form-urlencoded'
				},
				method:"POST",
				success: (res) => {
					console.log(res.data);
					res.data.data;
					this.text = 'request success';
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
