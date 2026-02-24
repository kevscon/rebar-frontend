// update to get rebar props

import { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../api/api';

const useProperties = (rebarInput, setLoading) => {
  const [bar_diameter, set_bar_diameter] = useState('');
  const [bar_area, set_bar_area] = useState('');
  const [bar_weight, set_bar_weight] = useState('');
  const [bar_perimeter, set_bar_perimeter] = useState('');
  const [pin_diameter, set_pin_diameter] = useState('');
  const [bend_dimension, set_bend_dimension] = useState('');

  useEffect(() => {
    let delayTimer;
    const getProps = async () => {
      delayTimer = setTimeout(() => setLoading(true), 500);
      try {
        const response = await axios.post(`${API_URL}/props`, {
          type: rebarInput.type,
          size: rebarInput.size,
          bend: rebarInput.bend
        });
        set_bar_diameter(response.data.bar_diameter);
        set_bar_area(response.data.bar_area);
        set_bar_weight(response.data.bar_weight);
        set_bar_perimeter(response.data.bar_perimeter);
        set_pin_diameter(response.data.pin_diameter);
        set_bend_dimension(response.data.bend_dimension);
      } catch (error) {
        console.error('Error calculating:', error);
      } finally {
        clearTimeout(delayTimer);
        setLoading(false);
      }
    };

    getProps();
  }, [rebarInput]);

  return { 
    bar_diameter, 
    bar_area, 
    bar_weight,
    bar_perimeter,
    pin_diameter,
    bend_dimension
  };
};

export default useProperties;