import React from 'react';
import Cookie from 'js-cookie'
import history from './BrowserHistory'
import './Age.css'
class Age extends React.Component {
    
    addAgeCookie=() =>  {
        Cookie.set('legalAge', 1)
        history.push('/')
    }

    render() {
        return (
            <div className="ageWrap">
                <div className="ageCard">
                    <div className='ageHeader'>Are you over 21?</div>
                    <button className='notLegalAgeButton' onClick={()=>window.location.replace("https://www.kizi.com/kids")}>No</button>
                    
                    <button className='legalAgeButton' onClick={()=>this.addAgeCookie()}>Yes</button>
                </div>
            </div>)
    }
}

export default Age;