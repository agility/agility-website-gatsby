const key = "leadsourcedetail";
const referrerKey = "referrer-"

const getLeadSourceDetailForForm = (formID) => {
	const leadSource = getSetLeadSource();
	if (leadSource && leadSource !== "") {
		return `form-${formID}--${leadSource}`;
	} else {
		return `form-${formID}--`;
	}
}

const getLeadSource = () => {
	if (localStorage && localStorage.getItem) {
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
	if (document.referrer && document.referrer.length > 0) {
		const referrer = new URL(document.referrer); //doesn't support IE11
		const domain = referrer.hostname.toLowerCase();
		const ignoreDomains = ['agilitycms.com', 'localhost', 'agilitycms-uat.azurewebsites.net']
		//we only care about external domains
		if (!ignoreDomains.includes(domain)) {
			return `${referrerKey}${domain}`;
		}
	}
	return null;
}

const queryString = function (name, url) {
	/// <summary>
	/// Gets a variable from the query string.
	/// </summary>
	/// <param name="name" type="String">QueryString variable to retrieve.</param>
	/// <param name="url" type="String">(Optional) the url to take the querystring from.  If this is not present, the current url is used.</param>

	if (url === undefined || url === null || url === "") {
		url = window.location.href;
	}

	var index = url.indexOf("?");
	if (index < 1 && index === url.length - 2) return null;
	if (url.indexOf("#") !== -1) {
		url = url.substring(0, url.indexOf("#"));
	}

	var qstr = url.substring(index + 1, url.length);

	var ary1 = qstr.split("&");
	var retValue = null;

	for (var i in ary1) {
		var q = ary1[i];
		var ary2 = q.split("=");
		if (ary2.length === 2) {
			if (decodeURIComponent(ary2[0]).toLowerCase() === name.toLowerCase()) {

				retValue = ary2[1];
				retValue = retValue.replace(/\+/g, "%20");
				retValue = decodeURIComponent(retValue);
				break;
			}
		}
	}

	return retValue;

}

const getSetLeadSource = () => {

	if (typeof window === 'undefined') {
		return;
	}

	// if we have a source from QS, this wins!
	const newLeadSourceFromQS = queryString("source");
	const externalReferrer = getExternalReferrer();
	let currentLeadSource = localStorage.getItem(key);

	// if we have a source from QS, always use this...
	if (newLeadSourceFromQS) {
		localStorage.setItem(key, newLeadSourceFromQS);
	} else if (externalReferrer) {

		// if we have no lead source from a previous referrer, or the current lead source is already referrer, update it with our latest referrer
		if (!currentLeadSource || currentLeadSource.indexOf(referrerKey)) {
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
	getAutopilotSession,
	queryString
}