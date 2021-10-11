import { useEffect, useState } from "react";
import "./App.css";
import points1 from "./data/points1.json";
import points2 from "./data/points2.json";
import points3 from "./data/points3.json";
import mapboxgl from "mapbox-gl";

import mitt from 'mitt';

const emitter = mitt();

const accessToken =
    "pk.eyJ1IjoieXVhbmt1aSIsImEiOiJja3VtNGhranUwNzg3MzBsaWx2dnFod2ZjIn0.gCAWnEO9GQ2reK72LZXUQA";

const layers = [
    {
        name: 'points1',
        color: "#FF0000",
        points: points1,
    },
    {
        name: 'points2',
        color: "#00FF00",
        points: points2,
    },
    {
        name: 'points3',
        color: "#0000FF",
        points: points3,
    },
];

function App() {
    const [visible, setVisible] = useState(true);
    useEffect(() => {
        mapboxgl.accessToken = accessToken;
        const map = new mapboxgl.Map({
            container: "map",
            style: "mapbox://styles/mapbox/streets-v11",
            center: [113.934298, 22.506958],
            zoom: 10,
        });

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
            }
        };
        map.on("load", () => {
            // add layer
            for (const layer of layers) {
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
            };
        });

        // add listener
        emitter.on('*', listener);

        // destory
        return () => {
            emitter.off('*', listener);
        }


    }, []);

    return (
        <div className="App p-10 flex items-center flex-col">
            <div className="w-1/2">
                <h1 className="font-bold font-5xl">Map Demo</h1>
                <button 
                    onClick={e => {
                        emitter.emit('toggle', {});
                    }}
                    className='px-4 py-2 bg-blue-400 rounded shadow-md hover:bg-blue-700'>Toggle</button>
                <div id="map" className="h-10"></div>
            </div>
        </div>
    );
}

export default App;
