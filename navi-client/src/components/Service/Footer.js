import "../../style/Service/Footer.scss";
import navi_dark from "../../style/img/Navi_dark_logo.png";
import navi_light from "../../style/img/Navi_light_logo.png";
import { FaGithub } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";

function Footer({isDarkMode}) {
  
  return (
    <div className={`Footer ${isDarkMode ? 'dark-mode' : ''}`}>
      <img src={isDarkMode ? navi_dark : navi_light} className='footerLogo' alt="logo"/>
      <div className="footerInfo">
        <p>주식회사 NAVI | 대표 박재휘</p>
        <p>사업자 등록번호 987-65-43210</p>
        <p>천안시 동남구 백석대학로 1 본부동 512호</p>
        <p>contact@navi.co.kr</p>
      </div>
      <p className="Copyright">Copyright © Navi. AllRight</p>
      <div className="footerLink">
        <a href="https://github.com/ParkJaehwi/Navi"><button className={`footerBtn ${isDarkMode ? 'dark-mode' : ''}`}><FaGithub style={{marginTop:"1vh"}}/></button></a>
        <a href="https://github.com/ParkJaehwi/Navi"><button className={`footerBtn ${isDarkMode ? 'dark-mode' : ''}`}><FaYoutube style={{marginTop:"1vh"}}/></button></a>
      </div>
    </div>
  )
}

export default Footer;