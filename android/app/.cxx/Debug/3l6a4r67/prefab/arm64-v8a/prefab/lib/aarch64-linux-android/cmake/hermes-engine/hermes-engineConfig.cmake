if(NOT TARGET hermes-engine::libhermes)
add_library(hermes-engine::libhermes SHARED IMPORTED)
set_target_properties(hermes-engine::libhermes PROPERTIES
    IMPORTED_LOCATION "/Users/simplephi/.gradle/caches/8.11.1/transforms/5f6cf40a8b1d59de8a75ed550601ddc2/transformed/hermes-android-0.80.1-debug/prefab/modules/libhermes/libs/android.arm64-v8a/libhermes.so"
    INTERFACE_INCLUDE_DIRECTORIES "/Users/simplephi/.gradle/caches/8.11.1/transforms/5f6cf40a8b1d59de8a75ed550601ddc2/transformed/hermes-android-0.80.1-debug/prefab/modules/libhermes/include"
    INTERFACE_LINK_LIBRARIES ""
)
endif()

