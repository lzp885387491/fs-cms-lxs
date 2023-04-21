import { ref } from 'vue'
import { defineStore } from 'pinia'
import { getUserInfoApi } from '@/api/api'

export const useUserStore = defineStore('user', () => {
    const userInfo = ref({});

    async function getUserInfo() {
        return getUserInfoApi().then(res=>{
            if (res.data.code == 200 || res.status == 201) {
                userInfo.value = res.data.data;
            }
            return Promise.resolve(res.data.data);
        });
    }

    return { getUserInfo, userInfo }
})
