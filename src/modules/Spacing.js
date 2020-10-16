import React from 'react';
const Spacing = ({ item }) => {
  console.log('Spacing', item)
  const fields = item.customFields
  let classSpace = 'mod-space '
  if (fields.mobileSpace || Number(fields.mobileSpace) >= 0) {
    classSpace += `space-${fields.mobileSpace} `
  }
  if (fields.desktopSpace || Number(fields.desktopSpace) >= 0 ) {
    classSpace += `space-dt-${fields.desktopSpace} `
  }
  if(fields.backgroundColor && fields.backgroundColor !== 'none'){
    classSpace += `bg-${fields.backgroundColor}`
  }
  if (classSpace.length > 0) {
    return (<section className={classSpace}></section>)
  } else {
    return null
  }
}

export default Spacing;