import { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../api/api';

const useDevLap = (rebarInput, materialInput, propsInput, setLoading) => {
  const [tension_development, set_tension_development] = useState('');
  const [tension_hook_development, set_tension_hook_development] = useState('');
  const [tension_splice, set_tension_splice] = useState('');

  useEffect(() => {
    let delayTimer;
    const calcDevLap = async () => {
      delayTimer = setTimeout(() => setLoading(true), 500);
      try {
        const response = await axios.post(`${API_URL}/dev-lap`, {
          size: rebarInput.size,
          spacing: rebarInput.spacing,
          cover: rebarInput.cover,
          f_y: materialInput.f_y,
          f_c: materialInput.f_c,
          concDensity: materialInput.concDensity,
          epoxy_coat: propsInput.epoxy_coat,
          top_bar: propsInput.top_bar,
          lambda_er: propsInput.lambda_er
        });
        set_tension_development(response.data.tension_development);
        set_tension_hook_development(response.data.tension_hook_development);
        set_tension_splice(response.data.tension_splice);
      } catch (error) {
        console.error('Error calculating:', error);
      } finally {
        clearTimeout(delayTimer);
        setLoading(false);
      }
    };

    calcDevLap();
  }, [rebarInput, materialInput, propsInput]);

  return { 
    tension_development, 
    tension_hook_development, 
    tension_splice
  };
};

export default useDevLap;