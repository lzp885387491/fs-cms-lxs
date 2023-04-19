<template>
    <div class="park_monitoring">
        <div class="box">
            <div class="item" v-for="item in videoList" :key="item.id">
                <div @dblclick="ondblclick(item)" style="width: 100% !important; height: 100% !important;">
                    <video :id='item.idName' style="width: 100% !important; height: 100% !important;"
                        class="video-js vjs-fluid vjs-big-play-centered" autoplay="false">
                        <source :src=item.url type="application/x-mpegURL">
                    </video>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import videojs from 'video.js';
export default {
    data() {
        return {
            video: {},
            rightVideo: [],
            videoInstance: null,
            videoList: [
                {
                    id: 1,
                    isActive: true,
                    idName: 'lxs_myvideo1',
                    url: 'https://cmgw-vpc.lechange.com:8890/LCO/7C0C9C9RAZ1C0AF/0/1/20220330T143454/5e7ed935e38989a507d1bfcf0d6016ee.m3u8?proto=https'
                },
                {
                    id: 2,
                    isActive: false,
                    idName: 'lxs_myvideo2',
                    url: 'https://cmgw-vpc.lechange.com:8890/LCO/7C0C9D0PAZA5DDA/0/1/20220330T143518/55d0d87f67c0f0225c97aec0b3eb4fa6.m3u8?proto=https'
                },
                {
                    id: 3,
                    isActive: false,
                    idName: 'lxs_myvideo3',
                    url: 'https://cmgw-vpc.lechange.com:8890/LCO/7C0C9C9RAZ53814/0/1/20220330T143455/0d365f3d47ca04c359b83b945d5d8162.m3u8?proto=https'
                },
                {
                    id: 4,
                    isActive: false,
                    idName: 'lxs_myvideo5',
                    url: 'http://cmgw-vpc.lechange.com:8888/LCO/7C0C9D0PAZF9E52/0/1/20220330T143525/ffaf69b9650e206129e66a51764bf46e.m3u8'
                },
                {
                    id: 5,
                    isActive: false,
                    idName: 'lxs_myvideo6',
                    url: 'http://cmgw-vpc.lechange.com:8888/LCO/7C0C9D0PAZF8534/0/1/20220330T143525/290fab874d979672ebc970f4f9124df6.m3u8'
                },
                {
                    id: 6,
                    isActive: false,
                    idName: 'lxs_myvideo9',
                    url: 'http://cmgw-vpc.lechange.com:8888/LCO/7C0C9C7RAZF87CB/0/1/20220330T143454/224a3a865ea07949de88c6ebc6ae451b.m3u8'
                },
            ],
        };
    },
    mounted() {
        this.initVideoDom()
    },
    methods: {
        // 初始化video的配置
        initVideo(id) {
            let init = {
                controls: true, // 是否显示控制条
                preload: 'auto',
                autoplay: false,
                fluid: true, // 自适应宽高
                language: 'zh-CN', // 设置语言
                muted: true, // 是否静音
                inactivityTimeout: false,
                controlBar: { // 设置控制条组件
                    /* 使用children的形式可以控制每一个控件的位置，以及显示与否 */
                    children: [
                        { name: 'playToggle' }, // 播放按钮
                        {
                            name: 'volumePanel', // 音量控制
                            inline: false, // 不使用水平方式
                        },
                        { name: 'FullscreenToggle' } // 全屏
                    ]
                }
            }
            this.videoInstance = videojs(id, init, () => {
                this.videoInstance.play();
            })
        },
        // 初始化渲染video的dom
        initVideoDom() {
            this.$nextTick(() => {
                this.videoList.forEach(element => {
                    this.initVideo(element.idName);
                });
            })
        },
        // 销毁
        beforeDestroy() {
            if (this.videoInstance) {
                this.videoInstance.dispose(); // dispose()会直接删除Dom元素
            }
        },
    },
};
</script>

<style scoped lang="scss">
.park_monitoring {
    width: 100%;
    height: 100%;
    overflow: hidden;

    .box {
        width: 100%;
        height: 100%;
        overflow: scroll;
        padding: 10px;
        box-sizing: border-box;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;

        .item {
            width: 530px !important;
            max-height: 420px !important;
            background-color: #ccc;
            margin: 10px 0;
        }
    }
}

:deep(.video-js, .vjs-fluid, .vjs-big-play-centered) {
    padding: 0 !important;
}

.mt-10 {
    margin-top: 10px;
}

::-webkit-scrollbar {
    display: none;
    /* Chrome Safari */
}

.flex-i_j-center {
    display: flex;
    align-items: center;
    flex-direction: column;
}
</style>
