import React from 'react'
import Cookie from 'js-cookie'
import history from './BrowserHistory'
class Age extends React.Component {
    
    addAgeCookie=() =>  {
        Cookie.set('legalAge', 1)
        history.push('/')
    }

    render() {
        return (
        <>
            <div className='Age-header'>Are you over 21?</div>
            <button className='notLegalAgeButton'>No</button>
            <div/>
            <button className='legalAgeButton' onClick={()=>this.addAgeCookie()}>Yes</button>

            
        </>)
    }
}

export default Age