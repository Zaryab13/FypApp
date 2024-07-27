import React from 'react'

const Container = ({children, className}) => {
    const classes = `max-w-[1200px] px-4 sm:px-[2rem] lg:px-[3rem] mx-auto ${className ? className : ''} `;

  return (
    <div className={classes}>
        {children}
    </div>
  )
}

export default Container
