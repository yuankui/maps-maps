import { useEffect } from "react";
import "./App.css";
import json from "./data/points1.json";
import mapboxgl from "mapbox-gl";

function App() {
    useEffect(() => {
        mapboxgl.accessToken =
            "pk.eyJ1IjoieXVhbmt1aSIsImEiOiJja3VtNGhranUwNzg3MzBsaWx2dnFod2ZjIn0.gCAWnEO9GQ2reK72LZXUQA";
        const map = new mapboxgl.Map({
            container: "map", // container ID
            style: "mapbox://styles/mapbox/streets-v11", // style URL
            center: [-74.5, 40], // starting position [lng, lat]
            zoom: 9, // starting zoom
        });
    }, []);
    return (
        <div className="App">
            <h1>Map Demo</h1>
            <div id="map"></div>
        </div>
    );
}

export default App;
