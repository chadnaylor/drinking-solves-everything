import React from 'react'
import Cookie from 'js-cookie'
class Age extends React.Component {
    
    addAgeCookie=() =>  {
        Cookie.set('legalAge', 1)
    }

    render() {
        return (
        <>
            <div className='Age-header'>Are you over 21?</div>
            <button className='legalAgeButton'>No</button>
            <div/>
            <button className='legalAgeButton'>Yes</button>

            
        </>)
    }
}

export default Age