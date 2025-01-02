'use client';

import React, { FC } from 'react';
import {
  useLoadScript,
  GoogleMap,
  Marker,
  MarkerClusterer,
} from '@react-google-maps/api';
import { useSelector } from 'react-redux';
import { RootState } from '../../../state/redux';
import { darkMapStyle, lightMapStyle } from './maps.style';
import { GeolocatedSale } from '@/types';
 
interface CardGoogleMapProps {
  salesData?: GeolocatedSale[];
  cssProperty?: string;
}

const CardGoogleMap: FC<CardGoogleMapProps> = ({
  salesData = [],
  cssProperty = '',
}) => {
  const isDarkMode = useSelector((state: RootState) => state.global.isDarkMode);
  const defaultCenter = { lat: 40.7128, lng: -74.006 };

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
  });

  if (!isLoaded) return <div>Loading Map...</div>;

  return (
    <div className={`bg-white dark:bg-gray-700 shadow-md rounded-2xl flex flex-col ${cssProperty}`}>
      <div>
        <h2 className="text-lg font-semibold mb-2 px-7 pt-5 text-gray-700 dark:text-gray-200">
          Sales Map
        </h2>
        <hr className="border-gray-300 dark:border-gray-600" />
      </div>

      <div className="flex-grow pb-8">
        {salesData.length === 0 ? (
          <div className="p-4 text-center text-gray-500 dark:text-gray-400">
            Not sales data to show.
          </div>
        ) : (
          <GoogleMap
            mapContainerStyle={{ width: '100%', height: '100%' }}
            center={defaultCenter}
            zoom={6}
            options={{ styles: isDarkMode ? darkMapStyle : lightMapStyle }}
          >
            <MarkerClusterer>
              {(clusterer) => (
                <>
                  {salesData.map((sale) => {
                    const lat = parseFloat(sale.latitude);
                    const lng = parseFloat(sale.longitude);
                    if (isNaN(lat) || isNaN(lng)) return null;

                    return (
                      <Marker
                        key={sale.saleId}
                        position={{ lat, lng }}
                        clusterer={clusterer}
                        onClick={() =>
                          alert(
                            `Sale ID: ${sale.saleId}\nLat: ${sale.latitude}\nLng: ${sale.longitude}\nTotal Amount: $${sale.totalAmount}`
                          )
                        }
                      />
                    );
                  })}
                </>
              )}
            </MarkerClusterer>
          </GoogleMap>
        )}
      </div>
    </div>
  );
};

export default CardGoogleMap;
