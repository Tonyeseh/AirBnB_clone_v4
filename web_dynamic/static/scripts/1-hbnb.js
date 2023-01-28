$('document').ready(() => {
	let amenities = {}
	$('input:checkbox').change(function () {
		if ($(this).is(':checked')){
			amenities[$(this).attr('data-id')] = $(this).attr('data-name')
		} else {
			delete amenities[$(this).attr('data-id')]
		}
		$('.amenities h4').text(Object.values(amenities))
	})
})
