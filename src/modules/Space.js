import React from 'react';
const Space = ({ item }) => {
  // console.log("Space", item)
  var bg='';
  if(item.customFields.backgroundColor!=='none'){
    bg=' bg-'+item.customFields.backgroundColor
  }
  var classList = 'mod-space space-'+ item.customFields.mobileSpace +' space-dt-'+item.customFields.desktopSpace + bg;
	return (
		<section className={classList}></section>
	);
}

export default Space;