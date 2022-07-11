import React from 'react'
import { FiTwitter, FiGithub } from 'react-icons/fi'
import FooterStyle from '../../styles/footer.module.scss'


export default function Footer() {
  return (
    <footer className={FooterStyle['footer-contaienr']}>
      <div className={FooterStyle['inner-footer-contaienr']}>

            <h5> &copy; Movie DB 2022 </h5>
        <div className={FooterStyle['social-media-footer-container']}>
          <div>
            <a href='https://twitter.com/abdulghani_18' target="_blank" rel="noreferrer" >
                <FiTwitter strokeWidth={1} size={24} />
            </a>
          </div>
          <div>
            <a href= 'https://github.com/abdulghanialjuhi' target="_blank" rel="noreferrer" >
                <FiGithub strokeWidth={1} size={24} />
            </a>
          </div>
        </div>
        
      </div>
    </footer>
  )
}
