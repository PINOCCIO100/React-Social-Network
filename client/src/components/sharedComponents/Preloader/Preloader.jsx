import s from './Preloader.module.scss';
import loaderSVG from '../../../media/loader.svg';

function Preloader() {
  return (
    <div className={s.Preloader}>
      <img src={loaderSVG} alt="loaderSVG" />
    </div>
  );
}

export default Preloader;