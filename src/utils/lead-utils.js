import Agility from 'agility'

const key = "leadsourcedetail";
const referrerKey = "referrer-"

const getLeadSourceDetailForForm = (formID) => {
    const leadSource = getSetLeadSource();
    if (leadSource && leadSource != "") {
        return `form-${formID}--${leadSource}`;
    } else {
        return `form-${formID}--`;
    }
}

const getLeadSource = () => {
    if(localStorage && localStorage.getItem) {
        return localStorage.getItem(key);
    }
}


const getAutopilotSession = () => {
    var autopilotSessionElem = document.getElementById("_autopilot_session_id");
    var autopilotSession = null;

    if (autopilotSessionElem) autopilotSession = autopilotSessionElem.value;

    return autopilotSession;
}

const getExternalReferrer = () => {
    if(document.referrer && document.referrer.length > 0) {
        const referrer = new URL(document.referrer); //doesn't support IE11
        const domain = referrer.hostname.toLowerCase();
        const ignoreDomains = ['agilitycms.com', 'localhost', 'agilitycms-uat.azurewebsites.net']
        //we only care about external domains
        if(!ignoreDomains.includes(domain)) {
            return `${referrerKey}${domain}`;
        }
    }
    return null;
}

const getSetLeadSource = () => {

    if(!document || !localStorage || !window) return;

    // if we have a source from QS, this wins!
    const newLeadSourceFromQS = Agility.QueryString("source");
    const externalReferrer = getExternalReferrer();
    let currentLeadSource = localStorage.getItem(key);
    
    // if we have a source from QS, always use this...
    if(newLeadSourceFromQS) {
        localStorage.setItem(key, newLeadSourceFromQS);
    } else if(externalReferrer) {

        // if we have no lead source from a previous referrer, or the current lead source is already referrer, update it with our latest referrer
        if(!currentLeadSource || currentLeadSource.indexOf(referrerKey)) {
            localStorage.setItem(key, externalReferrer);
        }
    }

    currentLeadSource = localStorage.getItem(key);

    return currentLeadSource;
}


export {
    getLeadSourceDetailForForm,
    getSetLeadSource,
    getLeadSource,
    getAutopilotSession
}