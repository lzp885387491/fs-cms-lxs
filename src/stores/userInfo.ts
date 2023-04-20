import { ref } from 'vue'
import { defineStore } from 'pinia'

export const userStore = defineStore('user', () => {
    const userStoreData: any = ref({

    })

    function setUserStore(key: string, value: any) {
        userStoreData[key] = value;
    }
    function getUserStore(key: string) {
        return userStoreData[key];
    }
    return { setUserStore, getUserStore }
})
