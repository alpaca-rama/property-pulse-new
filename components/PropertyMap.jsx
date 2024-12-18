'use client';

import {setDefaults, fromAddress} from "react-geocode";
import {useState, useEffect} from "react";
import Map, {Marker} from 'react-map-gl';
import pin from '@/assets/images/pin.svg';
import Spinner from "@/components/Spinner";
import Image from "next/image";
import 'mapbox-gl/dist/mapbox-gl.css';

export default function PropertyMap({property}) {
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);
    const [viewport, setViewport] = useState({
        latitude: 0,
        longitude: 0,
        zoom: 12,
        width: '100%',
        height: '500px',
    });
    const [loading, setLoading] = useState(true);
    const [geocodeError, setGeocodeError] = useState(false);

    setDefaults({
        key: process.env.NEXT_PUBLIC_GOOGLE_GEOCODING_API_KEY,
        language: 'en',
        region: 'us'
    });

    useEffect(() => {
        async function fetchCoords() {
            try {
                const response = await fromAddress(`${property.location.street} ${property.location.city} ${property.location.state} ${property.location.zipcode}`);

                // Check geocode results
                if (response.length === 0) {
                    setGeocodeError(true);

                    return;
                }

                const {lat, lng} = response.results[0].geometry.location;
                setLatitude(lat)
                setLongitude(lng)
                setViewport({
                    ...viewport,
                    latitude: latitude,
                    longitude: longitude,
                });
            } catch (error) {
                console.log(error);
                setGeocodeError(true);
            } finally {
                setLoading(false);
            }
        }

        fetchCoords()
    }, [])

    if (loading) return <Spinner/>

    if (geocodeError) return <div className={'text-xl'}>No location data found</div>

    return (
        !loading && (
            <Map
                mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
                mapLib={import('mapbox-gl')}
                initialViewState={{
                    longitude: longitude,
                    latitude: latitude,
                    zoom: 15,
                }}
                style={{width: '100%', height: 500}}
                mapStyle={'mapbox://styles/mapbox/streets-v9'}>
                <Marker longitude={longitude} latitude={latitude} anchor={'bottom'}>
                    <Image
                        src={pin}
                        alt={'location'}
                        width={40}
                        height={40}
                    />
                </Marker>
            </Map>
        )
    )
}