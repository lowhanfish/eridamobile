import { create } from "zustand";


const useGlobalStore = create((state)=>({
    name : "Ini dari store",
    topBar : true,
    bottomBar : true,
    visibleBar : (topVisible, bottomVisible, back) => state ({topBar:topVisible, bottomBar:bottomVisible}),
    routeBack : "Home",
    setRouteBack : (route) => state ({routeBack: route}),

}))


export default useGlobalStore
