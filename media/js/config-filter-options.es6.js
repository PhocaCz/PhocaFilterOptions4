/**
 * @copyright   Copyright (C) 2005 - 2018 Open Source Matters, Inc. All rights reserved.
 * @license     GNU General Public License version 2 or later; see LICENSE.txt
 */
 
document.addEventListener("DOMContentLoaded", () => { 
  	
	function filterOptionsQuote(str) {
		return str.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&" );
	};

	function removeElementsByClass(parentElem, className){
		var elements = parentElem.getElementsByClassName(className);
		while(elements.length > 0){
			elements[0].parentNode.removeChild(elements[0]);
		}
	}
	
	function filterOptions(str) {
		
		let hideElements 		= '.tab-pane .alert, .tab-pane .field-spacer, fieldset legend, #sendtestmail, .tab-description, .tab-pane h3, .ph-admin-additional-box';
		let hideElementBoxes	= '.tab-header, .ph-options-head, .ph-options-head-expert';
		let tab 				= '#configTabs li a, .nav-tabs li a';
		let tabContent			= '#configContent div.tab-pane, #config-document div.tab-pane, .tab-content .tab-pane, #configTabs section[role="tabpanel"]';
		let excludeTabs			= '#page-filters, #page-permissions, #permissions, #permissions_label';
		let itemParameter		= '.control-group .control-label label';
		let itemParameterBox	= '.control-group';
		let tabRow				= '.tab-pane .row div';
		let tabFieldset			= '.tab-pane .row div fieldset';
		
		/* J39 */
		tab 					= '#configTabs li, .nav-tabs li';
		tabRow					= '.tab-pane .row-fluid div';
		tabFieldset				= '.tab-pane .row-fluid div fieldset';
		/**/
		
		if (str.length > 0) {
			
			/* Make tabs disabled */
			document.querySelectorAll(tab).forEach((elem) => {
				elem.classList.add('disabled'),
				elem.classList.remove('active'),
				elem.classList.remove('show')
				/*elem.classList.add('active')*/
			});
			/* Make all tab contents active so they can be searched */
			//document.querySelectorAll(tabContent).forEach((elem) => {elem.classList.add('active')});
			document.querySelectorAll(tabContent).forEach((elem) => {
				elem.setAttribute('active', true),
				elem.classList.add('phFilterOptionsNoStyle');

				removeElementsByClass(elem, 'phFilterOptonsHeader');

				// Add tab information
				var newItem = document.createElement("div");
				newItem.classList.add('phFilterOptonsHeader');
				var textnode = document.createTextNode(elem.getAttribute('name'));
				newItem.appendChild(textnode); 

/*
				// Add it only if the searched items in tab exist
				var childElems = elem.getElementsByClassName('control-group');
				//childElems.forEach((elem2) => {
				for(var i = 0; i < childElems.length; i++){	
					if (childElems[i].classList.contains('control-group') && childElems[i].classList.contains('phFilterOptionsHidden')) {
						continue;
					} else {
						elem.insertBefore(newItem, elem.childNodes[0]);
						break
					}
				};*/

				elem.insertBefore(newItem, elem.childNodes[0]);

			});
			
			/* Hide some specific parts which are not neccessary to display in search results */
			//document.querySelectorAll(hideElements).forEach((elem) => {elem.style.display = "none";});
			document.querySelectorAll(hideElements).forEach((elem) => {elem.classList.add('phFilterOptionsHidden');});
			/* Hide boxes of specific parts which are not neccessary to display in search results */
			//document.querySelectorAll(hideElementBoxes).forEach((elem) => {elem.parentElement.parentElement.style.display = "none";});
			document.querySelectorAll(hideElementBoxes).forEach((elem) => {elem.parentElement.parentElement.classList.add('phFilterOptionsHidden');});
			/* Hide tab items which cannot be filtered */
			document.querySelectorAll(excludeTabs).forEach((elem) => {
				elem.classList.add('disabled'),
				elem.classList.remove('active'),
				elem.classList.remove('show')
			});
			
			
			/* Cancel columns in Global Configuration */
			document.querySelectorAll(tabRow).forEach((elem) => {elem.classList.add('filter-options-col')});
			document.querySelectorAll(tabFieldset).forEach((elem) => {elem.classList.add('filter-options-fieldset')});
			
			/* Foreach each item and check if it fits criteria. If yes, display it */
			document.querySelectorAll(itemParameter).forEach((elem) => {
				let ePP	= elem.parentElement.parentElement;
				let item = elem.innerHTML;
				//ePP.style.display = "none";
				ePP.classList.add('phFilterOptionsHidden');
				
				if (item && typeof item == "string") {
					let re = new RegExp(filterOptionsQuote(str), "i");
					let res = item.match(re);
					
					if (res) {
						//ePP.style.display = "block";
						ePP.classList.remove('phFilterOptionsHidden');
					}
				}
			});
			return;
		} 
		
		/* Remove disabled class from all tabs */
		document.querySelectorAll(tab).forEach((elem) => {
			elem.classList.remove('disabled'),
			elem.classList.remove('active'),
			elem.classList.remove('show')
			/*elem.classList.remove('active')*/
		});
		
		/* Make first tab in active */
		if(document.querySelector(tab)) {
			document.querySelector(tab).classList.add('active');
			document.querySelector(tab).classList.add('show');
			document.querySelector(tab).setAttribute('active', true);
		}
		
		/* Remove active class from all tab contents */
		document.querySelectorAll(tabContent).forEach((elem) => {
			elem.classList.remove('active'),
			elem.classList.remove('show'),
			elem.removeAttribute('active'),
			elem.classList.remove('phFilterOptionsNoStyle');
			removeElementsByClass(elem, 'phFilterOptonsHeader');
		});
		
		/* Make first tab CONTENT in global configuration options active */
		if(document.querySelector(tabContent)) {
			document.querySelector(tabContent).classList.add('active');
			document.querySelector(tabContent).classList.add('show');
			document.querySelector(tabContent).setAttribute('active', true);
		}
		
		/* Display all hidden parts back - undo the changes we've made when searching */
		//document.querySelectorAll(hideElements).forEach((elem) => {elem.style.display = "block";});
		document.querySelectorAll(hideElements).forEach((elem) => {elem.classList.remove('phFilterOptionsHidden');});

		
		/* Display all hidden boxex of parts back - undo the changes we've made when searching */ 
		//document.querySelectorAll(hideElementBoxes).forEach((elem) => {elem.parentElement.parentElement.style.display = "block";});
		document.querySelectorAll(hideElementBoxes).forEach((elem) => {elem.parentElement.parentElement.classList.remove('phFilterOptionsHidden');});
		
		/* Display all hidden paremter items back - undo the changes we've made when searching */
		//document.querySelectorAll(itemParameterBox).forEach((elem) => {elem.style.display = "block";});
		document.querySelectorAll(itemParameterBox).forEach((elem) => {elem.classList.remove('phFilterOptionsHidden');});
		
		/* Display items which cannot be filtered - undo the changes we've made when searching */
		document.querySelectorAll(excludeTabs).forEach((elem) => {elem.classList.remove('disabled')});
		
		/* Cancel canceling of columns ( :-) ) in Global Configuration */
		document.querySelectorAll(tabRow).forEach((elem) => {elem.classList.remove('filter-options-col')});
		document.querySelectorAll(tabFieldset).forEach((elem) => {elem.classList.remove('filter-options-fieldset')});
		
	}

	
	/* Events */
	document.getElementById("filterOptionsClear").addEventListener("click", (event) => {
		document.getElementById("filterOptionsInput").value = "";
		filterOptions("");
	})
	
	document.getElementById("filterOptionsInput").addEventListener("input", (event) => {
		let eV = event.currentTarget.value;
		filterOptions(eV);
	});
});