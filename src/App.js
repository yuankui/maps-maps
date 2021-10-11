import mapboxgl from "mapbox-gl";
import mitt from 'mitt';
import { useEffect, useState } from "react";
import "./App.css";
import points1 from "./data/points1.json";
import LayerManageView from "./manage/LayerManageView";
import MapboxLanguage from '@mapbox/mapbox-gl-language';



const emitter = mitt();

const accessToken =
    "pk.eyJ1IjoieXVhbmt1aSIsImEiOiJja3VtNGhranUwNzg3MzBsaWx2dnFod2ZjIn0.gCAWnEO9GQ2reK72LZXUQA";

const defaultLayers = [
    {
        name: 'points1',
        color: "#FF0000",
        points: points1,
    },
];

function App() {
    const [, setVisible] = useState(true);
    const [layers, setLayers] = useState(defaultLayers);
    useEffect(() => {
        mapboxgl.accessToken = accessToken;
        const map = new mapboxgl.Map({
            container: "map",
            style: "mapbox://styles/mapbox/streets-v11",
            center: [113.934298, 22.506958],
            zoom: 10,
        });

        const language = new MapboxLanguage({
            defaultLanguage: 'zh-Hans'
        });
        map.addControl(language);

        const addLayer = (layer) => {
            map.addSource(layer.name, {
                type: "geojson",
                data: layer.points,
            });

            map.addLayer({
                id: "layer-" + layer.name,
                type: "circle",
                source: layer.name,
                paint: {
                    "circle-radius": 3,
                    "circle-color": layer.color,
                },
                filter: ["==", "$type", "Point"],
            });

            map.addLayer({
                id: "layer-text-" + layer.name,
                type: "symbol",
                source: layer.name,
                layout: {
                    "text-field": '{name}',
                    'text-anchor': 'left',
                    'text-size': 12,
                },
                paint: {
                    'text-color': layer.color,
                    "text-translate": [4, 4],
                    'text-halo-blur': 2,
                    "text-halo-width": 2,
                    "text-halo-color": '#FFF'
                },
                filter: ["==", "$type", "Point"],
            });
        }
        const listener = (type, data) => {
            if (type === 'toggle') {
                setVisible(prev => {
                    if (prev === true) {
                        map.setLayoutProperty('layer-points1', 'visibility', 'none');
                    } else {
                        map.setLayoutProperty('layer-points1', 'visibility', 'visible');
                    }
                    return !prev;
                })
                return;
            }

            if (type === 'add-layer') {
                addLayer(data);
            }
        };

        map.on("load", () => {

            // add layer
            for (const layer of layers) {
                addLayer(layer);
            };
        });

        // add listener
        emitter.on('*', listener);

        // destory
        return () => {
            emitter.off('*', listener);
            map.remove();
        }
    });

    return (
        <div className="App p-10 flex items-center flex-col">
            <div className="w-1/2">
                <h1 className="font-bold font-5xl">Map Demo</h1>
                <LayerManageView onAddLayer={({title, data, color}) => {
                    console.log(title, data, color);
                    setLayers(prev => [...prev, {
                        name: title,
                        color,
                        points: data,
                    }]);
                    emitter.emit('add-layer', {
                        name: title,
                        color,
                        points: data,
                    })
                }}/>
                <div id="map" className="h-10"></div>
            </div>
        </div>
    );
}

export default App;
