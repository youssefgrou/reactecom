import React from 'react'

import './Feature.css';
import '../home.css';
import { FeatureBank } from './FeatureBank';
import Swal from 'sweetalert2'
import AOS from 'aos';
import 'aos/dist/aos.css'; 
// ..
AOS.init();

const Feature = () => {

    const btnClik = () => {
        Swal.fire({
            icon: 'info',
            text: 'This application is currently under development and will soon be released in its full version',
            footer: 'Thanks for visiting YM STORE'
        })
    }

    return (
        <section className="features" id="Features">
            <div className="col-12 text-center values-section">
                <button className="values-button">Our features</button>
            </div>
            <div className="box-container ">
                {
                    FeatureBank.map((Feature) => (
                        <div className="box" key={Feature.id} data-aos-duration="2000" data-aos={Feature.Animation}>
                            <img src={Feature.logo} alt="" />
                            <h3>{Feature.tittle}</h3>
                            <p>{Feature.para}</p>
                            {/*<a href="" className="btn">read more</a>*/}
                            {/* <button className='btn' onClick={btnClik}>read more</button> */}
                        </div>
                    ))
                }
            </div>
        </section>
    )
}

export default Feature