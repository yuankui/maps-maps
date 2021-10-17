import LayerListView from "./LayerListView";
import AddLayerView from "./AddLayerView";

/**
 * 地图控制面板
 * @returns 
 */
function LayerManageView({ layers, onLayersChange }) {
    // 新增一组位置
    const addLayer = (newLayer) => {
        const sameNameLayer = layers.filter(
            (layer) => layer.name === newLayer.name
        );
        if (sameNameLayer.length > 0) {
            throw new Error("名称重复");
        }
        onLayersChange([...layers, newLayer]);
    };

    // 禁用
    const toggleLayer = (name) => {
        const newLayers = layers.map((layer) => {
            return layer.name !== name
                ? layer
                : {
                    ...layer,
                    visible: !layer.visible,
                };
        });

        return onLayersChange(newLayers);
    };

    return (
        <div className="absolute left-2 top-2 bg-white p-5 rounded w-56">
            {/* 图层列表 */}
            <LayerListView layers={layers} onToggle={toggleLayer} />
            {/* 弹窗 */}
            <AddLayerView
                onAddLayer={({ name, points, color }) => {
                    addLayer({
                        name,
                        color,
                        points,
                        visible: true,
                    });
                }}
            />
        </div>
    );
}

export default LayerManageView;
