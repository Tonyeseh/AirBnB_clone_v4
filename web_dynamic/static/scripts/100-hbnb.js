$('document').ready(() => {
  $.get('http://0.0.0.0:5001/api/v1/status/', (data) => {
    if (data.status === 'OK') {
      $('#api_status').addClass('available');
    } else {
      $('#api_status').removeClass('available');
    }
  });

  $.ajax({
    url: 'http://0.0.0.0:5001/api/v1/places_search',
    type: 'POST',
    contentType: 'application/json',
    data: '{}',
    dataType: 'json',
    success: function (data) {
      for (const place of data) {
        let guest = room = bath = '';
        if (place.max_guest !== 1) {
          guest = 's';
        }
        if (place.number_rooms !== 1) {
          room = 's';
        }
        if (place.number_bathrooms !== 1) {
          bath = 's';
        }
        $('section.places').append('<article><div class="title_box"><h2>' +
					place.name + '</h2><div class="price_by_night">&#36;' + place.price_by_night + '</div></div><div class="information"><div class="max_guest">' + place.max_guest + ' Guest' + guest + '</div><div class="number_rooms">' + place.number_rooms + ' Room' + room + '</div><div class="number_bathrooms">' + place.number_bathrooms + ' Bathroom' + bath + '</div></div><div class="description">' + place.description + '</div></article>');
      }
    }
  });
  const filter = {'amenities': {}, 'states': {}, 'cities': {}};
  $('input:checkbox').change(function () {
    if ($(this).is(':checked')) {
	    if ($(this).parents().length === 10) {
      filter.cities[$(this).attr('data-id')] = $(this).attr('data-name');
	    }
	    else if ($(this).parent().children().length > 1) {
      filter.states[$(this).attr('data-id')] = $(this).attr('data-name');
	    } else {
      filter.amenities[$(this).attr('data-id')] = $(this).attr('data-name');
	    }
    } else {
	    if ($(this).parents().length === 10) {
      delete filter.cities[$(this).attr('data-id')]
	    }
	    else if ($(this).parent().children().length > 1) {
      delete filter.states[$(this).attr('data-id')]
	    } else {
      delete filter.amenities[$(this).attr('data-id')];
	    }
    }
	  locations = Object.values(filter.states).concat(Object.values(filter.cities))
    $('.locations h4').text(locations.join(', '));
    $('.amenities h4').text(Object.values(filter.amenities).join(', '));
  });
	$('button:button').click(function (){
		const json_data = {}
		for (const key in filter) {
			json_data[key] = Object.keys(filter[key])
		}
  $.ajax({
    url: 'http://0.0.0.0:5001/api/v1/places_search',
    type: 'POST',
    contentType: 'application/json',
    data: JSON.stringify(json_data),
    dataType: 'json',
    success: function (data) {
	    $('section.places').children().remove()
      for (const place of data) {
        let guest = room = bath = '';
        if (place.max_guest !== 1) {
          guest = 's';
        }
        if (place.number_rooms !== 1) {
          room = 's';
        }
        if (place.number_bathrooms !== 1) {
          bath = 's';
        }
        $('section.places').append('<article><div class="title_box"><h2>' +
					place.name + '</h2><div class="price_by_night">&#36;' + place.price_by_night + '</div></div><div class="information"><div class="max_guest">' + place.max_guest + ' Guest' + guest + '</div><div class="number_rooms">' + place.number_rooms + ' Room' + room + '</div><div class="number_bathrooms">' + place.number_bathrooms + ' Bathroom' + bath + '</div></div><div class="description">' + place.description + '</div></article>');
      }
    }
  });
	})
});
