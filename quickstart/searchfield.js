var gSearchPageFilePath = "searchresults1.htm";
var gbGenerateForSP = 0;

gRootRelPath = ".";

addRhLoadCompleteEvent(initSearchFieldSubmit);
	
function searchHelp(e, searchBoxId, cshmode)
{
	if(e == null || e.keyCode == 13 || e.type == 'submit')
	{
		if(e != null) 
		{
			if(gbGenerateForSP || (e.type == 'submit' && cshmode == CSHMODE))
				preventEvent(e);
		}
			
		var searchBox = document.getElementById(searchBoxId);
		var placeholderText = searchBox.getAttribute(DATAPH);
		if(searchBox == null || searchBox == 'undefined' || trimString(searchBox.value) == "" || (trimString(searchBox.value)==placeholderText && gbIE55 &&!gbIE10))
			return;
    window.open("../desktop/searchresults1.htm?" + RHSEARCHSTR + "=" + encodeURIComponent(searchBox.value),'_newtab');
		//document.location = "../desktop/searchresults1.htm?" + RHSEARCHSTR + "=" + encodeURIComponent(searchBox.value);
	}
}
function initSearchFieldSubmit()
{
	if(gbIE5)
		readSetting(RHCSHMODE, callbackSearchFieldSubmit);
}
function callbackSearchFieldSubmit(cshmode)
{
	if(cshmode == CSHMODE && !gbPreviewMode)
	{
		var inputs = document.getElementsByTagName('input');
		for(var i=0; i<inputs.length; i++)
		{
			var searchAttr = inputs[i].getAttribute('data-search');
			if(searchAttr != null && searchAttr != 'undefined' && searchAttr == 'true')
			{
				var input = inputs[i];
				var id = input.getAttribute('id');
				patchInputForSubmit(input, function(){searchHelp(event, id, cshmode );});
			}
		}
	}
}
