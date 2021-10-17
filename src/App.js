import { useMemo, useState } from "react";
import "./App.css";
import ControlPanelView from "./components/ControlPanelView";
import DeckGLView from "./components/DeckGLView";

function App() {
    const [layers, setLayers] = useState([]);

    const visibleLayers = useMemo(() => {
        return layers.filter((layer) => !!layer.visible);
    }, [layers]);

    return (
        <div className="App p-10 flex items-center flex-col h-screen">
            <div className="w-3/4 h-full flex flex-col">
                <h1 className="font-bold font-5xl">Map Demo</h1>

                <div className="relative flex flex-col items-stretch flex-1">
                    {/* 地图 */}
                    <DeckGLView geoJsons={visibleLayers} />
                    {/* 控制面板 */}
                    <ControlPanelView
                        layers={layers}
                        onLayersChange={setLayers}
                    />
                </div>
            </div>
        </div>
    );
}

export default App;
