<template>
	<view class="page">
		<view class="search-block">
			<view class="search-ico-wapper">
				<image src="../../static/icos/search.png" class="search-ico"></image>
			</view>
			<input 
				type="text" 
				placeholder="搜索预告" 
				maxlength="10" 
				class="search-text"
				confirm-type="search"
				@confirm="searchMe"
			/>
		</view>
		
		<view class="movie-list page-block">
			<view class="movie-wapper" v-for="(trailer, index) in trailerList" :key="index">
				<image :src="trailer.cover" 
				:data-trailerId="trailer.id" 
				@click="showTrailer"
				class="poster"></image>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				trailerList: [],
				keywords: "",
				page: 1,
				totalPages: 1,
				pageSize: 15
			};
		},
		onLoad() {
			this.pagedTrailerList();
		},
		onReachBottom() {
			this.page += 1;
			this.pagedTrailerList();
		},
		methods: {
			pagedTrailerList() {
				
				if (this.page > this.totalPages) {
					return ;
				};
				
				uni.showLoading({
					mask:true,
					title: "请稍后。。。"
				});
				uni.showNavigationBarLoading({
					
				});
				
				//猜你喜欢
				uni.request({
					url: this.serverUrl +
					'/search/list?keywords=' + this.keywords +  
					'&page=' + this.page + 
					'&pageSize=' + this.pageSize + 
					'&qq=' + this.import_key, //仅为示例，并非真实接口地址。
						
					method:"POST",
					success: (res) => {
						if (res.data.status == 200) {
							this.trailerList = this.trailerList.concat(res.data.data.rows);
							// debugger;
							this.totalPages = res.data.data.total;
							this.page = res.data.data.page;
						}
					},
					complete: ()=> {
						uni.hideLoading();
						uni.hideNavigationBarLoading();
						// uni.stopPullDownRefresh();
					}
				});
			},
			
			searchMe(e) {
				//获取搜索的内容
				var value = e.detail.value;
				this.keywords = value;
				this.trailerList = [];
				this.page = 1;
				
				this.pagedTrailerList();
			},
			
			showTrailer(e) {
				var trailerId = e.currentTarget.dataset.trailerid;
				uni.navigateTo({
					url: "../movie/movie?trailerId=" + trailerId
				})
			}
		}
	}
</script>

<style>
	@import url("search.css");
</style>
