import { create } from "zustand";


const useGlobalStore = create((state)=>({
    name : "Ini dari store",
    topBar : true,
    bottomBar : true,

    // Actions
    visibleBar : (topVisible, bottomVisible) => state ({topBar:topVisible, bottomBar:bottomVisible})
}))


export default useGlobalStore
