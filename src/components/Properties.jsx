import React, { useState, useEffect } from 'react';
import { Spinner } from 'react-bootstrap';
import TextField from './TextField';
import SelectField from './SelectField';
import useProperties from '../hooks/useProperties';
import bend90 from '../assets/90.png';
import bend135 from '../assets/135.png';
import bend180 from '../assets/180.png';

/* =========================
   Constants (moved outside)
   ========================= */

const MAIN_BENDS = ['None', '90', '180'];
const STIRRUP_BENDS = ['90', '135', '180'];

const ALL_SIZES = ['#3', '#4', '#5', '#6', '#7', '#8', '#9', '#10', '#11', '#14', '#18'];
const STIRRUP_SIZES = ['#3', '#4', '#5', '#6', '#7', '#8'];

const BEND_IMAGES = {
  '90': bend90,
  '135': bend135,
  '180': bend180,
};

const TYPE_OPTIONS = ['main', 'stirrup'];

/* ========================= */

const Properties = () => {
  const [rebarInput, setRebarInput] = useState({
    type: 'main',
    size: '#5',
    bend: 'None',
  });

  const [loading, setLoading] = useState(false);

  const isStirrup = rebarInput.type === 'stirrup';

  const sizeOptions = isStirrup ? STIRRUP_SIZES : ALL_SIZES;
  const bendOptions = isStirrup ? STIRRUP_BENDS : MAIN_BENDS;

  /* =========================
     Ensure valid size
     ========================= */

  useEffect(() => {
    if (!sizeOptions.includes(rebarInput.size)) {
      setRebarInput(prev => ({
        ...prev,
        size: sizeOptions[0],
      }));
    }
  }, [rebarInput.type, rebarInput.size, sizeOptions]);

  /* =========================
     Ensure valid bend
     ========================= */

  useEffect(() => {
    if (!bendOptions.includes(rebarInput.bend)) {
      setRebarInput(prev => ({
        ...prev,
        bend: bendOptions[0],
      }));
    }
  }, [rebarInput.type, rebarInput.bend, bendOptions]);

  const {
    bar_diameter,
    bar_area,
    bar_weight,
    bar_perimeter,
    pin_diameter,
    bend_dimension,
    add_length,
  } = useProperties(rebarInput, setLoading);

  /* =========================
     Simplified change handler
     ========================= */

  const handleSelectChange = (key, value) => {
    setRebarInput(prev => ({
      ...prev,
      [key]: value,
    }));
  };

  const selectedImage = BEND_IMAGES[rebarInput.bend] ?? null;

  return (
    <div>
      <h2 className="mb-4">Input</h2>

      {loading ? (
        <div className="d-flex justify-content-center">
          <Spinner animation="border" variant="primary" />
        </div>
      ) : (
        <>
          {/* Input Section */}
          <div className="mb-4">
            <div className="row mb-3 align-items-end">
              <SelectField
                label="Type"
                value={rebarInput.type}
                onChange={handleSelectChange}
                id="type"
                options={TYPE_OPTIONS}
              />

              <SelectField
                label="Size"
                value={rebarInput.size}
                onChange={handleSelectChange}
                id="size"
                options={sizeOptions}
              />

              <SelectField
                label="Bend"
                value={rebarInput.bend}
                onChange={handleSelectChange}
                id="bend"
                options={bendOptions}
              />
            </div>
          </div>

          {/* Output Section */}
          <div>
            <h4>Output:</h4>
            <div className="row mb-3 align-items-end">
              <TextField label="Bar Diameter (in)" value={bar_diameter} readOnly id="bar_diameter" style={{ backgroundColor: '#f0f0f0' }} />
              <TextField label="Bar Area (in^2)" value={bar_area} readOnly id="bar_area" style={{ backgroundColor: '#f0f0f0' }} />
              <TextField label="Bar Weight (lb/ft)" value={bar_weight} readOnly id="bar_weight" style={{ backgroundColor: '#f0f0f0' }} />
              <TextField label="Bar Perimeter (in)" value={bar_perimeter} readOnly id="bar_perimeter" style={{ backgroundColor: '#f0f0f0' }} />
              <TextField label="Pin Diameter, D (in)" value={pin_diameter} readOnly id="pin_diameter" style={{ backgroundColor: '#f0f0f0' }} />
              <TextField label="A (in)" value={bend_dimension} readOnly id="bend_dimension" style={{ backgroundColor: '#f0f0f0' }} />
            </div>
          </div>

          {selectedImage && (
            <div className="mb-4 text-center">
              <img
                src={selectedImage}
                alt={`${rebarInput.bend} degree bend`}
                style={{ maxWidth: '300px', height: 'auto' }}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Properties;