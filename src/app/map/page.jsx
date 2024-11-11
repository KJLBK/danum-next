'use client';

import React, { useEffect, useState } from 'react';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import styles from './page.module.css';

const KakaoMap = ({
    initialLocation,
    onLocationChange,
}) => {
    const [location, setLocation] = useState(null);
    const [isScriptLoaded, setIsScriptLoaded] =
        useState(false);
    const [address, setAddress] = useState('');
    const [isAddressLoading, setIsAddressLoading] =
        useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // 초기 위치 설정
    useEffect(() => {
        if (
            initialLocation &&
            initialLocation.latitude &&
            initialLocation.longitude
        ) {
            setLocation({
                latitude: initialLocation.latitude,
                longitude: initialLocation.longitude,
            });
            setAddress(initialLocation.address || '');
            setIsAddressLoading(false);
        } else {
            // 저장된 위치가 없는 경우에만 현재 위치를 가져옴
            navigator.geolocation.getCurrentPosition(
                successHandler,
                errorHandler,
            );
        }
    }, [initialLocation]);

    const successHandler = (response) => {
        const { latitude, longitude } = response.coords;
        setLocation({ latitude, longitude });
        getAddress(latitude, longitude);
        onLocationChange({ latitude, longitude });
    };

    const errorHandler = (error) => {
        console.log(error);
        setAddress('위치를 가져오지 못했습니다.');
        setIsAddressLoading(false);
    };

    const getAddress = (latitude, longitude) => {
        if (!window.kakao || !window.kakao.maps) return;

        const geocoder =
            new window.kakao.maps.services.Geocoder();
        const coord = new window.kakao.maps.LatLng(
            latitude,
            longitude,
        );

        setIsAddressLoading(true);

        geocoder.coord2Address(
            coord.getLng(),
            coord.getLat(),
            (result, status) => {
                if (
                    status ===
                    window.kakao.maps.services.Status.OK
                ) {
                    const newAddress =
                        result[0]?.road_address
                            ?.address_name ||
                        result[0]?.address?.address_name ||
                        '주소를 찾을 수 없습니다.';
                    setAddress(newAddress);
                    onLocationChange({
                        latitude,
                        longitude,
                        address: newAddress,
                    });
                } else {
                    setAddress(
                        '주소를 가져올 수 없습니다.',
                    );
                }
                setIsAddressLoading(false);
            },
        );
    };

    useEffect(() => {
        const script = document.createElement('script');
        script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=927c5f0769bfbb1392ce9ba0d932363d&libraries=services&autoload=false`;
        script.async = true;

        script.onload = () => {
            window.kakao.maps.load(() => {
                setIsScriptLoaded(true);
            });
        };
        document.head.appendChild(script);
    }, []);

    if (!isScriptLoaded || !location) {
        return (
            <div className={styles.loading}>
                위치 불러오는 중...
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <div className={styles.location}>
                <input
                    value={address}
                    className={styles.locationInput}
                    readOnly
                />
                <button
                    type="button"
                    className={styles.openButton}
                    onClick={() => setIsModalOpen(true)}
                >
                    위치 설정
                </button>
            </div>
            {isModalOpen && (
                <div className={styles.modalOverlay}>
                    <div className={styles.modal}>
                        <div
                            className={styles.mapContainer}
                        >
                            <Map
                                center={{
                                    lat: location.latitude,
                                    lng: location.longitude,
                                }}
                                style={{
                                    width: '100%',
                                    height: '400px',
                                }}
                                level={3}
                            >
                                <MapMarker
                                    position={{
                                        lat: location.latitude,
                                        lng: location.longitude,
                                    }}
                                    draggable={true}
                                    onDragEnd={(marker) => {
                                        const lat = marker
                                            .getPosition()
                                            .getLat();
                                        const lng = marker
                                            .getPosition()
                                            .getLng();
                                        setLocation({
                                            latitude: lat,
                                            longitude: lng,
                                        });
                                        getAddress(
                                            lat,
                                            lng,
                                        );
                                    }}
                                />
                            </Map>
                        </div>
                        <p className={styles.address}>
                            {isAddressLoading
                                ? '주소를 찾는 중...'
                                : address}
                        </p>
                        <button
                            onClick={() =>
                                setIsModalOpen(false)
                            }
                            className={styles.closeButton}
                        >
                            저장
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default KakaoMap;
