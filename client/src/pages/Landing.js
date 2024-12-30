import main from '../assets/images/main.svg';
import Wrapper from '../assets/wrappers/LandingPage';
import { Logo } from '../components';
import { Link } from 'react-router-dom';
const Landing = () => {
  return (
    <Wrapper>
      <nav>
        <Logo />
      </nav>
      <div className='container page'>
        {/* info */}
        <div className='info'>
          <h1>
            update <span>Karyaawan</span> Cong
          </h1>
          <p>
            Aing a,,masuk aj woe,kalau  mau daftar jadi karyawan jeri,silahkan pilih mau jadi apa?
            Kalau sudah daftar,jangan lupa untuk kasih support ke halaman Appnya yah,,cong.
          </p>
          <Link to='/register' className='btn btn-hero'>
            Login/Register
          </Link>
        </div>
        <img src={main} alt='job hunt' className='img main-img' />
      </div>
    </Wrapper>
  );
};

export default Landing;
