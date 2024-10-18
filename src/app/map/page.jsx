'use client';

import React, { useEffect, useState } from 'react';
import { Map, MapMarker } from 'react-kakao-maps-sdk';

const KakaoMap = ({ onLocationChange }) => {
    const [location, setLocation] = useState(null); // 현재 위치 (위도, 경도)를 저장하는 상태
    const [isScriptLoaded, setIsScriptLoaded] =
        useState(false); // Kakao Maps API 스크립트가 로드되었는지 확인하는 상태
    const [address, setAddress] = useState(''); // 주소를 저장할 상태
    const [isAddressLoading, setIsAddressLoading] =
        useState(true); // 주소를 찾는 중 상태 저장

    // 위치 정보 성공적으로 가져왔을 때 실행되는 함수
    const successHandler = (response) => {
        const { latitude, longitude } = response.coords; // 위도와 경도 추출
        setLocation({ latitude, longitude }); // 현재 위치를 상태로 저장
        getAddress(latitude, longitude); // 초기 주소를 가져오기 위한 함수 호출
    };

    // 위치 정보 가져오기 실패 시 호출되는 함수
    const errorHandler = (error) => {
        console.log(error); // 에러 로그 출력
        setAddress('위치를 가져오지 못했습니다.');
    };

    // Kakao Maps Geocoder를 사용해 위도와 경도로부터 주소를 얻는 함수
    const getAddress = (latitude, longitude) => {
        if (!window.kakao || !window.kakao.maps) return; // Kakao Maps API가 로드되지 않았다면 종료

        const geocoder =
            new window.kakao.maps.services.Geocoder(); // Geocoder 인스턴스 생성
        const coord = new window.kakao.maps.LatLng(
            latitude,
            longitude,
        ); // 위도와 경도를 LatLng 객체로 변환

        setIsAddressLoading(true); // 주소를 가져오는 중임을 표시

        // Geocoder를 사용해 좌표를 주소로 변환
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

                    setAddress(newAddress); // 주소 상태 업데이트
                    // 위도, 경도, 주소를 함께 부모 컴포넌트에 전달
                    onLocationChange({
                        latitude,
                        longitude,
                        address: newAddress,
                    });
                } else {
                    console.error(
                        'Failed to get address: ',
                        status,
                    ); // 실패 시 에러 로그 출력
                    setAddress(
                        '주소를 가져올 수 없습니다.',
                    );
                    onLocationChange({
                        latitude,
                        longitude,
                        address:
                            '주소를 가져올 수 없습니다.',
                    });
                }
                setIsAddressLoading(false); // 주소 로딩 완료
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
                navigator.geolocation.getCurrentPosition(
                    successHandler,
                    errorHandler,
                );
            });
        };
        document.head.appendChild(script);
    }, []);

    if (!isScriptLoaded || !location) {
        return <div>Loading...</div>; // 스크립트가 로드될 때까지 "Loading..." 메시지 표시
    }

    return (
        <div>
            <Map
                center={{
                    lat: location.latitude,
                    lng: location.longitude,
                }}
                style={{ width: '600px', height: '400px' }}
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
                        getAddress(lat, lng); // 마커가 드래그된 후 새로운 주소를 가져옴
                    }}
                />
            </Map>
            <p>
                현재 주소:{' '}
                {isAddressLoading
                    ? '주소를 찾는 중...'
                    : address}
            </p>
        </div>
    );
};

export default KakaoMap;
