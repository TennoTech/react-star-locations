import React, { useEffect, useRef, useState, createElement } from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';

const positions = [
    {
        title: "Bubble World",
        location: {
            lat: 49.2869718,
            lng: -123.1272012,
        },
        stars: 4,
        description: "Bubble Tea Cafe",
        link: 'https://www.instagram.com/robsonbubbleworld/'
    },
    {
        title: "Time Out Cafe",
        location: {
            lat: 49.2873707,
            lng: -123.1248194,
        },
        stars: 3,
        description: "Small Local Cafe",
        link: 'https://timeoutcafe.ca/'

    },
    {
        title: "ThaiGo",
        location: {
            lat: 49.26832,
            lng: -123.0050552,
        },
        stars: 5,
        description: "Thai Food Restaurant",
        link: 'https://broadwayfoodsgroup.ca/thaigo/'
    }
]

const StoreInfo = () => {
    const [selected, setSelected] = useState(positions[0]);
    const [locationIndex, setLocationIndex] = useState(0);
    const [size, setSize] = useState(undefined);
    const infoWindowOptions = { pixelOffset: size };
    const timer = useRef(null);

    // setting offset for infowindow
    const createOffsetSize = () => setSize(new window.google.maps.Size(0, -40));

    const transition = () => {
        // resetting locations
        if (locationIndex !== (positions.length - 1)) {
            setLocationIndex(locationIndex + 1);
            onSelect(positions[locationIndex + 1]);
        }
        else {
            setLocationIndex(0);
            onSelect(positions[0]);
        }
    }
    const onSelect = item => {
        setSelected(item);
    }

    useEffect(() => {
        // switching location every 5 sec
        timer.current = setTimeout(transition, 5000);

    }, [locationIndex]);

    return (
        <LoadScript googleMapsApiKey="AIzaSyC4S0qSH5VkhZ6LNXFnsKXefmNLfktBheI"
            onLoad={() => createOffsetSize()}
        >
            <GoogleMap
                mapContainerStyle={{ height: "100vh", width: "100%" }}
                center={positions[locationIndex].location}
                zoom={16}
            >
                {
                    positions?.map((i, key) => (
                        <div key={key}>
                            <Marker
                                position={i.location}
                                label={{
                                    color: "white",
                                    fontFamily: "sans-serif",
                                    fontSize: "15px",
                                    fontWeight: "100",
                                    text: (key + 1).toString()
                                }}
                                onClick={() => onSelect(i)}
                            />
                        </div>
                    ))
                }

                {
                    selected.location && (
                        <InfoWindow
                            position={selected.location}
                            options={infoWindowOptions}
                            onCloseClick={() => onSelect({})}
                        >
                            <div className='info-container'>
                                <a href={selected.link} target="_blank">
                                    <h1>{selected.title}</h1>
                                    <p>{selected.description}</p>
                                </a>
                                <span className='review-holder'>
                                    <span className='review'>
                                        {Array.from(Array(selected.stars), (i, key) => {
                                            return createElement('span', { key: key });
                                        })}
                                    </span>
                                </span>
                            </div>
                        </InfoWindow>
                    )
                }

            </GoogleMap >
        </LoadScript >
    );
};

export default StoreInfo;
