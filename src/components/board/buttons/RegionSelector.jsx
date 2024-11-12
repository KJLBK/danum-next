'use client';
import { useState } from 'react';
import styles from './RegionSelector.module.css';

export default function RegionSelector({ onRegionSelect }) {
    const [selectedCity, setSelectedCity] = useState(null);
    const [selectedDistricts, setSelectedDistricts] =
        useState([]);

    const cities = {
        서울: [
            '강남구',
            '서초구',
            '송파구',
            '강동구',
            '구로구',
            '용산구',
        ],
        부산: ['해운대구', '부산진구', '동래구'],
        인천: ['남동구', '연수구', '미추홀구'],
        대구: ['수성구', '달서구', '중구'],
        광주: ['서구', '남구', '북구'],
    };

    const handleCityChange = (city) => {
        setSelectedCity(
            city === selectedCity ? null : city,
        );
        setSelectedDistricts([]);
        onRegionSelect({ city: city, district: null });
    };

    const handleDistrictChange = (district) => {
        setSelectedDistricts((prev) => {
            const newDistricts = prev.includes(district)
                ? prev.filter((d) => d !== district)
                : [...prev, district];

            onRegionSelect({
                city: selectedCity,
                district: newDistricts.join(','),
            });
            return newDistricts;
        });
    };

    return (
        <div className={styles.container}>
            <div className={styles.cityList}>
                {Object.keys(cities).map((city) => (
                    <div
                        key={city}
                        className={styles.cityGroup}
                    >
                        <label className={styles.cityLabel}>
                            <input
                                type="checkbox"
                                className={
                                    styles.hiddenCheckbox
                                }
                                checked={
                                    selectedCity === city
                                }
                                onChange={() =>
                                    handleCityChange(city)
                                }
                            />
                            <span
                                className={
                                    styles.customCheckbox
                                }
                            ></span>
                            <span
                                className={styles.cityName}
                            >
                                {city}
                            </span>
                        </label>

                        <div
                            className={`${styles.districtList} ${selectedCity === city ? styles.show : ''}`}
                        >
                            {cities[city].map(
                                (district) => (
                                    <label
                                        key={district}
                                        className={
                                            styles.districtLabel
                                        }
                                    >
                                        <input
                                            type="checkbox"
                                            className={
                                                styles.hiddenCheckbox
                                            }
                                            checked={selectedDistricts.includes(
                                                district,
                                            )}
                                            onChange={() =>
                                                handleDistrictChange(
                                                    district,
                                                )
                                            }
                                        />
                                        <span
                                            className={
                                                styles.customCheckbox
                                            }
                                        ></span>
                                        <span
                                            className={
                                                styles.districtName
                                            }
                                        >
                                            {district}
                                        </span>
                                    </label>
                                ),
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
