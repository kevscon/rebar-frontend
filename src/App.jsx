import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import myImage from "./assets/input_slab.png";
import TextField from './components/TextField';
import InputField from './components/InputField';
import SelectField from './components/SelectField';
import StatusBox from './components/StatusBox';
import ResultField from './components/ResultField';
import useDevLap from './hooks/useDevLap';
import { Spinner } from 'react-bootstrap';

const App = () => {
  const [rebarInput, setRebarInput] = useState({ size: "#5", spacing: 12, cover: 1 });
  const [materialInput, setMaterialInput] = useState({ f_y: 60, f_c: 4, concDensity: 150 });
  const [propsInput, setPropsInput] = useState({ epoxy_coat: "no", top_bar: "no", lambda_er: 1 })
  const [loading, setLoading] = useState(false);

  const {
    tension_development, 
    tension_hook_development, 
    tension_splice
  } = useDevLap(rebarInput, materialInput, propsInput, setLoading);

  const handleInputChange = (setter) => (key, value) => setter((prev) => ({ ...prev, [key]: parseFloat(value) }));
  const handleSelectChange = (setter) => (key, value) => setter((prev) => ({ ...prev, [key]: value }));

  return (
    <div className="container mt-5 d-flex">
      <div style={{ flex: 1 }}>
        <h2 className="mb-4">Input</h2>

        {loading ? (
          <div className="d-flex justify-content-center">
            <Spinner animation="border" variant="primary" />
          </div>
        ) : (
          <>


        {/* Rebar Input */}
        <div className="row mb-3 align-items-end">
          <SelectField label="Rebar Size" value={rebarInput.size} onChange={handleSelectChange(setRebarInput)} id="size" options={['#3', '#4', '#5', '#6', '#7', '#8', '#9', '#10', '#11']}/>
          <InputField label="Spacing (in)" value={rebarInput.spacing} onChange={handleInputChange(setRebarInput)} id="spacing" step="0.5"/>
          <InputField label="Cover (in)" value={rebarInput.cover} onChange={handleInputChange(setRebarInput)} id="cover" step="0.5"/>
        </div>

        {/* Material Input */}
        <div className="row mb-3 align-items-end">
          <SelectField label="f<sub>y</sub> (ksi)" value={materialInput.f_y} onChange={handleSelectChange(setMaterialInput)} id="f_y" options={[60, 75, 80, 100]}/>
          <InputField label="f'<sub>c</sub> (ksi)" value={materialInput.f_c} onChange={handleInputChange(setMaterialInput)} id="f_c" step="0.5"/>
          <InputField label="Conc. Density (pcf)" value={materialInput.concDensity} onChange={handleInputChange(setMaterialInput)} id="concDensity"/>
        </div>

        {/* Property Input */}
        <div className="row mb-3 align-items-end">
          <SelectField label="Epoxy Coated?" value={propsInput.epoxy_coat} onChange={handleSelectChange(setPropsInput)} id="epoxy_coat" options={["yes", "no"]}/>
          <SelectField label="Top Bar?" value={propsInput.top_bar} onChange={handleSelectChange(setPropsInput)} id="top_bar" options={["yes", "no"]}/>
          <InputField label="&lambda;<sub>er</sub>" value={propsInput.lambda_er} onChange={handleInputChange(setPropsInput)} id="lambda_er" step="0.01"/>
        </div>

        {/* Outputs */}
        <h4>Output:</h4>
        <div className="row mb-3 align-items-end">
          <TextField label="Development Length" value={tension_development} readOnly id="tension_development" style={{ backgroundColor: '#f0f0f0' }}/>
          <TextField label="Hook Development Length" value={tension_hook_development} readOnly id="tension_hook_development" style={{ backgroundColor: '#f0f0f0' }}/>
          <TextField label="Lap Splice Length" value={tension_splice} readOnly id="tension_splice" style={{ backgroundColor: '#f0f0f0' }}/>
        </div>


          </>
        )}

      </div>

    </div>
  );
};

export default App;