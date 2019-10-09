const xhr = new XMLHttpRequest();
const url = 'https://raw.githubusercontent.com/Pulkit-Agarwal/pinkvilla-php/master/pink.json';

xhr.open('POST', url);
xhr.setRequestHeader('Ping-Other', 'pingpong');
xhr.setRequestHeader('Content-Type', 'application/xml');
xhr.onreadystatechange = function(){
	console.log('Request Made');
};
xhr.send('<person><name>Pulkit</name></person>');
   
xhr.open('GET', url);

xhr.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        var response = xhr.responseText;
		
		var data = JSON.parse(this.response);
		data.sort(compare);
		
		var wrapper = document.getElementsByClassName('inner-wrapper');
		
		var link1 = 'http://www.pinkvilla.com';
	
		data.forEach(function(article)  {
		
			var href = link1 + article.path;
			
			var card = document.createElement('div');
			card.setAttribute('class', 'card');
			
			var details = document.createElement('div');
			details.setAttribute('class', 'details');
			
			var a1 = document.createElement('a');
			a1.setAttribute('href', href);
			a1.setAttribute('target', '_blank');
			
			var img = document.createElement('img');
			img.setAttribute('src', article.imageUrl);
			
			a1.appendChild(img);
			
			var a2 = document.createElement('a');
			a2.setAttribute('href', href);
			a2.setAttribute('target', '_blank');

			var h3 = document.createElement('h3');
			h3.textContent = article.title;
			
			a2.appendChild(h3);
			
			details.appendChild(a1);
			details.appendChild(a2);
			
			card.appendChild(details);
			
			wrapper[0].appendChild(card);
		});

		var cards = document.getElementsByClassName('card');
	
		if( cards ) {
			for(var i=0; i<cards.length; i++){
				imagesLoaded( cards[i], function(card) {
					var c = card.elements[0];
					setImage(c);
				});
			}
		}
    }
};

xhr.send();

function compare( object1, object2 ) {
	
	return object1.viewCount < object2.viewCount;
}

function setImage(card){
  
	var grid = document.getElementsByClassName('inner-wrapper')[0];

	var gap = parseInt(window.getComputedStyle(grid).getPropertyValue('grid-row-gap'));
	var height = parseInt(window.getComputedStyle(grid).getPropertyValue('grid-auto-rows'))
	var span = Math.ceil((card.querySelector('.details').getBoundingClientRect().height+gap)/(height+gap));
	card.style.gridRowEnd = 'span '+span;
}