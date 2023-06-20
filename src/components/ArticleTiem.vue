<template>
    <van-cell class="article-item" :to="'/article/'+article.art_id">
        <!-- 自定义title内容 -->
        <template #title>
            <div class="title van-multi-ellipsis--l2">{{ article.title }} </div>
        </template>
        <!-- 下方插槽 -->
        <template #label>
            <div class="cover-wrap" v-if="article.cover.type === 3">
                <div class="cover-item" v-for="(img, index ) in article.cover.images" :key="index">
                    <van-image class="img-item" fit="cover" :src="img" />
                </div>
            </div>
            <div class="label-info">
                <span>{{ article.aut_name }}</span>
                <span>{{ article.comm_count }}评论</span>
                <span>{{ article.pubdate | rev }}</span>
            </div>

        </template>
        <!-- 一张图片位置摆放 -->
        <van-image class="right-img" fit="cover" :src="article.cover.images[0]" slot="default"
            v-if="article.cover.type === 1" />
    </van-cell>
</template>

<script>
export default {
  name: 'ArticleTiem',
  props: {
    article: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="less" scoped>
.article-item {
    .title {
        font-size: 16px;
        color: #3a3a3a;
    }

    .van-cell__value {
        flex: unset;
        width: 116px;
        height: 73px;
        padding-left: 12px;
    }

    .right-img {
        width: 116px;
        height: 73px;

    }

    .label-info span {
        font-size: 11px;
        color: #b4b4b4;
        margin-right: 12px;
    }

    .cover-wrap {
        display: flex;
        padding: 15 0;

        .cover-item {
            flex: 1;
            height: 73px;

            &:not(:last-child) {
                padding-right: 7px;
            }

            .img-item {
                width: 100%;
                height: 73px;
            }
        }
    }
}</style>
