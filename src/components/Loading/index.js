import React from 'react';
import { useSelector } from 'react-redux'
import "./style.scss";

function Loading(props) {
  const loadingState = useSelector(state => state.loadingState) || props.show;

  return (
    <div style={{
      display: loadingState.loading.isLoading !== 0 ? 'block' : 'none',
      position: 'fixed',
      left: '0px',
      top: '0px',
      width: '100vw',
      height: '100vh',
      zIndex: 10000,
      backgroundColor: 'white',
      opacity: '0.5',
    }}>
      <div style={{
        position: 'absolute',
        left: '50%',
        top: '40%',
        margin: 'auto',
      }}>
        {/* <ProgressSpinner /> */}
        <img src="/assets/layout/icons/gearvn.svg" />
        <img className="spin" src="/assets/layout/icons/4-dot.svg" />
        <h1 style={{color:"#222222"}}>Loading...</h1>
      </div>
    </div>
  );
}

export default Loading;