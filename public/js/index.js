$(function(){
	var url = window.location.pathname;
	var _id = url.substring(url.lastIndexOf('/') + 1);
	var recommend;
	var id;
	var name = $('h1').text();
	// $.get('api/books', function(data){
 //    for(var i =0; i<data.length; i++){
 //      if(data[i].name == name){
 //        recommend = data[i].recommended;
 //        id = data[i].id;
 //      }
 //      console.log(recommend);
 //    }
 //    $('#userRecommend').html(recommend)
 //  });

  $('#userRecommend').click(function(){
    $.ajax({
      type: 'PUT',
      url: "/api/books/" + _id
    }).catch(function(err){
      console.log(err);
    }).done(function(data) {
      console.log(data);
      $('#userRecommend').html("Recommend: "+data)
    })
  })
});