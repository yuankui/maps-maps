import mitt from "mitt";
import { useMemo, useState } from "react";
import "./App.css";
import DeckGLView from "./components/DeckGLView";
import LayerListView from "./components/LayerListView";
import LayerManageView from "./components/LayerManageView";

const emitter = mitt();

const accessToken =
    "pk.eyJ1IjoieXVhbmt1aSIsImEiOiJja3VtNGhranUwNzg3MzBsaWx2dnFod2ZjIn0.gCAWnEO9GQ2reK72LZXUQA";
const styleUrl = "mapbox://styles/yuankui/ckumcg5loegxe17pr0kay2zkd";

function App() {
    const [layers, setLayers] = useState([]);

    // 新增一组位置
    const addLayer = (newLayer) => {
        const sameNameLayer = layers.filter(
            (layer) => layer.name === newLayer.name
        );
        if (sameNameLayer.length > 0) {
            throw new Error("名称重复");
        }
        setLayers([...layers, newLayer]);
        emitter.emit("add-layer", newLayer);
    };

    // 禁用
    const toggleLayer = (name) => {
        let layerVisible = false;

        const newLayers = layers.map((layer) => {
            return layer.name !== name
                ? layer
                : {
                      ...layer,
                      visible: (layerVisible = !layer.visible),
                  };
        });

        emitter.emit("set-layer-visible", {
            name: name,
            visible: layerVisible,
        });

        return setLayers(newLayers);
    };

    const visibleLayers = useMemo(() => {
        return layers.filter(layer => !!layer.visible);
    }, [layers])

    return (
        <div className="App p-10 flex items-center flex-col h-screen">
            <div className="w-3/4 h-full flex flex-col">
                <h1 className="font-bold font-5xl">Map Demo</h1>

                <div className="relative flex flex-col items-stretch flex-1">
                    {/* 地图 */}
                    
                    <DeckGLView geoJsons={visibleLayers}/>
                    {/* 控制面板 */}
                    <div className="absolute left-2 top-2 bg-white p-5 rounded w-56">
                        {/* 图层列表 */}
                        <LayerListView layers={layers} onToggle={toggleLayer} />
                        {/* 弹窗 */}
                        <LayerManageView
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
                </div>
            </div>
        </div>
    );
}

export default App;
