jQuery(document).ready(function($){


			sendRequest();
  			function sendRequest(){

  				///orig

			$('#newsTicker4').breakingNews({
				themeColor: '#11cbd7',
				source: {
					type:'rss',
					usingApi:'rss2json',
					rss2jsonApiKey: '5ivfzdrkuqwmoe0dgxeqvhfz0knlo7yq4fw20bt0',
					url:'http://rss.cnn.com/rss/edition.rss',
					limit:20,
					showingField:'title',
					linkEnabled: true,
					target:'_blank',
					seperator: '<span class="bn-seperator" style="background-image:url(https://counter.social/tickerstuff/img/cnn-logo.png);"></span>',
					errorMsg: 'Feed not loaded. Please try again.'
				}
			});

			//endorig

		}

		setInterval(sendRequest, 300000);



			



		});