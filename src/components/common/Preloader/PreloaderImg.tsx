import React from 'react';
import preLoader from './../../../assets/images/preloader.gif';
import styles from './../../Users/users.module.css';

let PreloaderImg: React.FC = (props) => {
  return (
    <div className={styles.preLoaderWrapper} style={{ backgroundColor: 'white' }}>
      <img className={styles.preLoaderWrapperImg} alt="preloader" src={preLoader} />
    </div>
  );
};

export default PreloaderImg;
